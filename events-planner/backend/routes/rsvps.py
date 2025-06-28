from flask import Blueprint, request, jsonify
from flask_jwt_extended import jwt_required, get_jwt_identity
from models import attendees, db

bp = Blueprint('rsvps', __name__, url_prefix='/api/rsvps')

@bp.route('', methods=['POST'])
@jwt_required()
def rsvp():
    data = request.json
    uid = get_jwt_identity()
    ins = attendees.insert().values(
        user_id=uid,
        event_id=data['event_id'],
        status=data['status']
    )
    db.session.execute(ins)
    db.session.commit()
    return '', 201

@bp.route('', methods=['GET'])
@jwt_required()
def my_rsvps():
    uid = get_jwt_identity()
    rows = db.session.execute(
        attendees.select().where(attendees.c.user_id == uid)
    )
    return jsonify([dict(r) for r in rows])
