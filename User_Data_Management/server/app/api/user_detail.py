from flask.views import MethodView
from flask_smorest import Blueprint
from flask_jwt_extended import jwt_required

from db import db
from services.model.models import ProfileModel, DepartmentModel, QualificationModel, AddressModel
from services.schema.schemas import ProfileSchema, DepartmentSchema, QualificationSchema

user_info_route = Blueprint("Users Details", "users_info", description="Operations on user's details")


@user_info_route.route("/address")
class UserAddressDetail(MethodView):

    @jwt_required()
    @user_info_route.response(200, QualificationSchema(many=True))
    def get(self):
        return AddressModel.query.all()


@user_info_route.route("/address/<int:address_id>")
class UserAddress(MethodView):

    @jwt_required()
    @user_info_route.response(200, QualificationSchema)
    def get(self, address_id):
        return AddressModel.query.get_or_404(address_id)
    
    @jwt_required()
    def delete(self, address_id):
        user_address = AddressModel.query.get_or_404(address_id)
        db.session.delete(user_address)
        db.session.commit()
        return {"message": "User Qualification have been deleted."}, 200
    




@user_info_route.route("/qualification")
class UsersQualification(MethodView):

    @jwt_required()
    @user_info_route.response(200, QualificationSchema(many=True))
    def get(self):
        return QualificationModel.query.all()


@user_info_route.route("/qualification/<int:qualification_id>")
class UserQualification(MethodView):

    @jwt_required()
    @user_info_route.response(200, QualificationSchema)
    def get(self, qualification_id):
        return QualificationModel.query.get_or_404(qualification_id)
    
    @jwt_required()
    def delete(self, qualification_id):
        user_qualification = QualificationModel.query.get_or_404(qualification_id)
        db.session.delete(user_qualification)
        db.session.commit()
        return {"message": "User Qualification have been deleted."}, 200
    




@user_info_route.route("/profile")
class UsersProfile(MethodView):

    @jwt_required()
    @user_info_route.response(200, ProfileSchema(many=True))
    def get(self):
        return ProfileModel.query.all()


@user_info_route.route("/profile/<int:profile_id>")
class UserProfile(MethodView):

    @jwt_required()
    @user_info_route.response(200, ProfileSchema)
    def get(self, profile_id):
        return ProfileModel.query.get_or_404(profile_id)
    
    @jwt_required()
    def delete(self, profile_id):
        user_profile = ProfileModel.query.get_or_404(profile_id)
        db.session.delete(user_profile)
        db.session.commit()
        return {"message": "User Profile have been deleted."}, 200
    


@user_info_route.route("/department")
class UsersDepartment(MethodView):

    @jwt_required()
    @user_info_route.response(200, DepartmentSchema(many=True))
    def get(self):
        return DepartmentModel.query.all()


@user_info_route.route("/department/<int:department_id>")
class UserDepartment(MethodView):

    @jwt_required()
    @user_info_route.response(200, DepartmentSchema)
    def get(self, department_id):
        return DepartmentModel.query.get_or_404(department_id)
    
    @jwt_required()
    def delete(self, department_id):
        user_department = DepartmentModel.query.get_or_404(department_id)
        db.session.delete(user_department)
        db.session.commit()
        return {"message": "User Profile have been deleted."}, 200