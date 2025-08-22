from sqlalchemy.orm import Session
from app.db import models
from app.schemas import product_schemas

def create_product_with_components(db_session: Session, product_data: product_schemas.ProductCreate):
    # 1. Create the main Product object
    new_product = models.Product(
        name=product_data.name, 
        sale_price=product_data.sale_price
    )
    db_session.add(new_product)
    db_session.flush() # This assigns an ID to new_product

    # 2. Create the links in the "product_composition" table
    for comp in product_data.components:
        composition_link = models.ProductComposition(
            product_id=new_product.id,
            component_id=comp.component_id,
            quantity=comp.quantity
        )
        db_session.add(composition_link)

    db_session.commit()
    db_session.refresh(new_product)
    return new_product

def get_all_products(db_session: Session, skip: int = 0, limit: int = 100):
    # This function should still work as SQLAlchemy's relationship handles the join
    return db_session.query(models.Product).offset(skip).limit(limit).all()