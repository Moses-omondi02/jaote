import React, { useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { signup as apiSignup, login as apiLogin } from "../api";

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
});

export default function LoginPage({ setCurrentUser }) {
  const [isLogin, setIsLogin] = useState(true);
  const [adminPasscode, setAdminPasscode] = useState("");
  const [showAdminLogin, setShowAdminLogin] = useState(false);

  const handleLogin = async (values, { setSubmitting, setFieldError }) => {
    try {
      const response = await apiLogin(values.email, values.password);
      setSubmitting(false);
      setCurrentUser(response.user);
      localStorage.setItem("currentUser", JSON.stringify(response.user));
      alert(`Welcome back, ${response.user.name}! Login successful.`);
    } catch (error) {
      setFieldError("password", "Invalid email or password.");
      setSubmitting(false);
    }
  };

  const handleSignup = async (values, { setSubmitting, resetForm }) => {
    try {
      await apiSignup(values);
      setSubmitting(false);
      alert("Account created successfully! You can now login.");
      setIsLogin(true);
      resetForm();
    } catch (error) {
      setSubmitting(false);
      alert("Signup failed. Email may already exist.");
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
                <button
                  className="btn outline"
                  type="button"
                  onClick={() => setShowAdminLogin(true)}
                  style={{ marginTop: "10px", marginLeft: "10px" }}
                >
                  Login as Admin
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
              confirmPassword: ""
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

      {showAdminLogin && (
        <div style={{
          position: "fixed",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          backgroundColor: "rgba(0,0,0,0.5)",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          zIndex: 1000
        }}>
          <div style={{
            backgroundColor: "white",
            padding: "20px",
            borderRadius: "8px",
            maxWidth: "400px",
            width: "100%"
          }}>
            <h2>Admin Login</h2>
            <p>Enter the admin passcode:</p>
            <input
              type="password"
              value={adminPasscode}
              onChange={(e) => setAdminPasscode(e.target.value)}
              placeholder="Enter passcode"
              style={{ width: "100%", padding: "10px", marginBottom: "10px" }}
            />
            <button
              className="btn primary"
              onClick={() => {
                const storedPasscode = localStorage.getItem("adminPasscode") || "3456";
                if (adminPasscode === storedPasscode) {
                  // Login as admin
                  setCurrentUser({ id: 999, name: "Admin", email: "admin@taskboard.com", is_admin: true });
                  localStorage.setItem("currentUser", JSON.stringify({ id: 999, name: "Admin", email: "admin@taskboard.com", is_admin: true }));
                  setShowAdminLogin(false);
                  alert("Logged in as Admin!");
                } else {
                  alert("Incorrect passcode.");
                }
              }}
              style={{ width: "100%" }}
            >
              Login
            </button>
            <button
              className="btn outline"
              onClick={() => setShowAdminLogin(false)}
              style={{ width: "100%", marginTop: "10px" }}
            >
              Cancel
            </button>
          </div>
        </div>
      )}
    </div>
  );
}