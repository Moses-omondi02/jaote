export default function TaskCard({ task, onView }) {
  return (
    <article className="task-card">
      <div className="task-row">
        <h4>{task.title}</h4>
        <div className="task-meta">{task.hours} hrs • {task.location}</div>
      </div>
      <p className="task-desc">{task.description}</p>
      <div className="task-footer">
        <div className="ngo">NGO: {task.ngo.name}</div>
        <div>
          <button className="btn small" onClick={onView}>View</button>
        </div>
      </div>
    </article>
  );
}
