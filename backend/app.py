from flask import Flask, jsonify
from flask_migrate import Migrate
from flask_cors import CORS
from models import db
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
    
    # Register blueprints
    from routes.ngos import ngos_bp
    from routes.tasks import tasks_bp
    from routes.signups import signups_bp
    from routes.users import users_bp
    
    app.register_blueprint(ngos_bp, url_prefix='/api/ngos')
    app.register_blueprint(tasks_bp, url_prefix='/api/tasks')
    app.register_blueprint(signups_bp, url_prefix='/api/signups')
    app.register_blueprint(users_bp, url_prefix='/api/users')
    
    # Health check endpoint
    @app.route('/api/health')
    def health_check():
        return jsonify({
            'status': 'healthy',
            'message': 'Volunteer Task Board API is running',
            'environment': config_name
        })
    
    # Root endpoint
    @app.route('/')
    def index():
        return jsonify({
            'message': 'Volunteer Task Board API',
            'version': '1.0.0',
            'endpoints': {
                'tasks': '/api/tasks',
                'ngos': '/api/ngos',
                'signups': '/api/signups',
                'users': '/api/users'
            }
        })
    
    # Error handlers
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
