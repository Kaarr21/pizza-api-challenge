from flask import Blueprint, request, jsonify
from flask_jwt_extended import jwt_required
from models import Task, db

bp = Blueprint('tasks', __name__, url_prefix='/api/tasks')

@bp.route('', methods=['GET'])
@jwt_required()
def list_tasks():
    q = Task.query
    term = request.args.get('q')
    if term:
        q = q.filter(Task.name.ilike(f'%{term}%'))
    page = int(request.args.get('page', 1))
    per = int(request.args.get('per_page', 10))
    pag = q.paginate(page=page, per_page=per, error_out=False)
    return jsonify({
        "items": [t.serialize() for t in pag.items],
        "total": pag.total,
        "page": pag.page
    })

@bp.route('', methods=['POST'])
@jwt_required()
def create_task():
    data = request.json
    t = Task(**data)
    db.session.add(t)
    db.session.commit()
    return jsonify(t.serialize()), 201

@bp.route('/<int:id>', methods=['PUT', 'DELETE'])
@jwt_required()
def mod_task(id):
    t = Task.query.get_or_404(id)
    if request.method == 'PUT':
        for k, v in request.json.items():
            setattr(t, k, v)
        db.session.commit()
        return jsonify(t.serialize())
    db.session.delete(t)
    db.session.commit()
    return '', 204
