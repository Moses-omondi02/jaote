import React from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";

const TaskSchema = Yup.object({
  title: Yup.string().required("Title required"),
  description: Yup.string().required("Description required"),
  hours: Yup.number().typeError("Hours must be a number").min(0, "Min 0").required("Hours required"),
  location: Yup.string().required("Location required"),
  date: Yup.string().matches(/^\d{4}-\d{2}-\d{2}$/, "Use YYYY-MM-DD").required("Date required"),
});

export default function Taskform({ onSubmit }) {
  return (
    <Formik
      initialValues={{ title: "", description: "", hours: "", location: "", date: "" }}
      validationSchema={TaskSchema}
      onSubmit={(values, { setSubmitting, resetForm }) => {
        // Call the provided onSubmit prop
        onSubmit(values);
        setTimeout(() => {
          setSubmitting(false);
          resetForm();
        }, 600);
      }}
    >
      {({ isSubmitting }) => (
        <Form className="form-card">
          <label>Title</label>
          <Field name="title" placeholder="Task title" />
          <ErrorMessage name="title" component="div" className="error" />

          <label>Description</label>
          <Field as="textarea" name="description" rows="3" placeholder="Task description" />
          <ErrorMessage name="description" component="div" className="error" />

          <label>Hours</label>
          <Field name="hours" type="number" placeholder="Estimated hours" />
          <ErrorMessage name="hours" component="div" className="error" />

          <label>Location</label>
          <Field name="location" placeholder="Task location" />
          <ErrorMessage name="location" component="div" className="error" />

          <label>Date</label>
          <Field name="date" placeholder="YYYY-MM-DD" />
          <ErrorMessage name="date" component="div" className="error" />

          <button className="btn primary" type="submit" disabled={isSubmitting}>
            {isSubmitting ? "Submitting..." : "Submit Task"}
          </button>
        </Form>
      )}
    </Formik>
  );
}
