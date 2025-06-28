import uuid
from datetime import date
from extensions import db

attendees = db.Table(
    'attendees',
    db.Column('user_id', db.Integer, db.ForeignKey('user.id')),
    db.Column('event_id', db.Integer, db.ForeignKey('event.id')),
    db.Column('status', db.String(20))
)

class User(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(80), unique=True, nullable=False)
    password = db.Column(db.String(200), nullable=False)
    events = db.relationship('Event', backref='owner', lazy=True)
    rsvps = db.relationship('Event', secondary=attendees, backref='attendees')

    def serialize(self):
        return {"id": self.id, "username": self.username}

class Event(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    title = db.Column(db.String(120), nullable=False)
    date = db.Column(db.Date, nullable=False)
    description = db.Column(db.Text)
    owner_id = db.Column(db.Integer, db.ForeignKey('user.id'), nullable=False)
    share_uuid = db.Column(db.String(36),
                           default=lambda: str(uuid.uuid4()),
                           unique=True,
                           nullable=False)
    tasks = db.relationship('Task', backref='event', lazy=True)

    def serialize(self):
        return {
            "id": self.id,
            "title": self.title,
            "date": self.date.isoformat(),
            "description": self.description,
            "owner_id": self.owner_id,
            "share_uuid": self.share_uuid
        }

class Task(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(120), nullable=False)
    done = db.Column(db.Boolean, default=False)
    event_id = db.Column(db.Integer, db.ForeignKey('event.id'), nullable=False)

    def serialize(self):
        return {
            "id": self.id,
            "name": self.name,
            "done": self.done,
            "event_id": self.event_id
        }
