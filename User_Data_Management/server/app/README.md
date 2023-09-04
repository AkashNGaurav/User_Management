# Getting Started

## 1. Installation process

### 1.1 Setup

Activate virtual environment and install the required packages

```bash
    python -m venv venv
```

```bash
    .\venv\Scripts\activate
```


```bash
    pip install -r requirements.txt
```

### 1.2 Migration

Database migration in application is controlled through flask-migrate(alembic) and Sqlalchemy
The below commands should only be execute in case of new setup or change in any schema of existing DB

**NOTE : This commend only has to run firsttime you setup the application for migration**

```bash
    flask db init
```

```bash
    flask db migrate -m "<Comment for this migration>"
```

```bash
    flask db upgrade
```

*NOTE : Run seed file to inserted data into Database*

```bash
    python seed.py
```


### 1.3 Developement

Do the necessary changes and for testing run the application


```bash
    flask run --host=0.0.0.0  --reload --debugger
```