import os
import shutil
from bk import create_app, db
from bk.models import users

# Create an app context to work with the database
app = create_app()

def reset_database():
    with app.app_context():
        print("Attempting to drop all existing tables...")
        try:
            # Drop all tables known to SQLAlchemy models
            db.drop_all()
            print("All tables dropped successfully (if they existed).")
        except Exception as e:
            # Catch any error, but often drop_all can fail if tables are in use
            print(f"Error dropping tables: {e}")
            print("This might happen if tables are in use. Try again or check for active connections.")

        print("Attempting to create all tables based on models...")
        try:
            # Create all tables based on SQLAlchemy models
            db.create_all()
            print("All tables created successfully.")
        except Exception as e:
            print(f"Error creating tables: {e}")

def clean_migrations_folder():
    migrations_folder = os.path.join(os.path.dirname(__file__), 'migrations')
    if os.path.exists(migrations_folder):
        print(f"Deleting existing migrations folder: {migrations_folder}")
        shutil.rmtree(migrations_folder)
        print("Migrations folder deleted.")
    else:
        print("Migrations folder not found, no cleanup needed there.")

if __name__ == '__main__':
    print("--- Starting Database and Migration Reset ---")

    # Step 1: Clean the local migrations folder
    clean_migrations_folder()

    # Step 2: Drop and recreate database schema via SQLAlchemy
    reset_database()

    print("\n--- Now, manually run Flask-Migrate commands: ---")
    print("1. flask db init")
    print("2. flask db migrate -m \"Initial migration\"")
    print("3. flask db upgrade")
    print("\n--- Reset process complete. ---")