# backend/routes/events.py
from flask import Blueprint, request, jsonify
from flask_jwt_extended import jwt_required, get_jwt_identity
from models import Event, Task, db
from datetime import date

bp = Blueprint('events', __name__, url_prefix='/api/events')

@bp.route('', methods=['GET'])
@jwt_required()
def list_events():
    uid = get_jwt_identity()
    q = Event.query.filter(
        (Event.owner_id == uid) | (Event.date < date.today())
    )
    term = request.args.get('q', '').strip()
    if term:
        q = q.filter(Event.title.ilike(f'%{term}%'))
    page = int(request.args.get('page', 1))
    per = int(request.args.get('per_page', 10))
    pag = q.paginate(page=page, per_page=per, error_out=False)
    return jsonify({
        "items": [e.serialize() for e in pag.items],
        "total": pag.total,
        "page": pag.page
    })

@bp.route('', methods=['POST'])
@jwt_required()
def create_event():
    data = request.json
    uid = get_jwt_identity()
    ev = Event(**data, owner_id=uid)
    db.session.add(ev)
    db.session.commit()
    return jsonify(ev.serialize()), 201

@bp.route('/<int:id>', methods=['PUT', 'DELETE'])
@jwt_required()
def mod_event(id):
    uid = get_jwt_identity()
    ev = Event.query.get_or_404(id)
    if ev.owner_id != uid:
        return '', 403
    if request.method == 'PUT':
        for k, v in request.json.items():
            setattr(ev, k, v)
        db.session.commit()
        return jsonify(ev.serialize())
    db.session.delete(ev)
    db.session.commit()
    return '', 204

@bp.route('/share/<share_uuid>', methods=['GET'])
def public_event(share_uuid):
    ev = Event.query.filter_by(share_uuid=share_uuid).first_or_404()
    tasks = [t.serialize() for t in Task.query.filter_by(event_id=ev.id)]
    out = ev.serialize()
    out['tasks'] = tasks
    return jsonify(out)
