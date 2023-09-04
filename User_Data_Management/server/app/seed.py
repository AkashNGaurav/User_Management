import sqlite3
from flask_sqlalchemy import SQLAlchemy
from services.model.models import AddressModel, DepartmentModel, UserModel  

db = SQLAlchemy()

connection = sqlite3.connect('instance/data.db')

print(connection)

cur = connection.cursor()

print(cur)
# print(cur.execute('select * from profile'))

# for row in cur.execute('select * from profile'):
#     print(row)

profile = [
    (1, "Analyst"),
    (2, "Associate"),
    (3, "Senior Associate"),
    (4, "Management Consultant"),
    (5, "Associate Principal"),
    (6, "Partner"),
    (7, "Co-Founder")
    ]


department = [
    (1, "Human Resources"),
    (2, "Sales"),
    (3, "Marketing"),
    (4, "Product development"),
    (5, "Quality Assurance"),
    (6, "Research and development"),
    (7, "Finance"),
    (8, "Product Management")
    ]

qualification = [
    (1, "Management", "MBA"),
    (2, "Management", "BBA"),
    (3, "Engineering", "M.Tech/ME"),
    (4, "Engineering", "B.Tech/BE"),
    (5, "Arts", "psychology"),
    (6, "Arts", "sociology"),
    (7, "Education", "B.Ed"),
    (8, "Education", "M.Ed"),
    (9, "Finance", "B.Com"),
    (10, "Finance", "CA/CFA"),
    (11, "School", "HSC"),
    (12, "School", "SSC")
]
# cur.execute("INSERT INTO profile (profile_id, profile_name) VALUES (?, ?)",
#             (10, 'test')
#             )

# cur.execute("INSERT INTO posts (title, content) VALUES (?, ?)",
#             ('Second Post', 'Content for the second post')
#             )

cur.executemany("INSERT INTO profile (profile_id, profile_name) VALUES (?, ?)", profile)
cur.executemany("INSERT INTO qualification (qualification_id, qualification_type, qualification_name) VALUES (?, ?, ?)", qualification)
cur.executemany("INSERT INTO department (department_id, department_name) VALUES (?, ?)", department)

connection.commit()
connection.close()

