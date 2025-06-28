# backend/routes/auth.py
from flask import Blueprint, request, jsonify
from werkzeug.security import generate_password_hash, check_password_hash
from models import User, db
from flask_jwt_extended import create_access_token, jwt_required, get_jwt_identity

bp = Blueprint('auth', __name__, url_prefix='/api/auth')

@bp.route('/register', methods=['POST'])
def register():
    data = request.json
    pw = generate_password_hash(data['password'])
    user = User(username=data['username'], password=pw)
    db.session.add(user)
    db.session.commit()
    token = create_access_token(identity=user.id)
    return jsonify(token=token), 201

@bp.route('/login', methods=['POST'])
def login():
    data = request.json
    user = User.query.filter_by(username=data['username']).first()
    if not user or not check_password_hash(user.password, data['password']):
        return jsonify(msg='bad'), 401
    token = create_access_token(identity=user.id)
    return jsonify(token=token)

@bp.route('/profile')
@jwt_required()
def profile():
    uid = get_jwt_identity()
    user = User.query.get_or_404(uid)
    return jsonify(user.serialize())
