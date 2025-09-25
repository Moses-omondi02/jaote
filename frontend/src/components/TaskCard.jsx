import React from "react";

export default function TaskCard({ task, onView }) {
  // Mock application count for demonstration
  const applicationCount = Math.floor(Math.random() * 10) + 1;
  
  return (
    <div className="task-card" style={{ 
      display: "flex", 
      flexDirection: "column", 
      height: "100%",
      position: "relative",
      overflow: "hidden"
    }}>
      <div 
        className="task-image" 
        style={{ 
          height: "150px", 
          backgroundColor: "#e0f0ff", 
          borderRadius: "8px 8px 0 0",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          position: "relative",
          overflow: "hidden"
        }}
      >
        {/* Floating image effect */}
        <div 
          style={{
            width: "80px",
            height: "80px",
            backgroundColor: "#007BFF",
            borderRadius: "50%",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            color: "white",
            fontWeight: "bold",
            fontSize: "24px",
            transform: "rotate(-15deg)",
            boxShadow: "0 4px 8px rgba(0,0,0,0.2)",
            position: "absolute",
            top: "20px",
            left: "20px",
            animation: "float 3s ease-in-out infinite"
          }}
        >
          {task.title.charAt(0)}
        </div>
        
        <div 
          style={{
            width: "50px",
            height: "50px",
            backgroundColor: "#ff8a3d",
            borderRadius: "50%",
            position: "absolute",
            bottom: "15px",
            right: "15px",
            animation: "float 4s ease-in-out infinite",
            animationDelay: "0.5s"
          }}
        />
      </div>
      
      <div style={{ padding: "16px", flex: 1, display: "flex", flexDirection: "column" }}>
        <h3 style={{ 
          margin: "0 0 8px 0", 
          color: "#0a47d1", 
          fontSize: "1.2rem" 
        }}>
          {task.title}
        </h3>
        
        <p style={{ 
          color: "#666", 
          fontSize: "0.95rem", 
          flex: 1,
          marginBottom: "12px"
        }}>
          {task.description}
        </p>
        
        <div style={{ 
          display: "flex", 
          justifyContent: "space-between", 
          alignItems: "center",
          marginTop: "auto",
          paddingTop: "12px",
          borderTop: "1px solid #eee"
        }}>
          <div>
            <p style={{ margin: "0 0 4px 0", fontSize: "0.85rem", color: "#888" }}>
              <strong>NGO:</strong> {task.ngo.name}
            </p>
            <p style={{ margin: "0", fontSize: "0.85rem", color: "#888" }}>
              <strong>Date:</strong> {task.date}
            </p>
          </div>
          
          <div style={{ 
            backgroundColor: "#e6f0ff", 
            borderRadius: "12px", 
            padding: "4px 8px",
            textAlign: "center"
          }}>
            <div style={{ fontSize: "0.8rem", color: "#0a47d1" }}>Applications</div>
            <div style={{ fontWeight: "bold", color: "#0a47d1" }}>{applicationCount}</div>
          </div>
        </div>
        
        <button 
          className="btn primary" 
          onClick={onView}
          style={{ 
            marginTop: "16px", 
            width: "100%",
            padding: "10px"
          }}
        >
          View Details
        </button>
      </div>
    </div>
  );
}