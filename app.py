from flask import Flask, request, jsonify
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

# In-memory storage
tasks = []
users = []  # list of user data
signups = []  # list of user signup data
task_signups = []  # list of task signup data

@app.route('/api/tasks', methods=['GET'])
def get_tasks():
    return jsonify(tasks)

@app.route('/api/tasks', methods=['POST'])
def add_task():
    data = request.json
    user_id = data.get('user_id')
    user = next((u for u in users if u['id'] == user_id), None)
    poster_name = user['name'] if user else 'Unknown'
    task = {
        'id': len(tasks) + 1,
        'title': data.get('title', ''),
        'description': data.get('description', ''),
        'date': data.get('date', ''),
        'priority': data.get('priority', 'medium'),
        'status': 'pending',
        'hours': data.get('hours', ''),
        'location': data.get('location', ''),
        'user_id': user_id,
        'ngo': {'name': poster_name}
    }
    tasks.append(task)
    return jsonify(task), 201

@app.route('/api/login', methods=['POST'])
def login():
    data = request.json
    email = data.get('email')
    password = data.get('password')

    user = next((u for u in users if u['email'] == email and u['password'] == password), None)
    if user:
        return jsonify({'message': 'Login successful', 'token': 'fake-jwt-token', 'user': user})
    else:
        return jsonify({'error': 'Invalid credentials'}), 401

@app.route('/api/signup', methods=['POST'])
def signup():
    data = request.json
    email = data.get('email')

    if any(u['email'] == email for u in users):
        return jsonify({'error': 'User already exists'}), 400

    user_data = {
        'id': len(users) + 1,
        'name': data.get('name'),
        'email': email,
        'password': data.get('password'),
        'userType': data.get('userType')
    }
    users.append(user_data)
    signup_data = {**data, 'id': len(signups) + 1}
    signups.append(signup_data)
    return jsonify({'message': 'Signup successful'}), 201

@app.route('/api/task-signups', methods=['POST'])
def add_task_signup():
    data = request.json
    task_id = data.get('task_id')
    user_name = data.get('name')
    user_email = data.get('email')
    message = data.get('message', '')

    # Find the task
    task = next((t for t in tasks if t['id'] == task_id), None)
    if not task:
        return jsonify({'error': 'Task not found'}), 404

    signup_data = {
        'id': len(task_signups) + 1,
        'task_id': task_id,
        'task_title': task['title'],
        'user_name': user_name,
        'user_email': user_email,
        'message': message,
        'created_at': data.get('created_at', None),
        'task': task  # include task for filtering
    }
    task_signups.append(signup_data)
    return jsonify(signup_data), 201

@app.route('/api/task-signups', methods=['GET'])
def get_task_signups():
    return jsonify(task_signups)

@app.route('/api/admin/data', methods=['GET'])
def get_admin_data():
    return jsonify({'total_tasks': len(tasks), 'total_users': len(users)})

@app.route('/api/admin/users', methods=['GET'])
def get_users():
    return jsonify(users)

@app.route('/api/admin/signups', methods=['GET'])
def get_signups():
    return jsonify(signups)

if __name__ == '__main__':
    app.run(debug=True, port=5000)
