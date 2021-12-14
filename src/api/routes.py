"""
This module takes care of starting the API Server, Loading the DB and Adding the endpoints
"""
from flask import Flask, request, jsonify, url_for, Blueprint
from api.models import db, User
from api.utils import generate_sitemap, APIException
# jwt
from flask_jwt_extended import jwt_required
from flask_jwt_extended import create_access_token
from flask_jwt_extended import get_jwt_identity



api = Blueprint('api', __name__)


@api.route('/hello', methods=['POST', 'GET'])
def handle_hello():

    response_body = {
        "message": "Hello! I'm a message that came from the backend"
    }

    return jsonify(response_body), 200

@api.route('/sign-up', methods=['POST'])
def sign_up():
    body = request.get_json()

    if body is None:
        return

    user = User(
        email=body.get('email'), 
        password=body.get('password'),
        is_active=True
    )

    db.session.add(user)
    db.session.commit()

    access_token = create_access_token(identity=user.email)
    #access_token = "jl2k3j4lk23j4kj23kj"
    print("*****", access_token)
    return jsonify(access_token = access_token),200 

@api.route('/login', methods=['POST'])
def login():
    body = request.get_json()

    if body is None:
        return

    user = User.query.filter_by(email=body.get("email"),password=body.get("password")).first() # el filter_by devuelve un array y el .first seleciona el primer usuario

    if user : 
        access_token = create_access_token(identity=user.email)
        return jsonify(access_token = access_token),200
    else : return "error login"

    

     