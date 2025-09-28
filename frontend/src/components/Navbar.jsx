import { useState } from "react";
import { Link } from "react-router-dom";
import "./Navbar.css";

export default function Navbar({ currentUser, onLogout }) {
  const [dark, setDark] = useState(false);

 
  const handleToggle = () => {
    setDark(d => {
      if (!d) {
        document.body.classList.add("dark");
      } else {
        document.body.classList.remove("dark");
      }
      return !d;
    });
  };

  return (
    <nav className="navbar">
      <div className="nav-left">
        <h1 className="brand">Volunteer Task Board</h1>
        <span className="tagline">Connect NGOs with volunteers</span>
      </div>
      <div className="nav-center">
        <Link to="/">Home</Link>
        <Link to="/tasks">Tasks</Link>
        {currentUser && <Link to="/add-task" className="cta">Post Task</Link>}
        {currentUser && <Link to="/signups">My Signups</Link>}
        {currentUser && <Link to="/admin">Admin</Link>}
      </div>
      <div className="nav-right">
        {currentUser ? (
          <button onClick={onLogout} className="btn outline">Logout</button>
        ) : (
          <Link to="/login">Login</Link>
        )}
      </div>
    </nav>
  );
}
