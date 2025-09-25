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
