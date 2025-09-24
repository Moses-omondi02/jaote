from flask import Blueprint, request, jsonify
from models import db, Task, NGO
from datetime import datetime

tasks_bp = Blueprint('tasks', __name__)

@tasks_bp.route('/', methods=['GET'])
def get_tasks():
    try:
        # Get query parameters for filtering
        status = request.args.get('status')
        category = request.args.get('category')
        location = request.args.get('location')
        
        query = Task.query
        
        if status:
            query = query.filter(Task.status == status)
        if category:
            query = query.filter(Task.category == category)
        if location:
            query = query.filter(Task.location.ilike(f'%{location}%'))
        
        tasks = query.order_by(Task.created_at.desc()).all()
        
        return jsonify([task.to_dict() for task in tasks])
        
    except Exception as e:
        return jsonify({'error': str(e)}), 500

@tasks_bp.route('/', methods=['POST'])
def create_task():
    try:
        data = request.get_json()
        
        if not data:
            return jsonify({'error': 'No data provided'}), 400
        
        required_fields = ['title', 'ngo_id', 'location', 'hours']
        for field in required_fields:
            if not data.get(field):
                return jsonify({'error': f'{field} is required'}), 400
        
        # Verify NGO exists
        ngo = NGO.query.get(data['ngo_id'])
        if not ngo:
            return jsonify({'error': 'NGO not found'}), 404
        
        task = Task(
            ngo_id=data['ngo_id'],
            title=data['title'],
            description=data.get('description', ''),
            category=data.get('category', 'general'),
            location=data['location'],
            hours=data['hours'],
            status='open'
        )
        
        db.session.add(task)
        db.session.commit()
        
        return jsonify({
            'message': 'Task created successfully',
            'task': task.to_dict()
        }), 201
        
    except Exception as e:
        db.session.rollback()
        return jsonify({'error': str(e)}), 500

@tasks_bp.route('/<int:task_id>', methods=['GET'])
def get_task(task_id):
    try:
        task = Task.query.get_or_404(task_id)
        task_data = task.to_dict()
        
        # Add signups information
        task_data['signups'] = [signup.to_dict() for signup in task.signups]
        
        return jsonify(task_data)
    except Exception as e:
        return jsonify({'error': str(e)}), 500

@tasks_bp.route('/<int:task_id>', methods=['PUT'])
def update_task(task_id):
    try:
        task = Task.query.get_or_404(task_id)
        data = request.get_json()
        
        if not data:
            return jsonify({'error': 'No data provided'}), 400
        
        allowed_fields = ['title', 'description', 'category', 'location', 'hours', 'status']
        for field in allowed_fields:
            if field in data:
                setattr(task, field, data[field])
        
        task.updated_at = datetime.utcnow()
        db.session.commit()
        
        return jsonify({
            'message': 'Task updated successfully',
            'task': task.to_dict()
        })
        
    except Exception as e:
        db.session.rollback()
        return jsonify({'error': str(e)}), 500

@tasks_bp.route('/<int:task_id>', methods=['DELETE'])
def delete_task(task_id):
    try:
        task = Task.query.get_or_404(task_id)
        db.session.delete(task)
        db.session.commit()
        
        return jsonify({'message': 'Task deleted successfully'})
        
    except Exception as e:
        db.session.rollback()
        return jsonify({'error': str(e)}), 500