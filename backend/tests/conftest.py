import os
os.environ["RATELIMIT_ENABLED"] = "0"

import pytest
from fastapi.testclient import TestClient
from sqlalchemy.orm import Session
from app.main import app
from app.api.dependencies import get_db
from app.db.database import Base
from tests.test_db_config import engine, TestingSessionLocal



# Recreate all tables before each test, drop after
@pytest.fixture()
def db():
    Base.metadata.drop_all(bind=engine)
    Base.metadata.create_all(bind=engine)
    
    session = TestingSessionLocal()
    try:
        yield session
    finally:
        session.close()


@pytest.fixture()
def client(db: Session):
    # Override the get_db dependency to use test database
    def override_get_db():
        try:
            yield db
        finally:
            pass

    app.dependency_overrides[get_db] = override_get_db
    yield TestClient(app)
    app.dependency_overrides.clear()
