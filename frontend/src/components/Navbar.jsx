import { useState } from "react";
import { Link } from "react-router-dom";
import "./Navbar.css";

export default function Navbar() {
  const [dark, setDark] = useState(false);

  // Toggle dark mode by adding/removing a class on body
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
        <Link to="/add-task" className="cta">Post Task</Link>
        <Link to="/signups">My Signups</Link>
      </div>
      <div className="nav-right">
        <Link to="/login">Login</Link>
        <Link to="/admin">Admin</Link>
        <button
          className="theme-toggle"
          onClick={handleToggle}
          aria-label="Toggle dark mode"
        >
          {dark ? "🌙" : "☀️"}
        </button>
      </div>
    </nav>
  );
}
