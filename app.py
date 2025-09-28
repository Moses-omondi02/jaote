from flask import Flask, request, jsonify
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

# In-memory storage
tasks = []
users = {}  # email: password
signups = []  # list of signup data

@app.route('/api/tasks', methods=['GET'])
def get_tasks():
    return jsonify(tasks)

@app.route('/api/tasks', methods=['POST'])
def add_task():
    data = request.json
    task = {
        'id': len(tasks) + 1,
        'title': data.get('title', ''),
        'description': data.get('description', ''),
        'due_date': data.get('due_date', ''),
        'priority': data.get('priority', 'medium'),
        'status': 'pending'
    }
    tasks.append(task)
    return jsonify(task), 201

@app.route('/api/login', methods=['POST'])
def login():
    data = request.json
    email = data.get('email')
    password = data.get('password')
    
    if email in users and users[email] == password:
        return jsonify({'message': 'Login successful', 'token': 'fake-jwt-token'})
    else:
        return jsonify({'error': 'Invalid credentials'}), 401

@app.route('/api/signup', methods=['POST'])
def signup():
    data = request.json
    email = data.get('email')
    
    if email in users:
        return jsonify({'error': 'User already exists'}), 400
    
    users[email] = data.get('password')
    signup_data = {**data, 'id': len(signups) + 1}
    signups.append(signup_data)
    return jsonify({'message': 'Signup successful'}), 201

@app.route('/api/admin/data', methods=['GET'])
def get_admin_data():
    return jsonify({'total_tasks': len(tasks), 'total_users': len(users)})

@app.route('/api/admin/users', methods=['GET'])
def get_users():
    user_list = [{'email': email, 'id': i+1} for i, email in enumerate(users.keys())]
    return jsonify(user_list)

@app.route('/api/admin/signups', methods=['GET'])
def get_signups():
    return jsonify(signups)

if __name__ == '__main__':
    app.run(debug=True, port=5000)
