import datetime
from sqlalchemy import Column, Integer, String, Float, ForeignKey, DateTime
from sqlalchemy.orm import relationship
from app.db.database import Base

# --- Core Models ---
class InventoryItem(Base):
    __tablename__ = "inventory_items"
    id = Column(Integer, primary_key=True, index=True)
    name = Column(String, index=True)
    quantity_on_hand = Column(Integer, default=0)

class Vendor(Base):
    __tablename__ = "vendors"
    id = Column(Integer, primary_key=True, index=True)
    name = Column(String, index=True)

# --- Product Models ---
# app/db/models.py

from sqlalchemy import Column, Integer, String, Float, ForeignKey
from sqlalchemy.orm import relationship
from app.db.database import Base

# --- Master Table for Components ---
class Component(Base):
    __tablename__ = "components"
    id = Column(Integer, primary_key=True, index=True)
    name = Column(String, unique=True, index=True) # e.g., "Red Rose", "Eucalyptus Stem"

# --- The "Recipe" or "Link" Table ---
class ProductComposition(Base):
    __tablename__ = "product_composition"
    product_id = Column(Integer, ForeignKey("products.id"), primary_key=True)
    component_id = Column(Integer, ForeignKey("components.id"), primary_key=True)
    quantity = Column(Integer, nullable=False)

    # Relationships to easily get the full object
    component = relationship("Component")
    product = relationship("Product", back_populates="components")

# --- Master Table for Products ---
class Product(Base):
    __tablename__ = "products"
    id = Column(Integer, primary_key=True, index=True)
    name = Column(String, index=True)
    sale_price = Column(Float, nullable=False)
    
    # This relationship now uses the "ProductComposition" link table
    components = relationship("ProductComposition", back_populates="product")

# --- Purchase Order Models ---
class PurchaseOrder(Base):
    __tablename__ = "purchase_orders"
    id = Column(Integer, primary_key=True, index=True)
    vendor_id = Column(Integer, ForeignKey("vendors.id"))
    created_at = Column(DateTime, default=datetime.datetime.utcnow)
    total_cost = Column(Float, nullable=False)
    vendor = relationship("Vendor")
    items = relationship("PurchaseOrderItem", back_populates="purchase_order")

class PurchaseOrderItem(Base):
    __tablename__ = "purchase_order_items"
    id = Column(Integer, primary_key=True, index=True)
    purchase_order_id = Column(Integer, ForeignKey("purchase_orders.id"))
    inventory_item_id = Column(Integer, ForeignKey("inventory_items.id"))
    quantity = Column(Integer, nullable=False)
    purchase_price = Column(Float, nullable=False)
    purchase_order = relationship("PurchaseOrder", back_populates="items")
    inventory_item = relationship("InventoryItem")