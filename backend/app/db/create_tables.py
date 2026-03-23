from app.db.database import Base, engine
from app.models.user import User  # import your User model

# This creates all tables that inherit from Base
Base.metadata.create_all(bind=engine)

print("Tables created successfully!")