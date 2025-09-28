# JAOTE - Volunteer Task Board

This is a volunteer task management application with a React frontend and Flask backend.

## Project Structure

```
jaote/
├── backend/          # Flask backend application
│   ├── app.py        # Main Flask application
│   ├── models.py     # Database models
│   ├── config.py     # Configuration settings
│   ├── requirements.txt  # Python dependencies
│   └── seed_data.py  # Sample data for development
├── frontend/         # React frontend application
│   ├── src/
│   │   ├── api.js     # API functions for backend communication
│   │   ├── components/  # React components
│   │   └── pages/    # React pages
│   ├── vite.config.js  # Vite configuration with proxy
│   └── package.json  # Node.js dependencies
└── README.md         # This file
```

## Frontend-Backend Connection

The frontend and backend are connected through the following mechanisms:

1. **API Proxy Configuration**: The frontend uses Vite's proxy feature to forward API requests to the backend server.
   - Configuration in `frontend/vite.config.js`
   - All requests to `/api/*` are proxied to `http://127.0.0.1:5000`

2. **CORS Setup**: The backend has CORS configured to allow requests from the frontend development server.
   - Configuration in `backend/app.py`
   - Allows origins: `http://localhost:3000`, `http://127.0.0.1:3000`, `http://localhost:5173`, `http://127.0.0.1:5173`

3. **API Endpoints**: The backend provides RESTful API endpoints that the frontend consumes:
   - `GET /api/tasks` - Retrieve all tasks
   - `POST /api/tasks` - Create a new task
   - `POST /api/login` - User login
   - `POST /api/signup` - User signup
   - `GET /api/admin/users` - Retrieve all users (admin)
   - `GET /api/admin/signups` - Retrieve all signups (admin)
   - `GET /api/admin/data` - Retrieve admin dashboard data (admin)

## Running the Application

1. **Start the Backend Server**:
   ```bash
   cd backend
   python app.py
   ```

2. **Start the Frontend Development Server**:
   ```bash
   cd frontend
   npm run dev
   ```

3. **Access the Application**:
   - Frontend: http://localhost:5173
   - Backend API: http://localhost:5000

## Database Setup

The application uses SQLite for development. To seed the database with sample data:

```bash
cd backend
python seed_data.py
```

This will create sample NGOs, tasks, users, and signups for testing purposes.

## Dependencies

### Backend:
- Flask
- Flask-SQLAlchemy
- Flask-Migrate
- Flask-CORS

Install with:
```bash
cd backend
pip install -r requirements.txt
```

### Frontend:
- React
- Vite
- Formik
- Yup
- React Router DOM

Install with:
```bash
cd frontend
npm install
```

## Testing the Connection

To verify the frontend-backend connection is working properly:

1. Start both servers (frontend and backend)
2. Visit http://localhost:5173 in your browser
3. Navigate to the "Add Task" page
4. Fill in the task form and submit
5. Check that the task appears in the task list
6. Verify the task was saved to the database by checking the backend console output

The connection is now permanent and will work as long as both servers are running.
