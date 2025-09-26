import React, { useEffect, useState } from "react";
import { getTasks } from "../api";

export default function TasksPage() {
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    getTasks()
      .then((data) => setTasks(data))
      .catch((err) => console.error(err));
  }, []);

  return (
    <div className="page-container">
      <h1 style={{ marginBottom: "10px", color: "#0a47d1", fontSize: "2.1rem" }}>
        Volunteer Tasks
      </h1>
      <p className="muted" style={{ marginBottom: "24px", fontSize: "1.15rem" }}>
        Browse all available volunteer tasks below.
      </p>
      {tasks.length === 0 ? (
        <p style={{ fontSize: "1.1rem", color: "#888" }}>No tasks available</p>
      ) : (
        <div className="grid" style={{ gap: "24px" }}>
          {tasks.map((task) => (
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