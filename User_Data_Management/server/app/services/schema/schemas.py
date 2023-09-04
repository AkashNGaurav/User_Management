from marshmallow import Schema, fields


class CustomUserSchema(Schema):
    id = fields.String(dump_only=True)
    username = fields.String(required=True)
    password = fields.String(required=True, load_only=True)
    email_id = fields.String(required=True)
    gender = fields.String(required=True)
    contact_number = fields.String(required=True)
    date_of_birth = fields.String(required=True)
    country = fields.String(required=True)
    state = fields.String(required=True)
    city = fields.String(required=True)
    # pin_code = fields.String(required=True)
    department = fields.String(required=True)
    qualification = fields.String(required=True)
    profile = fields.String(required=True)
    created_date = fields.DateTime(dump_only=True)
    security_question = fields.String(required=True)
    security_answer = fields.String(required=True)


class UserUpdateSchema(Schema):
    id = fields.String(dump_only=True)
    username = fields.String(required=True)
    # password = fields.String(required=True)
    # email_id = fields.String(required=True)
    gender = fields.String(required=True)
    contact_number = fields.String(required=True)
    date_of_birth = fields.String(required=True)
    country = fields.String(required=True)
    state = fields.String(required=True)
    city = fields.String(required=True)
    # pin_code = fields.String(required=True)
    created_date = fields.DateTime(dump_only=True)
    department = fields.String(required=True)
    qualification = fields.String(required=True)
    profile = fields.String(required=True)
    security_question = fields.String(required=True)
    security_answer = fields.String(required=True)


class ProfileSchema(Schema):
    profile_id = fields.Int(dump_only=True)
    profile_name = fields.String(required=True)

class PlainUserSchema(Schema):
    id = fields.String(dump_only=True)
    username = fields.String(required=True)
    # password = fields.String(required=True)
    email_id = fields.String(required=True)
    gender = fields.String(required=True)
    contact_number = fields.String(required=True)
    date_of_birth = fields.String(required=True)
    created_date = fields.DateTime(dump_only=True)
    security_question = fields.String(required=True)
    security_answer = fields.String(required=True)


class UserLogin(Schema):
    email = fields.String(required=True)
    password = fields.String(required=True)


class UserEmail(Schema):
    email = fields.String(required=True)

class UserSecurityInfo(Schema):
    password = fields.String(required=True)
    email = fields.String(required=True)
    security_question = fields.String(required=True)
    security_answer = fields.String(required=True)
    


class QualificationSchema(Schema):
    qualification_id = fields.Int(dump_only=True)
    qualification_name = fields.String(required=True)
    qualification_type = fields.String(required=True)


class DepartmentSchema(Schema):
    department_id = fields.Int(dump_only=True)
    department_name = fields.String(required=True)


class AddressSchema(Schema):
    address_id = fields.Int(dump_only=True)
    country = fields.String(required=True)
    state = fields.String(required=True)
    city = fields.String(required=True)
    # pin_code = fields.String(required=True)


class UserSchema(PlainUserSchema):

    profile = fields.Nested(ProfileSchema, dump_only=True)
    qualification = fields.Nested(QualificationSchema, dump_only=True)
    address = fields.Nested(AddressSchema(), dump_only=True)
    department = fields.Nested(DepartmentSchema, dump_only=True)

    # department = fields.Nested(lambda: DepartmentSchema(only=("department_name",)))

    # profile = fields.List(fields.Nested(PlainProfileSchema()), dump_only=True)
    # qualification = fields.List(fields.Nested(QualificationSchema()), dump_only=True)
    # address = fields.List(fields.Nested(AddressSchema()), dump_only=True)
    # department = fields.List(fields.Nested(DepartmentSchema()), dump_only=True)

    # department = fields.Function(lambda obj: obj.users.user, dump_only=True)