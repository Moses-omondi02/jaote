// src/pages/SignupsPage.jsx
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getSignups } from "../api";

export default function SignupsPage({ currentUser }) {
  const [signups, setSignups] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    if (!currentUser) {
      navigate('/login');
      return;
    }
    getSignups()
      .then((data) => {
        // Filter signups for tasks posted by current user
        const userSignups = data.filter(signup => signup.task && signup.task.user_id === currentUser.id);
        setSignups(userSignups);
      })
      .catch((err) => console.error(err));
  }, [currentUser, navigate]);

  if (!currentUser) {
    return <div>Please log in to view signups.</div>;
  }

  return (
    <div className="page-container">
      <h1 style={{ marginBottom: "10px", color: "#0a47d1", fontSize: "2.1rem" }}>
        My Task Signups
      </h1>
      <p className="muted" style={{ marginBottom: "24px", fontSize: "1.15rem" }}>
        View users who have signed up for your posted tasks.
      </p>
      {signups.length === 0 ? (
        <p style={{ fontSize: "1.1rem", color: "#888" }}>No signups yet.</p>
      ) : (
        <div className="card" style={{ padding: "15px" }}>
          <table style={{ width: "100%", borderCollapse: "collapse" }}>
            <thead>
              <tr>
                <th style={{ textAlign: "left", padding: "8px", borderBottom: "1px solid #ddd" }}>Task Title</th>
                <th style={{ textAlign: "left", padding: "8px", borderBottom: "1px solid #ddd" }}>User Name</th>
                <th style={{ textAlign: "left", padding: "8px", borderBottom: "1px solid #ddd" }}>User Email</th>
                <th style={{ textAlign: "left", padding: "8px", borderBottom: "1px solid #ddd" }}>Signup Date</th>
              </tr>
            </thead>
            <tbody>
              {signups.map(signup => (
                <tr key={signup.id}>
                  <td style={{ padding: "8px", borderBottom: "1px solid #eee" }}>{signup.task_title}</td>
                  <td style={{ padding: "8px", borderBottom: "1px solid #eee" }}>{signup.user_name}</td>
                  <td style={{ padding: "8px", borderBottom: "1px solid #eee" }}>{signup.user_email}</td>
                  <td style={{ padding: "8px", borderBottom: "1px solid #eee" }}>{signup.created_at ? new Date(signup.created_at).toLocaleDateString() : ''}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
