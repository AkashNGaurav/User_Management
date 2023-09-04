from flask import jsonify
from flask.views import MethodView
from flask_smorest import Blueprint, abort
from passlib.hash import pbkdf2_sha256
from flask_jwt_extended import create_access_token, create_refresh_token, get_jwt_identity, jwt_required, get_jwt

from db import db
from blocklist import BLOCKLIST
from services.model.models import UserModel, ProfileModel, AddressModel, DepartmentModel, QualificationModel, BlocklistModel
from services.schema.schemas import UserSchema, PlainUserSchema, CustomUserSchema, UserLogin, UserUpdateSchema, UserEmail, UserSecurityInfo
# BLOCKLIST = []

user_route = Blueprint("Users", "users", description="Operations on users")


@user_route.route("/register")
class UserRegister(MethodView):

    @user_route.arguments(CustomUserSchema)
    def post(self, user_data):
        print("user_data: ", user_data)
        print("user_data: ", ProfileModel.query.all())
        # print("user_data: ", UserModel.query.all())
        # if UserModel.query.filter(UserModel.username == user_data["username"]).first():
        #     abort(409, message="A user with that username already exists.")
      
        qualification_id = QualificationModel.query.filter(QualificationModel.qualification_name == user_data["qualification"]).first()
        department_id = DepartmentModel.query.filter(DepartmentModel.department_name == user_data["department"]).first()
        profile_id = ProfileModel.query.filter(ProfileModel.profile_name == user_data["profile"]).first()

        print("#########################################################################################################")
        print(qualification_id, department_id, profile_id)
        print("qualification_id, department_id " , profile_id)
        print("#########################################################################################################")
        
        address = AddressModel(
            country=user_data["country"],
            state=user_data["state"],
            city=user_data["city"],
            # pin_code=user_data["pin_code"]
        )

        db.session.add(address)
        db.session.commit()

        new_address_id = AddressModel.query.filter(AddressModel.city == user_data["city"]).first()

        print("new_address_id " , new_address_id, new_address_id.address_id)

        import datetime as dt

        # dob = dt.datetime.strptime(user_data["date_of_birth"], "%d-%m-%Y")
        dob = dt.datetime.strptime(user_data["date_of_birth"], "%Y-%m-%d")

        # Convert datetime object to date object.
        dob = dob.date()
        
        user = UserModel(
            username=user_data["username"],
            password=pbkdf2_sha256.hash(user_data["password"]),
            contact_number=user_data["contact_number"],
            email_id=user_data["email_id"],
            date_of_birth=dob,
            gender=user_data["gender"],
            security_question=user_data["security_question"],
            security_answer=user_data["security_answer"],
            qualification=qualification_id,
            department=department_id,
            profile=profile_id,
            address=new_address_id
        )

        print("final user: ", user)
        db.session.add(user)
        db.session.commit()

        return {"message": "User created successfully."}, 201


@user_route.route("/login")
class UserLogin(MethodView):
    
    @user_route.arguments(UserLogin)
    def post(self, user_data):
        user = UserModel.query.filter(
            UserModel.email_id == user_data["email"]
        ).first()

        if user and pbkdf2_sha256.verify(user_data["password"], user.password):
            access_token = create_access_token(identity=user.id, fresh=True)
            refresh_token = create_refresh_token(identity=user.id)
            return {"username": user.username, "access_token": access_token, "refresh_token": refresh_token}
        
        abort(401, message="Invalid credentials.")


@user_route.route("/security")
class GetSecurityInfo(MethodView):

    @user_route.response(200, UserSchema)
    @user_route.arguments(UserEmail)
    def post(self, user_data):
        user = UserModel.query.filter(
            UserModel.email_id == user_data["email"]
        ).first()

        if user:
            return user
        
        abort(401, message="Email doen not exist.")


@user_route.route("/reset_password")
class UpdateUserPassword(MethodView):

    @user_route.arguments(UserSecurityInfo)
    def post(self, user_data):
        user = UserModel.query.filter(
            UserModel.email_id == user_data["email"]
        ).first()

        if user and user.security_question == user_data["security_question"] and user.security_answer == user_data["security_answer"]:
            user.password = pbkdf2_sha256.hash(user_data["password"])
            db.session.add(user)
            db.session.commit()

            return {"message": "User password successfully updated."}
        
        abort(401, message="Provided security information in not correct")


@user_route.route("/refresh")
class TokenRefresh(MethodView):
    @jwt_required(refresh=True)
    def post(self):
        current_user = get_jwt_identity()
        new_token = create_access_token(identity=current_user, fresh=False)
        return {"access_token": new_token}


@user_route.route("/logout")
class UserLogout(MethodView):
    @jwt_required()
    def post(self):
        jti = get_jwt()["jti"]

        blocklist = BlocklistModel(jwt_token = jti)
        # BLOCKLIST.add(jti)
        db.session.add(blocklist)
        db.session.commit()
        return {"message": "Successfully logged out."}



@user_route.route("/users")
class UserDetails(MethodView):

    @jwt_required()
    @user_route.response(200, UserSchema(many=True))
    def get(self):
        return UserModel.query.all()


@user_route.route("/user/<uuid:user_id>")
class User(MethodView):

    @jwt_required()
    @user_route.response(200, UserSchema)
    def get(self, user_id):
        user = UserModel.query.get_or_404(user_id)
        return user

    @jwt_required()
    def delete(self, user_id):
        user = UserModel.query.get_or_404(user_id)
        db.session.delete(user)
        db.session.commit()
        return {"message": "User deleted."}, 200
    
    @jwt_required()
    @user_route.arguments(UserUpdateSchema)
    @user_route.response(200, UserUpdateSchema)
    def put(self, user_data, user_id):
        user = UserModel.query.get_or_404(user_id)

        qualification_id = QualificationModel.query.filter(QualificationModel.qualification_name == user_data["qualification"]).first()
        department_id = DepartmentModel.query.filter(DepartmentModel.department_name == user_data["department"]).first()
        profile_id = ProfileModel.query.filter(ProfileModel.profile_name == user_data["profile"]).first()

        print("#########################################################################################################")
        print(qualification_id, department_id, profile_id)
        print("user_data: ", user_data)
        print("user: ", user.__dict__)
        print("#########################################################################################################")
        
        new_address_id = AddressModel.query.filter(AddressModel.city == user_data["city"]).first()

        if not new_address_id:

            address = AddressModel(
                country=user_data["country"],
                state=user_data["state"],
                city=user_data["city"]
                # pin_code=user_data["pin_code"]
            )

            db.session.add(address)
            db.session.commit()

            new_address_id = AddressModel.query.filter(AddressModel.city == user_data["city"]).first()

        print("new_address_id " , new_address_id, new_address_id.address_id)

        import datetime as dt

        # dob = dt.datetime.strptime(user_data["date_of_birth"], "%d-%m-%Y")
        dob = dt.datetime.strptime(user_data["date_of_birth"], "%Y-%m-%d")

        # Convert datetime object to date object.
        dob = dob.date()

        user.username=user_data["username"]
        user.contact_number=user_data["contact_number"]
        user.date_of_birth=dob
        user.gender=user_data["gender"]
        user.qualification_id=qualification_id.qualification_id
        user.department_id=department_id.department_id
        user.profile_id=profile_id.profile_id
        user.address_id=new_address_id.address_id
        user.security_question=user_data["security_question"]
        user.security_answer=user_data["security_answer"]


        print("final user: ", user)
        db.session.add(user)
        db.session.commit()

        return user
 