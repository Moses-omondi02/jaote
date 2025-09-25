A full-stack web application that connects NGOs with volunteers. NGOs can post volunteer opportunities, and volunteers can easily sign up for tasks that match their interests.

🌟 Features
For NGOs:
Create and manage volunteer tasks

Track volunteer signups

Update task status (open, in progress, completed)

For Volunteers:
Browse available volunteer opportunities

Filter tasks by category, location, and status

Sign up for tasks with a personal message

View signing history

🏗️ Tech Stack
Backend:
Python Flask - Web framework

SQLAlchemy - ORM for database operations

SQLite - Database (development)

Flask-Migrate - Database migrations

Flask-CORS - Cross-origin resource sharing

Frontend:
React - Frontend framework (ready for implementation)

React Router - Client-side routing

Axios - HTTP client for API calls

📁 Project Structure
text
jaote/
├── backend/
│   ├── migrations/          # Database migrations
│   ├── routes/              # API route handlers
│   │   ├── ngos.py          # NGO endpoints
│   │   ├── tasks.py         # Task endpoints
│   │   ├── signups.py       # Signup endpoints
│   │   └── users.py         # User endpoints
│   ├── app.py               # Flask application factory
│   ├── config.py            # Configuration settings
│   ├── models.py            # Database models
│   ├── requirements.txt     # Python dependencies
│   ├── seed_data.py         # Sample data generator
│   └── test_api.py          # API testing script
├── frontend/                # React frontend (to be implemented)
└── README.md
🚀 Quick Start
Prerequisites
Python 3.8+

pip (Python package manager)

Backend Setup
Clone and navigate to the project:

bash
cd jaote/backend
Create and activate virtual environment:

bash
python -m venv venv
source venv/bin/activate  # On Windows: venv\Scripts\activate
Install dependencies:

bash
pip install -r requirements.txt
Initialize database:

bash
python -c "
from app import create_app
from models import db
app = create_app()
with app.app_context():
    db.create_all()
    print('✅ Database created!')
"
Seed with sample data:

bash
python seed_data.py
Start the development server:

bash
python app.py
The backend API will be available at http://127.0.0.1:5000

Frontend Setup (Future Implementation)
bash
cd frontend
npm install
npm run dev
📚 API Documentation
Base URL
text
http://127.0.0.1:5000/api
Endpoints
NGOs
GET /ngos - List all NGOs

POST /ngos - Create a new NGO

GET /ngos/:id - Get specific NGO details

GET /ngos/:id/tasks - Get tasks for a specific NGO

Tasks
GET /tasks - List all tasks (with optional filtering)

POST /tasks - Create a new task

GET /tasks/:id - Get specific task detail
