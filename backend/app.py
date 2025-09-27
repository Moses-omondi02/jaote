from flask import Flask, jsonify, request
from flask_migrate import Migrate
from flask_cors import CORS
from models import db, Task, NGO
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
    CORS(app, origins=["http://localhost:3000", "http://127.0.0.1:3000", "http://localhost:5173", "http://127.0.0.1:5173"])
    
    @app.route('/api/tasks', methods=['GET'])
    def get_tasks():
        tasks = Task.query.all()
        return jsonify([task.to_dict() for task in tasks])
    
    @app.route('/api/tasks', methods=['POST'])
    def create_task():
        data = request.get_json()
        if not data:
            return jsonify({'error': 'No data provided'}), 400
        
        # Assume default NGO ID = 1; in production, authenticate and use current NGO
        ngo = NGO.query.get(1)
        if not ngo:
            return jsonify({'error': 'Default NGO not found. Please seed data.'}), 404
        
        task = Task(
            ngo_id=ngo.id,
            title=data.get('title'),
            description=data.get('description'),
            category=data.get('category', 'general'),
            location=data.get('location'),
            hours=data.get('hours', 0),
            status='open'
        )
        
        db.session.add(task)
        db.session.commit()
        
        return jsonify(task.to_dict()), 201
    
    
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
