from flask import Flask, jsonify, request
from flask_migrate import Migrate
from flask_cors import CORS
from models import db, NGO, Task, User, Signup
from config import config
import os

def create_app(config_name=None):
    if config_name is None:
        config_name = os.getenv('FLASK_ENV', 'default')

    app = Flask(__name__)
    app.config.from_object(config[config_name])

    # Initialize extensions
    db.init_app(app)
    migrate = Migrate(app, db)
    CORS(app, origins=["http://localhost:3000", "http://127.0.0.1:3000"])

    # API Routes

    # NGO routes
    @app.route('/api/ngos', methods=['GET'])
    def get_ngos():
        ngos = NGO.query.all()
        return jsonify([ngo.to_dict() for ngo in ngos])

    @app.route('/api/ngos/<int:id>', methods=['GET'])
    def get_ngo(id):
        ngo = NGO.query.get_or_404(id)
        return jsonify(ngo.to_dict())

    @app.route('/api/ngos', methods=['POST'])
    def create_ngo():
        data = request.get_json()
        ngo = NGO(
            name=data['name'],
            email=data['email'],
            description=data.get('description')
        )
        db.session.add(ngo)
        db.session.commit()
        return jsonify(ngo.to_dict()), 201

    @app.route('/api/ngos/<int:id>', methods=['PUT'])
    def update_ngo(id):
        ngo = NGO.query.get_or_404(id)
        data = request.get_json()
        ngo.name = data.get('name', ngo.name)
        ngo.email = data.get('email', ngo.email)
        ngo.description = data.get('description', ngo.description)
        db.session.commit()
        return jsonify(ngo.to_dict())

    @app.route('/api/ngos/<int:id>', methods=['DELETE'])
    def delete_ngo(id):
        ngo = NGO.query.get_or_404(id)
        db.session.delete(ngo)
        db.session.commit()
        return '', 204

    # Task routes
    @app.route('/api/tasks', methods=['GET'])
    def get_tasks():
        tasks = Task.query.all()
        return jsonify([task.to_dict() for task in tasks])

    @app.route('/api/tasks/<int:id>', methods=['GET'])
    def get_task(id):
        task = Task.query.get_or_404(id)
        return jsonify(task.to_dict())

    @app.route('/api/tasks', methods=['POST'])
    def create_task():
        data = request.get_json()
        task = Task(
            ngo_id=data['ngo_id'],
            title=data['title'],
            description=data.get('description'),
            category=data.get('category', 'general'),
            location=data['location'],
            hours=data['hours'],
            status=data.get('status', 'open')
        )
        db.session.add(task)
        db.session.commit()
        return jsonify(task.to_dict()), 201

    @app.route('/api/tasks/<int:id>', methods=['PUT'])
    def update_task(id):
        task = Task.query.get_or_404(id)
        data = request.get_json()
        task.title = data.get('title', task.title)
        task.description = data.get('description', task.description)
        task.category = data.get('category', task.category)
        task.location = data.get('location', task.location)
        task.hours = data.get('hours', task.hours)
        task.status = data.get('status', task.status)
        db.session.commit()
        return jsonify(task.to_dict())

    @app.route('/api/tasks/<int:id>', methods=['DELETE'])
    def delete_task(id):
        task = Task.query.get_or_404(id)
        db.session.delete(task)
        db.session.commit()
        return '', 204

    # User routes
    @app.route('/api/users', methods=['GET'])
    def get_users():
        users = User.query.all()
        return jsonify([user.to_dict() for user in users])

    @app.route('/api/users/<int:id>', methods=['GET'])
    def get_user(id):
        user = User.query.get_or_404(id)
        return jsonify(user.to_dict())

    @app.route('/api/users', methods=['POST'])
    def create_user():
        data = request.get_json()
        user = User(
            name=data['name'],
            email=data['email']
        )
        db.session.add(user)
        db.session.commit()
        return jsonify(user.to_dict()), 201

    @app.route('/api/users/<int:id>', methods=['PUT'])
    def update_user(id):
        user = User.query.get_or_404(id)
        data = request.get_json()
        user.name = data.get('name', user.name)
        user.email = data.get('email', user.email)
        db.session.commit()
        return jsonify(user.to_dict())

    @app.route('/api/users/<int:id>', methods=['DELETE'])
    def delete_user(id):
        user = User.query.get_or_404(id)
        db.session.delete(user)
        db.session.commit()
        return '', 204

    # Signup routes
    @app.route('/api/signups', methods=['GET'])
    def get_signups():
        signups = Signup.query.all()
        return jsonify([signup.to_dict() for signup in signups])

    @app.route('/api/signups/<int:id>', methods=['GET'])
    def get_signup(id):
        signup = Signup.query.get_or_404(id)
        return jsonify(signup.to_dict())

    @app.route('/api/signups', methods=['POST'])
    def create_signup():
        data = request.get_json()
        signup = Signup(
            task_id=data['task_id'],
            user_id=data['user_id'],
            message=data.get('message')
        )
        db.session.add(signup)
        db.session.commit()
        return jsonify(signup.to_dict()), 201

    @app.route('/api/signups/<int:id>', methods=['PUT'])
    def update_signup(id):
        signup = Signup.query.get_or_404(id)
        data = request.get_json()
        signup.message = data.get('message', signup.message)
        db.session.commit()
        return jsonify(signup.to_dict())

    @app.route('/api/signups/<int:id>', methods=['DELETE'])
    def delete_signup(id):
        signup = Signup.query.get_or_404(id)
        db.session.delete(signup)
        db.session.commit()
        return '', 204

    @app.errorhandler(404)
    def not_found(error):
        return jsonify({'error': 'Resource not found'}), 404

    @app.errorhandler(500)
    def internal_error(error):
        return jsonify({'error': 'Internal server error'}), 500

    return app

# Create app instance for Flask CLI
app = create_app()

# This allows us to use this file with Flask CLI commands
if __name__ == '__main__':
    app.run(debug=app.config['DEBUG'], host='0.0.0.0', port=5000)
