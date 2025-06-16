from sqlalchemy import create_engine, Column, Integer, String, Text
from sqlalchemy.orm import declarative_base, sessionmaker

engine = create_engine("sqlite:///store.db")

BASE = declarative_base()

class Category(BASE):

    __tablename__ = "categories"
    id = Column(Integer(), primary_key=True)
    name = Column(String())
    description = Column(Text())

BASE.metadata.create_all(bind=engine)

Session = sessionmaker(bind=engine)
session = Session()

food = Category(name = "Food", description = "Delicious meals")
session.add(food)

electronics = Category(name = "Electronics", description = "")
session.add(electronics)

session.commit()

category = session.query(Category).filter(Category.name.like("Food")).all()
#print(categories)