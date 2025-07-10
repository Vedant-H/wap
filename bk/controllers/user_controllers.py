from flask import request, jsonify
from bk.models.users import User
from bk import db

def create_user():
    data = request.get_json()
    user = User(username=data['username'], email=data['email'],password=data['password'])
    db.session.add(user)
    db.session.commit()
    print("happened")
    return jsonify({"message": "User created"}), 201

def get_user():
    data = request.get_json()

    if not data or not 'email' in data or not 'password' in data:
        return jsonify({"message": "Email and password are required"}), 400
    
    users=  User.query.filter_by(email=data['email']).first() # get list of users
    print(users)
    if users.password and data['password'] :
       return jsonify({"message": "Login successful", "user_id": users.id}),200


    return 400 