import os

config = {
    'default': {
        'DEBUG': os.getenv('FLASK_ENV') != 'production',
        'SQLALCHEMY_DATABASE_URI': os.getenv('DATABASE_URL', 'sqlite:///volunteer.db'),
        'SQLALCHEMY_TRACK_MODIFICATIONS': False
    }
}