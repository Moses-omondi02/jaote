import { useState } from "react";
import TaskCard from "../components/TaskCard";
import TaskDetailsModal from "../components/TaskDetailsModal";

/* mock tasks - replace with fetch when backend ready */
const MOCK_TASKS = [
  {
    id: 1,
    title: "Park Cleanup",
    description: "Help clean the neighborhood park. Bags and gloves provided.",
    hours: 3,
    location: "Eastwood Park",
    ngo: { id: 1, name: "Green Nairobi" },
    date: "2025-10-02",
  },
  {
    id: 2,
    title: "Reading Circle (Kids)",
    description: "Read aloud & help kids with story activities.",
    hours: 2,
    location: "Community Center",
    ngo: { id: 2, name: "BrightKids NGO" },
    date: "2025-10-05",
  },
  {
    id: 3,
    title: "Tree Planting",
    description: "Join tree planting drive. Bring a hat and water bottle.",
    hours: 4,
    location: "Riverbank",
    ngo: { id: 1, name: "Green Nairobi" },
    date: "2025-10-10",
  },
];

export default function Home() {
  const [tasks] = useState(MOCK_TASKS);
  const [selected, setSelected] = useState(null);

  return (
    <div className="container home">
      <section className="hero card">
        <div className="hero-left">
          <h2>Find Volunteer Opportunities Near You</h2>
          <p>
            Browse tasks posted by NGOs, sign up quickly, and make an impact.
            Filter by location or hours and join teams today.
          </p>
          <div className="hero-ctas">
            <a className="btn primary" href="#tasks">Browse Tasks</a>
            <a className="btn outline" href="/add-task">Post a Task</a>
          </div>
        </div>
        <div className="hero-right">
          <img src="/src/assets/volunteer-illus.svg" alt="volunteer" style={{maxWidth:"320px"}}/>
        </div>
      </section>

      <section id="tasks" className="section">
        <h3>Featured Tasks</h3>
        <p className="muted">Popular and recent volunteer opportunities.</p>

        <div className="grid">
          {tasks.map((t) => (
            <TaskCard key={t.id} task={t} onView={() => setSelected(t)} />
          ))}
        </div>
      </section>

      <section className="how card">
        <h3>How it works</h3>
        <ol>
          <li>NGOs post tasks describing what they need and where.</li>
          <li>Volunteers browse tasks and view details.</li>
          <li>Sign up with a brief message; NGOs review signups and coordinate.</li>
        </ol>
      </section>

      {selected && (
        <TaskDetailsModal task={selected} onClose={() => setSelected(null)} />
      )}
    </div>
  );
}
