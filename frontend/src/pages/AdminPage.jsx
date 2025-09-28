import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { getUsers, getSignups, getTasks } from "../api";

export default function AdminPage({ currentUser }) {
  const [activeTab, setActiveTab] = useState("users");
  const [users, setUsers] = useState([]);
  const [tasks, setTasks] = useState([]);
  const [signups, setSignups] = useState([]);
  const [editingUser, setEditingUser] = useState(null);
  const [editingTask, setEditingTask] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    if (!currentUser || !currentUser.is_admin) {
      navigate('/login');
      return;
    }
  }, [currentUser, navigate]);

  if (!currentUser || !currentUser.is_admin) {
    return <div>Access denied. Admin privileges required.</div>;
  }

  // Load data from backend
  useEffect(() => {
    const loadData = async () => {
      try {
        const [usersData, signupsData, tasksData] = await Promise.all([getUsers(), getSignups(), getTasks()]);
        setUsers(usersData);
        setSignups(signupsData);
        setTasks(tasksData);
      } catch (error) {
        console.error("Failed to load data", error);
      }
    };
    loadData();
  }, []);

  const handleDeleteUser = (userId) => {
    if (window.confirm("Are you sure you want to delete this user?")) {
      const updatedUsers = users.filter(user => user.id !== userId);
      setUsers(updatedUsers);
      alert("User deleted successfully! (Note: This change is not persisted to the backend as delete API is not implemented.)");
    }
  };

  const handleDeleteTask = (taskId) => {
    if (window.confirm("Are you sure you want to delete this task?")) {
      const updatedTasks = tasks.filter(task => task.id !== taskId);
      setTasks(updatedTasks);
      alert("Task deleted successfully! (Note: This change is not persisted to the backend as delete API is not implemented.)");
    }
  };

  const handleDeleteSignup = (signupId) => {
    if (window.confirm("Are you sure you want to remove this signup?")) {
      const updatedSignups = signups.filter(signup => signup.id !== signupId);
      setSignups(updatedSignups);
      alert("Signup removed successfully! (Note: This change is not persisted to the backend as delete API is not implemented.)");
    }
  };

  const handleEditUser = (user) => {
    // For demo purposes, we'll just show an alert with user details
    alert(`Edit functionality would open a form for: ${user.name}\n\nIn a full implementation, this would open an edit form.`);
  };

  const handleEditTask = (task) => {
    // For demo purposes, we'll just show an alert with task details
    alert(`Edit functionality would open a form for: ${task.title}\n\nIn a full implementation, this would open an edit form.`);
  };

  return (
    <div className="page-container">
      <h1>Admin Dashboard</h1>
      <p className="muted">Manage and track all application data and records</p>
      
      <div className="admin-controls" style={{ marginBottom: "20px" }}>
        <button
          className={activeTab === "users" ? "btn primary" : "btn outline"}
          onClick={() => setActiveTab("users")}
          style={{ marginRight: "10px" }}
        >
          Users
        </button>
        <button
          className={activeTab === "tasks" ? "btn primary" : "btn outline"}
          onClick={() => setActiveTab("tasks")}
          style={{ marginRight: "10px" }}
        >
          Tasks
        </button>
        <button
          className={activeTab === "signups" ? "btn primary" : "btn outline"}
          onClick={() => setActiveTab("signups")}
        >
          Signups
        </button>
      </div>
      
      {activeTab === "users" && (
        <div className="admin-section">
          <h2>Registered Users</h2>
          <div className="grid">
            {users.map(user => (
              <div className="card" key={user.id} style={{ padding: "15px" }}>
                <h3>{user.name} {user.is_admin && <span style={{ color: "red" }}>(Admin)</span>}</h3>
                <p><b>Email:</b> {user.email}</p>
                <p><b>Joined:</b> {user.created_at ? new Date(user.created_at).toLocaleDateString() : ''}</p>
                <div style={{ marginTop: "10px" }}>
                  <button
                    className="btn small outline"
                    style={{ marginRight: "5px" }}
                    onClick={() => handleEditUser(user)}
                  >
                    Edit
                  </button>
                  <button
                    className="btn small primary"
                    onClick={() => handleDeleteUser(user.id)}
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
      
      {activeTab === "tasks" && (
        <div className="admin-section">
          <h2>Tasks Overview</h2>
          <div className="grid">
            {tasks.map(task => (
              <div className="card" key={task.id} style={{ padding: "15px" }}>
                <h3>{task.title}</h3>
                <p><b>NGO:</b> {task.ngo_name}</p>
                <p><b>Status:</b> {task.status}</p>
                <div style={{ marginTop: "10px" }}>
                  <button
                    className="btn small outline"
                    style={{ marginRight: "5px" }}
                    onClick={() => handleEditTask(task)}
                  >
                    Edit
                  </button>
                  <button
                    className="btn small primary"
                    onClick={() => handleDeleteTask(task.id)}
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
      
      {activeTab === "signups" && (
        <div className="admin-section">
          <h2>Volunteer Signups</h2>
          <div className="card" style={{ padding: "15px" }}>
            <table style={{ width: "100%", borderCollapse: "collapse" }}>
              <thead>
                <tr>
                  <th style={{ textAlign: "left", padding: "8px", borderBottom: "1px solid #ddd" }}>Task ID</th>
                  <th style={{ textAlign: "left", padding: "8px", borderBottom: "1px solid #ddd" }}>User</th>
                  <th style={{ textAlign: "left", padding: "8px", borderBottom: "1px solid #ddd" }}>Email</th>
                  <th style={{ textAlign: "left", padding: "8px", borderBottom: "1px solid #ddd" }}>Date</th>
                  <th style={{ textAlign: "left", padding: "8px", borderBottom: "1px solid #ddd" }}>Actions</th>
                </tr>
              </thead>
              <tbody>
                {signups.map(signup => (
                  <tr key={signup.id}>
                    <td style={{ padding: "8px", borderBottom: "1px solid #eee" }}>{signup.task_id}</td>
                    <td style={{ padding: "8px", borderBottom: "1px solid #eee" }}>{signup.user_name}</td>
                    <td style={{ padding: "8px", borderBottom: "1px solid #eee" }}>{signup.user_email}</td>
                    <td style={{ padding: "8px", borderBottom: "1px solid #eee" }}>{signup.created_at ? new Date(signup.created_at).toLocaleDateString() : ''}</td>
                    <td style={{ padding: "8px", borderBottom: "1px solid #eee" }}>
                      <button className="btn small outline" style={{ marginRight: "5px" }}>
                        View
                      </button>
                      <button
                        className="btn small primary"
                        onClick={() => handleDeleteSignup(signup.id)}
                      >
                        Remove
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
}