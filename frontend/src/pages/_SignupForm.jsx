import React from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";

const SignupSchema = Yup.object({
  name: Yup.string().required("Name is required"),
  email: Yup.string().email("Invalid email").required("Email is required"),
  message: Yup.string().max(300, "Max 300 characters"),
});

export default function SignupForm({ taskId = null, onDone = () => {} }) {
  return (
    <Formik
      initialValues={{ name: "", email: "", message: "" }}
      validationSchema={SignupSchema}
      onSubmit={(values, { setSubmitting, resetForm }) => {
        // mock submission (replace with fetch POST later)
        console.log("SIGNUP (mock)", { taskId, ...values });
        setTimeout(() => {
          setSubmitting(false);
          resetForm();
          onDone();
          alert("Signup submitted (mock)");
        }, 600);
      }}
    >
      {({ isSubmitting }) => (
        <Form className="form-card">
          <label>Name</label>
          <Field name="name" placeholder="Your full name" />
          <ErrorMessage name="name" component="div" className="error" />

          <label>Email</label>
          <Field name="email" placeholder="you@example.com" />
          <ErrorMessage name="email" component="div" className="error" />

          <label>Short message (optional)</label>
          <Field as="textarea" name="message" rows="3" placeholder="Why are you interested?" />
          <ErrorMessage name="message" component="div" className="error" />

          <div style={{ marginTop: 10 }}>
            <button className="btn primary" type="submit" disabled={isSubmitting}>
              {isSubmitting ? "Signing..." : "Sign Up"}
            </button>
          </div>
        </Form>
      )}
    </Formik>
  );
}
