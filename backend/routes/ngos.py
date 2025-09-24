from flask import Blueprint, request, jsonify
from models import db, NGO

ngos_bp = Blueprint('ngos', __name__)

@ngos_bp.route('/', methods=['GET'])
def get_ngos():
    try:
        ngos = NGO.query.all()
        return jsonify([ngo.to_dict() for ngo in ngos])
    except Exception as e:
        return jsonify({'error': str(e)}), 500

@ngos_bp.route('/', methods=['POST'])
def create_ngo():
    try:
        data = request.get_json()
        
        if not data:
            return jsonify({'error': 'No data provided'}), 400
        
        required_fields = ['name', 'email']
        for field in required_fields:
            if not data.get(field):
                return jsonify({'error': f'{field} is required'}), 400
        
        # Check if email already exists
        existing_ngo = NGO.query.filter_by(email=data['email']).first()
        if existing_ngo:
            return jsonify({'error': 'NGO with this email already exists'}), 400
        
        ngo = NGO(
            name=data['name'],
            email=data['email'],
            description=data.get('description', '')
        )
        
        db.session.add(ngo)
        db.session.commit()
        
        return jsonify({
            'message': 'NGO created successfully',
            'ngo': ngo.to_dict()
        }), 201
        
    except Exception as e:
        db.session.rollback()
        return jsonify({'error': str(e)}), 500

@ngos_bp.route('/<int:ngo_id>', methods=['GET'])
def get_ngo(ngo_id):
    try:
        ngo = NGO.query.get_or_404(ngo_id)
        return jsonify(ngo.to_dict())
    except Exception as e:
        return jsonify({'error': str(e)}), 500

@ngos_bp.route('/<int:ngo_id>/tasks', methods=['GET'])
def get_ngo_tasks(ngo_id):
    try:
        ngo = NGO.query.get_or_404(ngo_id)
        tasks = [task.to_dict() for task in ngo.tasks]
        return jsonify(tasks)
    except Exception as e:
        return jsonify({'error': str(e)}), 500