// src/pages/SignupsPage.jsx
import React from "react";
import SignupForm from "./_SignupForm";

export default function SignupsPage() {
  return (
    <div className="page-container">
      <h1 style={{ marginBottom: "10px", color: "#0a47d1", fontSize: "2.1rem" }}>
        Volunteer Sign Ups
      </h1>
      <p className="muted" style={{ marginBottom: "24px", fontSize: "1.15rem" }}>
        Enter your details and the task ID you want to sign up for.
      </p>
      <div
        className="form-card"
        style={{
          maxWidth: 520,
          margin: "0 auto",
          fontSize: "1.15rem",
          padding: "32px 32px 26px 32px",
          boxShadow: "0 6px 24px rgba(10,10,20,0.09)",
          display: "flex",
          flexDirection: "column",
          gap: "26px"
        }}
      >
        <SignupForm
          taskId={null}
          onDone={() => {
            /* optional callback */
          }}
          inputStyle={{
            width: "100%",
            padding: "15px 14px",
            fontSize: "1.12rem",
            borderRadius: 8,
            border: "1px solid #e6edf3",
            marginBottom: 18
          }}
          labelStyle={{
            fontWeight: 600,
            marginBottom: 8,
            display: "block",
            fontSize: "1.12rem"
          }}
        />
      </div>
    </div>
  );
}
