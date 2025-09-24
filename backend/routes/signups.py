from flask import Blueprint, request, jsonify
from models import db, Signup, Task, User
from sqlalchemy import and_

signups_bp = Blueprint('signups', __name__)

@signups_bp.route('/', methods=['POST'])
def create_signup():
    try:
        data = request.get_json()
        
        if not data:
            return jsonify({'error': 'No data provided'}), 400
        
        required_fields = ['task_id', 'user_name', 'user_email', 'message']
        for field in required_fields:
            if not data.get(field):
                return jsonify({'error': f'{field} is required'}), 400
        
        # Check if task exists and is open
        task = Task.query.get(data['task_id'])
        if not task:
            return jsonify({'error': 'Task not found'}), 404
        
        if task.status != 'open':
            return jsonify({'error': 'Task is not open for signups'}), 400
        
        # Find or create user
        user = User.query.filter_by(email=data['user_email']).first()
        if not user:
            user = User(name=data['user_name'], email=data['user_email'])
            db.session.add(user)
            db.session.flush()  # Get user ID without committing
        
        # Check for existing signup
        existing_signup = Signup.query.filter(
            and_(Signup.task_id == data['task_id'], Signup.user_id == user.id)
        ).first()
        
        if existing_signup:
            return jsonify({'error': 'You have already signed up for this task'}), 400
        
        # Create signup
        signup = Signup(
            task_id=data['task_id'],
            user_id=user.id,
            message=data['message']
        )
        
        db.session.add(signup)
        db.session.commit()
        
        return jsonify({
            'message': 'Successfully signed up for the task!',
            'signup': signup.to_dict()
        }), 201
        
    except Exception as e:
        db.session.rollback()
        return jsonify({'error': str(e)}), 500

@signups_bp.route('/', methods=['GET'])
def get_signups():
    try:
        user_email = request.args.get('user_email')
        ngo_id = request.args.get('ngo_id')
        task_id = request.args.get('task_id')
        
        query = Signup.query
        
        if user_email:
            query = query.join(User).filter(User.email == user_email)
        elif ngo_id:
            query = query.join(Task).filter(Task.ngo_id == ngo_id)
        elif task_id:
            query = query.filter(Signup.task_id == task_id)
        
        signups = query.order_by(Signup.created_at.desc()).all()
        
        return jsonify([signup.to_dict() for signup in signups])
        
    except Exception as e:
        return jsonify({'error': str(e)}), 500

@signups_bp.route('/<int:signup_id>', methods=['DELETE'])
def delete_signup(signup_id):
    try:
        signup = Signup.query.get_or_404(signup_id)
        db.session.delete(signup)
        db.session.commit()
        
        return jsonify({'message': 'Signup deleted successfully'})
        
    except Exception as e:
        db.session.rollback()
        return jsonify({'error': str(e)}), 500