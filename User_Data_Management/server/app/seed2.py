from flask import Flask
from flask_sqlalchemy import SQLAlchemy
from services.model.models import AddressModel, DepartmentModel, QualificationModel, ProfileModel, UserModel  


app = Flask(__name__)
app.debug = True
app.config['SQLALCHEMY_DATABASE_URI'] = "sqlite:///data.db"
app.config['SQLALCHEMY_ECHO'] = True
db = SQLAlchemy(app)

# class Region(db.Model):
#     __tablename__ = 'regions'
#     id = db.Column(db.Integer, primary_key=True)
#     name = db.Column(db.String(100))

# db.drop_all()
# db.create_all()

region = QualificationModel(qualification_id=1, qualification_name='Over Yonder Thar')
app.logger.info("1 -> " + str(region.qualification_id)) # currently None, before persistence

db.session.add(region)
db.session.commit()
app.logger.info("2 -> " + str(region.qualification_id)) # gets assigned an id of 1 after being persisted

region2 = ProfileModel(profile_name='Yet Another Up Yar')
db.session.add(region2)
db.session.commit()
app.logger.info(region2.profile_id) # and 2

if __name__ == '__main__':
    app.run(port=9001)