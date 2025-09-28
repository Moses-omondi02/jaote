import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getTasks } from "../api";

export default function TasksPage({ currentUser }) {
  const [tasks, setTasks] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    if (!currentUser) {
      navigate('/login');
      return;
    }
    getTasks()
      .then((data) => setTasks(data))
      .catch((err) => console.error(err));
  }, [currentUser, navigate]);

  if (!currentUser) {
    return <div>Please log in to view tasks.</div>;
  }

  const filteredTasks = tasks.filter(task =>
    task.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    task.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
    task.location.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="page-container">
      <h1 style={{ marginBottom: "10px", color: "#0a47d1", fontSize: "2.1rem" }}>
        Volunteer Tasks
      </h1>
      <p className="muted" style={{ marginBottom: "24px", fontSize: "1.15rem" }}>
        Browse all available volunteer tasks below.
      </p>
      <div style={{ marginBottom: "20px" }}>
        <input
          type="text"
          placeholder="Search tasks by title, description, or location..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          style={{
            width: "100%",
            padding: "12px 16px",
            fontSize: "1rem",
            border: "1px solid #e6edf3",
            borderRadius: "8px",
            maxWidth: "500px"
          }}
        />
      </div>
      {filteredTasks.length === 0 && tasks.length > 0 ? (
        <p style={{ fontSize: "1.1rem", color: "#888" }}>No tasks match your search.</p>
      ) : filteredTasks.length === 0 ? (
        <p style={{ fontSize: "1.1rem", color: "#888" }}>No tasks available</p>
      ) : (
        <div className="grid" style={{ gap: "24px" }}>
          {filteredTasks.map((task) => (
            <div className="card task-card" key={task.id} style={{ fontSize: "1.08rem", padding: "22px 18px" }}>
              <h3 style={{ color: "#0a47d1", marginBottom: 8 }}>{task.title}</h3>
              <p className="task-desc" style={{ marginBottom: 10 }}>{task.description}</p>
              <div className="task-meta">
                <b>Hours:</b> {task.hours}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}