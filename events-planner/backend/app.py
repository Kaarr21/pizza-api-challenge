import os
from flask import Flask
from extensions import db, migrate, jwt, cors
from routes.auth import bp as auth_bp
from routes.events import bp as events_bp
from routes.tasks import bp as tasks_bp
from routes.rsvps import bp as rsvps_bp

def create_app():
    app = Flask(__name__)
    app.config.from_mapping(
        SQLALCHEMY_DATABASE_URI=os.getenv('DATABASE_URL'),
        SECRET_KEY=os.getenv('SECRET_KEY'),
        JWT_SECRET_KEY=os.getenv('JWT_SECRET_KEY'),
    )
    db.init_app(app)
    migrate.init_app(app, db)
    jwt.init_app(app)
    cors.init_app(app)
    app.register_blueprint(auth_bp)
    app.register_blueprint(events_bp)
    app.register_blueprint(tasks_bp)
    app.register_blueprint(rsvps_bp)
    return app

app = create_app()
