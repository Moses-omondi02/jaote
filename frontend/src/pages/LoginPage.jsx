import React, { useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { signup, login } from "../api";

// In-memory storage for demo purposes
const usersStorageKey = "taskboard_users";

const LoginSchema = Yup.object({
  email: Yup.string().email("Invalid email").required("Email is required"),
  password: Yup.string().required("Password is required"),
});

const SignupSchema = Yup.object({
  name: Yup.string().required("Name is required"),
  email: Yup.string().email("Invalid email").required("Email is required"),
  password: Yup.string().min(6, "Password must be at least 6 characters").required("Password is required"),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref('password'), null], "Passwords must match")
    .required("Confirm Password is required"),
  userType: Yup.string().required("Please select a user type"),
});

export default function LoginPage() {
  const [isLogin, setIsLogin] = useState(true);
  const [users, setUsers] = useState(() => {
    const savedUsers = localStorage.getItem(usersStorageKey);
    return savedUsers ? JSON.parse(savedUsers) : [];
  });

  // Save users to localStorage whenever users state changes
  React.useEffect(() => {
    localStorage.setItem(usersStorageKey, JSON.stringify(users));
  }, [users]);

  const handleLogin = async (values, { setSubmitting, setFieldError }) => {
    try {
      // Check if user exists
      const user = users.find(u => u.email === values.email && u.password === values.password);
      
      if (!user) {
        setFieldError("password", "Invalid email or password. Please check your credentials or create an account.");
        setSubmitting(false);
        return;
      }
      
      // Mock successful login
      console.log("LOGIN SUCCESS", user);
      setTimeout(() => {
        setSubmitting(false);
        alert(`Welcome back, ${user.name}! Login successful.`);
        // Refresh page to show new data
        window.location.reload();
      }, 600);
    } catch (error) {
      setFieldError("password", "Login failed. Please try again.");
      setSubmitting(false);
    }
  };

  const handleSignup = async (values, { setSubmitting, resetForm }) => {
    try {
      // Check if user already exists
      const existingUser = users.find(u => u.email === values.email);
      
      if (existingUser) {
        alert("An account with this email already exists. Please login instead.");
        setIsLogin(true);
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
      
      // Mock successful signup
      console.log("SIGNUP SUCCESS", newUser);
      setTimeout(() => {
        setSubmitting(false);
        alert("Account created successfully! You can now login.");
        // Switch to login form
        setIsLogin(true);
        resetForm();
      }, 600);
    } catch (error) {
      alert("Signup failed. Please try again.");
      setSubmitting(false);
    }
  };

  return (
    <div className="page-container">
      <h1>Welcome to Task Board Limited</h1>
      <p className="muted">
        {isLogin ? "Please login to your account" : "Create a new account"}
      </p>
      
      <div className="form-card">
        <div style={{ display: "flex", gap: "10px", marginBottom: "20px" }}>
          <button
            className={isLogin ? "btn primary" : "btn outline"}
            onClick={() => setIsLogin(true)}
          >
            Login
          </button>
          <button
            className={!isLogin ? "btn primary" : "btn outline"}
            onClick={() => setIsLogin(false)}
          >
            Create Account
          </button>
        </div>
        
        {isLogin ? (
          <Formik
            initialValues={{ email: "", password: "" }}
            validationSchema={LoginSchema}
            onSubmit={handleLogin}
          >
            {({ isSubmitting }) => (
              <Form>
                <label>Email</label>
                <Field
                  name="email"
                  type="email"
                  placeholder="you@example.com"
                  style={{
                    width: "100%",
                    padding: "15px 14px",
                    fontSize: "1.12rem",
                    borderRadius: 8,
                    border: "1px solid #e6edf3",
                    marginBottom: 18
                  }}
                />
                <ErrorMessage name="email" component="div" className="error" />
                
                <label>Password</label>
                <Field
                  name="password"
                  type="password"
                  placeholder="Enter your password"
                  style={{
                    width: "100%",
                    padding: "15px 14px",
                    fontSize: "1.12rem",
                    borderRadius: 8,
                    border: "1px solid #e6edf3",
                    marginBottom: 18
                  }}
                />
                <ErrorMessage name="password" component="div" className="error" />
                
                <button
                  className="btn primary"
                  type="submit"
                  disabled={isSubmitting}
                  style={{ marginTop: "10px" }}
                >
                  {isSubmitting ? "Logging in..." : "Login"}
                </button>
              </Form>
            )}
          </Formik>
        ) : (
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
              <Form>
                <label>Name</label>
                <Field
                  name="name"
                  placeholder="Your full name"
                  style={{
                    width: "100%",
                    padding: "15px 14px",
                    fontSize: "1.12rem",
                    borderRadius: 8,
                    border: "1px solid #e6edf3",
                    marginBottom: 18
                  }}
                />
                <ErrorMessage name="name" component="div" className="error" />
                
                <label>Email</label>
                <Field
                  name="email"
                  type="email"
                  placeholder="you@example.com"
                  style={{
                    width: "100%",
                    padding: "15px 14px",
                    fontSize: "1.12rem",
                    borderRadius: 8,
                    border: "1px solid #e6edf3",
                    marginBottom: 18
                  }}
                />
                <ErrorMessage name="email" component="div" className="error" />
                
                <label>Password</label>
                <Field
                  name="password"
                  type="password"
                  placeholder="Enter your password"
                  style={{
                    width: "100%",
                    padding: "15px 14px",
                    fontSize: "1.12rem",
                    borderRadius: 8,
                    border: "1px solid #e6edf3",
                    marginBottom: 18
                  }}
                />
                <ErrorMessage name="password" component="div" className="error" />
                
                <label>Confirm Password</label>
                <Field
                  name="confirmPassword"
                  type="password"
                  placeholder="Confirm your password"
                  style={{
                    width: "100%",
                    padding: "15px 14px",
                    fontSize: "1.12rem",
                    borderRadius: 8,
                    border: "1px solid #e6edf3",
                    marginBottom: 18
                  }}
                />
                <ErrorMessage name="confirmPassword" component="div" className="error" />
                
                <label>User Type</label>
                <div style={{ marginBottom: "18px" }}>
                  <Field
                    name="userType"
                    type="radio"
                    value="volunteer"
                    id="volunteer"
                    style={{ marginRight: "8px" }}
                  />
                  <label htmlFor="volunteer" style={{ marginRight: "20px" }}>
                    Volunteer
                  </label>
                  
                  <Field
                    name="userType"
                    type="radio"
                    value="ngo"
                    id="ngo"
                    style={{ marginRight: "8px" }}
                  />
                  <label htmlFor="ngo">
                    NGO (Asking for Help)
                  </label>
                </div>
                <ErrorMessage name="userType" component="div" className="error" />
                
                <button
                  className="btn primary"
                  type="submit"
                  disabled={isSubmitting}
                  style={{ marginTop: "10px" }}
                >
                  {isSubmitting ? "Creating Account..." : "Create Account"}
                </button>
              </Form>
            )}
          </Formik>
        )}
      </div>
    </div>
  );
}