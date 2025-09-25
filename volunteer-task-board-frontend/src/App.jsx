import { Routes, Route, Link } from "react-router-dom";
import Tasks from "./pages/Tasks";
import Signups from "./pages/Signups";
import AddTask from "./pages/AddTask";

function App() {
  return (
    <div>
      <nav style={styles.nav}>
        <h2 style={styles.logo}>Volunteer Task Board</h2>
        <div style={styles.links}>
          <Link to="/tasks">Tasks</Link>
          <Link to="/signups">Signups</Link>
          <Link to="/add-task">Add Task</Link>
        </div>
      </nav>

      <div style={styles.container}>
        <Routes>
          <Route path="/tasks" element={<Tasks />} />
          <Route path="/signups" element={<Signups />} />
          <Route path="/add-task" element={<AddTask />} />
          <Route path="/" element={<Tasks />} />
        </Routes>
      </div>
    </div>
  );
}

const styles = {
  nav: {
    background: "#2c3e50",
    padding: "1rem",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
  },
  logo: { color: "white", margin: 0 },
  links: { display: "flex", gap: "1rem" },
  container: { padding: "1rem" },
};

export default App;
