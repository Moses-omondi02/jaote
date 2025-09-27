import React, { useState, useEffect } from "react";

// Mock data for demonstration (using localStorage for persistence)
const usersStorageKey = "taskboard_users";
const tasksStorageKey = "taskboard_tasks";
const signupsStorageKey = "taskboard_signups";

// Initialize with mock data if not present
const initializeStorage = () => {
  if (!localStorage.getItem(usersStorageKey)) {
    const mockUsers = [
      { id: 1, name: "John Doe", email: "john@example.com", userType: "volunteer", createdAt: "2025-09-15" },
      { id: 2, name: "Jane Smith", email: "jane@example.com", userType: "ngo", createdAt: "2025-09-18" },
      { id: 3, name: "Robert Johnson", email: "robert@example.com", userType: "volunteer", createdAt: "2025-09-20" },
      { id: 4, name: "Green Nairobi", email: "info@greennairobi.org", userType: "ngo", createdAt: "2025-09-10" },
    ];
    localStorage.setItem(usersStorageKey, JSON.stringify(mockUsers));
  }
  
  if (!localStorage.getItem(tasksStorageKey)) {
    const mockTasks = [
      { id: 1, title: "Park Cleanup", ngo: "Green Nairobi", volunteers: 5, status: "Active" },
      { id: 2, title: "Reading Circle (Kids)", ngo: "BrightKids NGO", volunteers: 3, status: "Completed" },
      { id: 3, title: "Tree Planting", ngo: "Green Nairobi", volunteers: 8, status: "Active" },
    ];
    localStorage.setItem(tasksStorageKey, JSON.stringify(mockTasks));
  }
  
  if (!localStorage.getItem(signupsStorageKey)) {
    const mockSignups = [
      { id: 1, taskId: 1, userName: "John Doe", userEmail: "john@example.com", date: "2025-09-20" },
      { id: 2, taskId: 1, userName: "Jane Smith", userEmail: "jane@example.com", date: "2025-09-21" },
      { id: 3, taskId: 3, userName: "Robert Johnson", userEmail: "robert@example.com", date: "2025-09-22" },
    ];
    localStorage.setItem(signupsStorageKey, JSON.stringify(mockSignups));
  }
};

export default function AdminPage() {
  const [activeTab, setActiveTab] = useState("users");
  const [users, setUsers] = useState([]);
  const [tasks, setTasks] = useState([]);
  const [signups, setSignups] = useState([]);
  const [editingUser, setEditingUser] = useState(null);
  const [editingTask, setEditingTask] = useState(null);

  // Initialize storage and load data
  useEffect(() => {
    initializeStorage();
    loadData();
  }, []);

  const loadData = () => {
    setUsers(JSON.parse(localStorage.getItem(usersStorageKey) || "[]"));
    setTasks(JSON.parse(localStorage.getItem(tasksStorageKey) || "[]"));
    setSignups(JSON.parse(localStorage.getItem(signupsStorageKey) || "[]"));
  };

  const handleDeleteUser = (userId) => {
    if (window.confirm("Are you sure you want to delete this user?")) {
      const updatedUsers = users.filter(user => user.id !== userId);
      localStorage.setItem(usersStorageKey, JSON.stringify(updatedUsers));
      setUsers(updatedUsers);
      alert("User deleted successfully!");
    }
  };

  const handleDeleteTask = (taskId) => {
    if (window.confirm("Are you sure you want to delete this task?")) {
      const updatedTasks = tasks.filter(task => task.id !== taskId);
      localStorage.setItem(tasksStorageKey, JSON.stringify(updatedTasks));
      setTasks(updatedTasks);
      alert("Task deleted successfully!");
    }
  };

  const handleDeleteSignup = (signupId) => {
    if (window.confirm("Are you sure you want to remove this signup?")) {
      const updatedSignups = signups.filter(signup => signup.id !== signupId);
      localStorage.setItem(signupsStorageKey, JSON.stringify(updatedSignups));
      setSignups(updatedSignups);
      alert("Signup removed successfully!");
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
                <h3>{user.name}</h3>
                <p><b>Email:</b> {user.email}</p>
                <p><b>Type:</b> {user.userType === "volunteer" ? "Volunteer" : "NGO"}</p>
                <p><b>Joined:</b> {user.createdAt}</p>
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
                <p><b>NGO:</b> {task.ngo}</p>
                <p><b>Volunteers:</b> {task.volunteers}</p>
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
                    <td style={{ padding: "8px", borderBottom: "1px solid #eee" }}>{signup.taskId}</td>
                    <td style={{ padding: "8px", borderBottom: "1px solid #eee" }}>{signup.userName}</td>
                    <td style={{ padding: "8px", borderBottom: "1px solid #eee" }}>{signup.userEmail}</td>
                    <td style={{ padding: "8px", borderBottom: "1px solid #eee" }}>{signup.date}</td>
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