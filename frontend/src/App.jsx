import { Routes, Route } from "react-router-dom";
import { useState, useEffect } from "react";
import Navbar from "./components/Navbar";
import TasksPage from "./pages/Taskpage";
import AddTaskPage from "./pages/AddTaskpage";
import SignupsPage from "./pages/SignupsPage";
import LoginPage from "./pages/LoginPage";
import AdminPage from "./pages/AdminPage";
import Home from "./pages/Pages";
import Taskform from "./components/Taskform";
import Signuplist from "./components/Signuplist";
import "./App.css";

function App() {
  const [currentDateTime, setCurrentDateTime] = useState(new Date());
  const [currentUser, setCurrentUser] = useState(() => {
    const savedUser = localStorage.getItem("currentUser");
    return savedUser ? JSON.parse(savedUser) : null;
  });

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentDateTime(new Date());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const formatDateTime = (date) => {
    const options = {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
      timeZoneName: 'short'
    };

    return date.toLocaleDateString('en-US', options);
  };

  const handleLogout = () => {
    setCurrentUser(null);
    localStorage.removeItem("currentUser");
  };

  return (
    <div className="app-container">
      <Navbar currentUser={currentUser} onLogout={handleLogout} />
      <div className="datetime-display" style={{
        textAlign: "center",
        padding: "10px",
        backgroundColor: "#f0f4f8",
        fontWeight: "500",
        fontSize: "0.9rem",
        borderBottom: "1px solid #e2e8f0"
      }}>
        {formatDateTime(currentDateTime)}
      </div>
      <div className="container">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/tasks" element={<TasksPage currentUser={currentUser} />} />
          <Route path="/add-task" element={<AddTaskPage currentUser={currentUser} />} />
          <Route path="/signups" element={<SignupsPage currentUser={currentUser} />} />
          <Route path="/login" element={<LoginPage setCurrentUser={setCurrentUser} />} />
          <Route path="/admin" element={<AdminPage currentUser={currentUser} />} />
          <Route path="/test-forms" element={
            <div>
              <h1>Test Forms</h1>
              <Taskform onSubmit={(values) => console.log("Task submitted:", values)} />
              <Signuplist onSignup={(user) => console.log("User signed up:", user)} />
            </div>
          } />
        </Routes>
      </div>
    </div>
  );
}

export default App;
