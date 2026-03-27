from sqlalchemy.orm import Session
from app.models.user import User
from app.schemas import schemas


#create_user: Add a new user to the database.
def register_user(user: schemas.UserCreate, db: Session):
    new_user = User(**user.model_dump())
    db.add(new_user)
    db.commit()
    db.refresh(new_user)

    return new_user

# get_user_by_id: Fetch a user by their ID.
def get_user_by_id(user_id: int, db: Session):
    user = db.query(User).filter(User.id == user_id).first()

    return user
    