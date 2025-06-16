from sqlalchemy import create_engine, text

engine = create_engine('sqlite:///mydatabase.db', echo = True)

conn = engine.connect()

conn.execute(text("CREATE TABLE IF NOT EXISTS people (name str, age int)"))

conn.commit()

from sqlalchemy.orm import sesion

session =Session(engine)

session.execute(text('INSERT INTO people (name,age) VALUES("Mike, 30);'))

session.commit()