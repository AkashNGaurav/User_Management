# from sqlalchemy import (
#     Column,
#     ForeignKey,
#     Integer,
#     String,
#     PrimaryKeyConstraint,
#     UniqueConstraint,
#     TIMESTAMP,
#     DATE
# )
# from sqlalchemy.orm import relationship


# ============


# from flask import Flask
# from flask_sqlalchemy import SQLAlchemy
# from flask_migrate import Migrate
from sqlalchemy.dialects.postgresql import UUID
import uuid
from db import db
import random
from pytz import timezone
from datetime import datetime

UTC = timezone("UTC")


def time_now():
    return datetime.now(UTC)

# from app.main import app

# db = SQLAlchemy(app)
# migrate = Migrate(app, db)


rd = random.Random()
# rd.seed(0)
# uuid.uuid4 = lambda: uuid.UUID(int=rd

class UserModel(db.Model):
    __tablename__ = "users"

    # Name, Username, Email ID, Password, Gender, Phone No, Address, Created Date, DOB, Profile, Department, Qualification, YOE, status(active/dead)

    id = db.Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    username = db.Column(db.String(80), unique=True, nullable=False)
    password = db.Column(db.String(256), nullable=False)
    email_id = db.Column(db.String(80), unique=True, nullable=False)
    gender  = db.Column(db.String(80), nullable=False)
    contact_number = db.Column(db.String(80), unique=True, nullable=False)
    created_date  = db.Column(
        db.TIMESTAMP(timezone=True),
        primary_key=False,
        nullable=False,
        default=time_now,
    )
    date_of_birth = db.Column(db.DATE, nullable=False)
    security_question = db.Column(db.String(256), nullable=False)
    security_answer = db.Column(db.String(256), nullable=False)

    profile_id = db.Column(db.Integer, db.ForeignKey("profile.profile_id"))
    department_id = db.Column(db.Integer, db.ForeignKey("department.department_id"))
    qualification_id = db.Column(db.Integer, db.ForeignKey("qualification.qualification_id"))
    address_id = db.Column(db.Integer, db.ForeignKey("address.address_id"))

    profile = db.relationship("ProfileModel", back_populates="users")
    department = db.relationship("DepartmentModel", back_populates="users")
    qualification = db.relationship("QualificationModel", back_populates="users")
    address = db.relationship("AddressModel", back_populates="users")



class ProfileModel(db.Model):
    __tablename__ = "profile"

    profile_id = db.Column(db.Integer, primary_key=True, nullable=False, index=True)
    profile_name =  db.Column(db.String(256), nullable=False)

    users = db.relationship("UserModel", back_populates="profile", lazy="dynamic")


class DepartmentModel(db.Model):
    __tablename__ = "department"

    department_id = db.Column(db.Integer, primary_key=True, nullable=False, index=True)
    department_name =  db.Column(db.String(256), nullable=False)

    users = db.relationship("UserModel", back_populates="department", lazy="dynamic")



class QualificationModel(db.Model):
    __tablename__ = "qualification"

    qualification_id = db.Column(db.Integer, primary_key=True, nullable=False, index=True)
    qualification_type = db.Column(db.String(256), nullable=True)
    qualification_name =  db.Column(db.String(256), nullable=False)

    users = db.relationship("UserModel", back_populates="qualification", lazy="dynamic")



class AddressModel(db.Model):
    __tablename__ = "address"

    address_id = db.Column(db.Integer, primary_key=True, nullable=False, index=True)
    country =  db.Column(db.String(256), nullable=False)
    state =  db.Column(db.String(256), nullable=False)
    city =  db.Column(db.String(256), nullable=False)
    # pin_code =  db.Column(db.String(256), nullable=False)

    users = db.relationship("UserModel", back_populates="address", lazy="dynamic")


class BlocklistModel(db.Model):
    __tablename__ = "blocklist"

    blocklist_id = db.Column(db.Integer, primary_key=True, nullable=False, index=True)
    jwt_token =  db.Column(db.String(256), nullable=False)