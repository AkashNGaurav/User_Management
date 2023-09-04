from datetime import timedelta
import os
from flask import Flask, jsonify
from flask_smorest import Api
from flask_jwt_extended import JWTManager
from flask_migrate import Migrate
from dotenv import load_dotenv
from flask_cors import CORS

from db import db
from blocklist import BLOCKLIST
from services.model.models import BlocklistModel

from api.user import user_route as userBlueprint
from api.user_detail import user_info_route as userInfoBlueprint


def create_app(db_url=None):
    app = Flask(__name__)
    cors = CORS(app, resources={r"/*": {"origins": "*"}})
    app.debug = True
    app.config["PROPAGATE_EXCEPTIONS"] = True
    app.config["API_TITLE"] = "USER REST API"
    app.config["API_VERSION"] = "v1"
    app.config["OPENAPI_VERSION"] = "3.0.3"
    app.config["OPENAPI_URL_PREFIX"] = "/"
    app.config["OPENAPI_SWAGGER_UI_PATH"] = "/docs"
    app.config["OPENAPI_SWAGGER_UI_URL"] = "https://cdn.jsdelivr.net/npm/swagger-ui-dist/"
    app.config["SQLALCHEMY_DATABASE_URI"] = os.getenv("DATABASE_URL", "sqlite:///data.db")
    app.config["SQLALCHEMY_TRACK_MODIFICATIONS"] = False

    app.config['API_SPEC_OPTIONS'] = {
        'security':[{"bearerAuth": []}],
        'components':{
            "securitySchemes":
                {
                    "bearerAuth": {
                        "type":"http",
                        "scheme": "bearer",
                        "bearerFormat": "JWT"
                    }
                }
        }
    }
    
    db.init_app(app)
    migrate = Migrate(app, db)

    api = Api(app)
    api.spec.options["security"] = [{"bearerAuth": []}]


    # import secrets    secrets.SystemRandom.getrandbits(128, 128)
    app.config["JWT_SECRET_KEY"] = "143833848787666991509549368207723336610"
    app.config["JWT_ACCESS_TOKEN_EXPIRES"] = timedelta(hours=3)
    app.config["JWT_REFRESH_TOKEN_EXPIRES"] = timedelta(days=30)
    jwt = JWTManager(app)

    @jwt.token_in_blocklist_loader
    def check_if_token_in_blocklist(jwt_header, jwt_payload):
        blocklist = BlocklistModel.query.all()
        jwt_list = [jwt_obj.jwt_token for jwt_obj in blocklist]
        print("########" * 10)
        print("jwt_list", jwt_list)
        print("########" * 10)

        return jwt_payload["jti"] in jwt_list

    @jwt.revoked_token_loader
    def revoked_token_callback(jwt_header, jwt_payload):
        return (
            jsonify(
                {"description": "The token has been revoked.", "error": "token_revoked"}
            ),
            401,
        )

    @jwt.needs_fresh_token_loader
    def token_not_fresh_callback(jwt_header, jwt_payload):
        return (
            jsonify(
                {
                    "description": "The token is not fresh.",
                    "error": "fresh_token_required",
                }
            ),
            401,
        )

    # @jwt.additional_claims_loader
    # def add_claims_to_jwt(identity):
    #     # Look in the database and see whether the user is an admin
    #     if identity == 1:
    #         return {"is_admin": True}
    #     return {"is_admin": False}

    @jwt.expired_token_loader
    def expired_token_callback(jwt_header, jwt_payload):
        return (
            jsonify({"message": "The token has expired.", "error": "token_expired"}),
            401,
        )

    # @jwt.invalid_token_loader
    # def invalid_token_callback(error):
    #     return (
    #         jsonify(
    #             {"message": "Signature verification failed.", "error": "invalid_token"}
    #         ),
    #         401,
    #     )

    # @jwt.unauthorized_loader
    # def missing_token_callback(error):
    #     return (
    #         jsonify(
    #             {
    #                 "description": "Request does not contain an access token.",
    #                 "error": "authorization_required",
    #             }
    #         ),
    #         401,
    #     )

    # @app.before_first_request
    # def create_tables():
    #     db.create_all()

    api.register_blueprint(userBlueprint)
    api.register_blueprint(userInfoBlueprint)

    return app

