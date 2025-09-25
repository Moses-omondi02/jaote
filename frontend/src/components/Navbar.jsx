import { Link } from "react-router-dom";
import "./Navbar.css";

export default function Navbar() {
  return (
    <nav className="navbar">
      <div className="nav-left">
        <h1 className="brand">Volunteer Task Board</h1>
        <span className="tagline">Connect NGOs with volunteers</span>
      </div>
      <div className="nav-right">
        <Link to="/">Home</Link>
        <Link to="/tasks">Tasks</Link>
        <Link to="/add-task" className="cta">Post Task</Link>
        <Link to="/signups">My Signups</Link>
      </div>
    </nav>
  );
}
