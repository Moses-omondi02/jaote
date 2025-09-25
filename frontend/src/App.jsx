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

  return (
    <div className="app-container">
      <Navbar />
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
          <Route path="/tasks" element={<TasksPage />} />
          <Route path="/add-task" element={<AddTaskPage />} />
          <Route path="/signups" element={<SignupsPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/admin" element={<AdminPage />} />
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
