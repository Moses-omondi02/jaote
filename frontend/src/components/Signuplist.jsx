import React, { useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";

const SignupSchema = Yup.object({
  name: Yup.string().required("Name is required"),
  email: Yup.string().email("Invalid email").required("Email is required"),
  password: Yup.string().min(6, "Password must be at least 6 characters").required("Password is required"),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref('password'), null], "Passwords must match")
    .required("Confirm Password is required"),
  userType: Yup.string().required("Please select a user type"),
});

const usersStorageKey = "taskboard_users";

export default function Signuplist({ onSignup }) {
  const [users, setUsers] = useState(() => {
    const savedUsers = localStorage.getItem(usersStorageKey);
    return savedUsers ? JSON.parse(savedUsers) : [];
  });

  // Save users to localStorage whenever users state changes
  React.useEffect(() => {
    localStorage.setItem(usersStorageKey, JSON.stringify(users));
  }, [users]);

  const handleSignup = async (values, { setSubmitting, resetForm }) => {
    try {
      // Check if user already exists
      const existingUser = users.find(u => u.email === values.email);

      if (existingUser) {
        alert("An account with this email already exists.");
        setSubmitting(false);
        return;
      }

      // Create new user
      const newUser = {
        id: users.length + 1,
        name: values.name,
        email: values.email,
        password: values.password,
        userType: values.userType,
        createdAt: new Date().toISOString().split('T')[0]
      };

      // Update users state
      const updatedUsers = [...users, newUser];
      setUsers(updatedUsers);

      // Call onSignup prop if provided
      if (onSignup) onSignup(newUser);

      // Mock successful signup
      console.log("SIGNUP SUCCESS", newUser);
      setTimeout(() => {
        setSubmitting(false);
        resetForm();
        alert("Account created successfully!");
      }, 600);
    } catch (error) {
      alert("Signup failed. Please try again.");
      setSubmitting(false);
    }
  };

  return (
    <div>
      <h2>Sign Up for Tasks</h2>
      <Formik
        initialValues={{
          name: "",
          email: "",
          password: "",
          confirmPassword: "",
          userType: ""
        }}
        validationSchema={SignupSchema}
        onSubmit={handleSignup}
      >
        {({ isSubmitting }) => (
          <Form className="form-card">
            <label>Name</label>
            <Field name="name" placeholder="Your full name" />
            <ErrorMessage name="name" component="div" className="error" />

            <label>Email</label>
            <Field name="email" type="email" placeholder="you@example.com" />
            <ErrorMessage name="email" component="div" className="error" />

            <label>Password</label>
            <Field name="password" type="password" placeholder="Enter your password" />
            <ErrorMessage name="password" component="div" className="error" />

            <label>Confirm Password</label>
            <Field name="confirmPassword" type="password" placeholder="Confirm your password" />
            <ErrorMessage name="confirmPassword" component="div" className="error" />

            <label>User Type</label>
            <div>
              <Field name="userType" type="radio" value="volunteer" id="volunteer" />
              <label htmlFor="volunteer">Volunteer</label>

              <Field name="userType" type="radio" value="ngo" id="ngo" />
              <label htmlFor="ngo">NGO (Asking for Help)</label>
            </div>
            <ErrorMessage name="userType" component="div" className="error" />

            <button className="btn primary" type="submit" disabled={isSubmitting}>
              {isSubmitting ? "Creating Account..." : "Sign Up"}
            </button>
          </Form>
        )}
      </Formik>
    </div>
  );
}
