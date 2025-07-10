# app/__init__.py
from flask import Flask
from flask_sqlalchemy import SQLAlchemy
from flask_migrate import Migrate  # Import Migrate
from .config import SQLALCHEMY_DATABASE_URI, SQLALCHEMY_TRACK_MODIFICATIONS
from flask_cors import CORS
db = SQLAlchemy()
migrate = Migrate() # Initialize Migrate without app here

def create_app():
    app = Flask(__name__)
    app.config['SQLALCHEMY_DATABASE_URI'] = SQLALCHEMY_DATABASE_URI
    app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = SQLALCHEMY_TRACK_MODIFICATIONS

    db.init_app(app)
    migrate.init_app(app, db) # Initialize Migrate with app and db here

    CORS(app)
    # Register blueprints (assuming these are in place)
    from .routes.user_routes import user_bp
    app.register_blueprint(user_bp)

    return app