from sqlalchemy.orm import Session
from app.db import models

def get_all_components(db_session: Session):
    return db_session.query(models.Component).all()