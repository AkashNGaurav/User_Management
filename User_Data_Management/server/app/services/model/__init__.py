# from sqlalchemy import create_engine
# from sqlalchemy.orm import sessionmaker
# from sqlalchemy.ext.declarative import declarative_base

# SQLALCHEMY_DATABASE_URI = ""

# engine = create_engine(SQLALCHEMY_DATABASE_URI, pool_size=20, max_overflow=5, echo=True)  # type: ignore

# sessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)

# Base = declarative_base()

# from app.services.model.models import *



##############################

# from flask import Flask
# from flask_sqlalchemy import SQLAlchemy
# from flask_migrate import Migrate

# from app.app import app
# from app.db import db

# db = SQLAlchemy(app)
# migrate = Migrate(app, db)