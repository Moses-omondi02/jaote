import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { addTask } from "../api";

const schema = Yup.object({
  title: Yup.string().required("Title required"),
  description: Yup.string().required("Description required"),
  hours: Yup.number().typeError("Hours must be a number").min(0, "Min 0").required("Hours required"),
  location: Yup.string().required("Location required"),
  date: Yup.string().matches(/^\d{4}-\d{2}-\d{2}$/, "Use YYYY-MM-DD").required("Date required"),
});

export default function AddTaskPage({ currentUser }) {
  if (!currentUser) {
    return <div>Please log in to post tasks.</div>;
  }
  const navigate = useNavigate();

  useEffect(() => {
    if (!currentUser) {
      navigate('/login');
    }
  }, [currentUser, navigate]);

  if (!currentUser) {
    return <div>Please log in to post tasks.</div>;
  }

  return (
    <div className="page-container">
      <h1 style={{ marginBottom: "10px", color: "#0a47d1", fontSize: "2.1rem" }}>Post a New Task</h1>
      <p className="muted" style={{ marginBottom: "28px", fontSize: "1.15rem" }}>
        Fill in the details below to create a new volunteer task.
      </p>
      <Formik
        initialValues={{ title: "", description: "", hours: "", location: "", date: "" }}
        validationSchema={schema}
        onSubmit={async (values, { setSubmitting, resetForm }) => {
          try {
            await addTask({ ...values, user_id: currentUser.id });
            setSubmitting(false);
            resetForm();
            alert("Task posted successfully!");
          } catch (error) {
            setSubmitting(false);
            alert("Failed to post task. Please try again.");
          }
        }}
      >
        {({ isSubmitting }) => (
          <Form
            className="form-card"
            style={{
              maxWidth: 520,
              margin: "0 auto",
              fontSize: "1.13rem",
              padding: "28px 28px 22px 28px",
              boxShadow: "0 6px 24px rgba(10,10,20,0.09)",
              gap: "18px"
            }}
          >
            <div style={{ marginBottom: 18 }}>
              <label htmlFor="title" style={{ fontWeight: 600, marginBottom: 6, display: "block" }}>Task Title</label>
              <Field
                id="title"
                name="title"
                placeholder="e.g. Organize Supplies"
                style={{
                  width: "100%",
                  padding: "13px 12px",
                  fontSize: "1.08rem",
                  borderRadius: 8,
                  border: "1px solid #e6edf3",
                  marginBottom: 4
                }}
              />
              <ErrorMessage name="title" component="div" className="error" />
            </div>

            <div style={{ marginBottom: 18 }}>
              <label htmlFor="description" style={{ fontWeight: 600, marginBottom: 6, display: "block" }}>Description</label>
              <Field
                as="textarea"
                id="description"
                name="description"
                placeholder="Describe the task..."
                rows={4}
                style={{
                  width: "100%",
                  padding: "13px 12px",
                  fontSize: "1.08rem",
                  borderRadius: 8,
                  border: "1px solid #e6edf3",
                  marginBottom: 4,
                  resize: "vertical"
                }}
              />
              <ErrorMessage name="description" component="div" className="error" />
            </div>

            <div style={{ marginBottom: 18 }}>
              <label htmlFor="hours" style={{ fontWeight: 600, marginBottom: 6, display: "block" }}>Estimated Hours</label>
              <Field
                id="hours"
                name="hours"
                type="number"
                placeholder="e.g. 3"
                style={{
                  width: "100%",
                  padding: "13px 12px",
                  fontSize: "1.08rem",
                  borderRadius: 8,
                  border: "1px solid #e6edf3",
                  marginBottom: 4
                }}
              />
              <ErrorMessage name="hours" component="div" className="error" />
            </div>

            <div style={{ marginBottom: 18 }}>
              <label htmlFor="location" style={{ fontWeight: 600, marginBottom: 6, display: "block" }}>Location</label>
              <Field
                id="location"
                name="location"
                placeholder="e.g. Community Hall"
                style={{
                  width: "100%",
                  padding: "13px 12px",
                  fontSize: "1.08rem",
                  borderRadius: 8,
                  border: "1px solid #e6edf3",
                  marginBottom: 4
                }}
              />
              <ErrorMessage name="location" component="div" className="error" />
            </div>

            <div style={{ marginBottom: 18 }}>
              <label htmlFor="date" style={{ fontWeight: 600, marginBottom: 6, display: "block" }}>Due Date</label>
              <Field
                id="date"
                name="date"
                placeholder="2025-10-01"
                style={{
                  width: "100%",
                  padding: "13px 12px",
                  fontSize: "1.08rem",
                  borderRadius: 8,
                  border: "1px solid #e6edf3",
                  marginBottom: 4
                }}
              />
              <ErrorMessage name="date" component="div" className="error" />
            </div>

            <button
              className="btn primary"
              type="submit"
              disabled={isSubmitting}
              style={{
                marginTop: 10,
                fontSize: "1.13rem",
                width: "100%",
                padding: "13px 0",
                fontWeight: 700,
                letterSpacing: 0.5
              }}
            >
              {isSubmitting ? "Posting..." : "Post Task"}
            </button>
          </Form>
        )}
      </Formik>
    </div>
  );
}
