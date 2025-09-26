import { useState } from "react";
import SignupForm from "../pages/_SignupForm";

export default function TaskDetailsModal({ task, onClose }) {
  const [showSignup, setShowSignup] = useState(false);

  return (
    <div className="modal-backdrop" onClick={onClose}>
      <div className="modal" onClick={(e)=>e.stopPropagation()}>
        <button className="modal-close" onClick={onClose}>×</button>
        <h3>{task.title}</h3>
        <p><strong>NGO:</strong> {task.ngo.name}</p>
        <p><strong>When:</strong> {task.date} • <strong>Hours:</strong> {task.hours}</p>
        <p>{task.description}</p>
        <p><strong>Location:</strong> {task.location}</p>

        {!showSignup ? (
          <div style={{display:"flex", gap:12}}>
            <button className="btn primary" onClick={()=>setShowSignup(true)}>Sign up</button>
            <button className="btn outline" onClick={onClose}>Close</button>
          </div>
        ) : (
          <SignupForm taskId={task.id} onDone={()=>{ setShowSignup(false); onClose(); }} />
        )}
      </div>
    </div>
  );
}
