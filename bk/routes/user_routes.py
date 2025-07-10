from flask import Blueprint, request, jsonify
from bk.controllers.user_controllers import create_user , get_user

user_bp = Blueprint('user_bp', __name__, url_prefix='/api/auth')

# @user_bp.before_request
# def verify_token():
#     token = request.headers.get('Authorization')
#     if not token or token != 'Bearer mysecrettoken':
#         return jsonify({"error": "Unauthorized"}), 401

user_bp.route('/register', methods=['POST'])(create_user)
user_bp.route('/login',methods=['POST'])(get_user)