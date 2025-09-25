const BASE_URL = "http://localhost:5000"; // replace with your partner's backend URL

export async function getTasks() {
  const res = await fetch(`${BASE_URL}/tasks`);
  if (!res.ok) {
    throw new Error("Failed to fetch tasks");
  }
  return res.json();
}

export async function addTask(task) {
  const res = await fetch(`${BASE_URL}/tasks`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(task),
  });
  return res.json();
}

// Authentication functions
export async function login(email, password) {
  const res = await fetch(`${BASE_URL}/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, password }),
  });
  
  if (!res.ok) {
    throw new Error("Login failed");
  }
  
  return res.json();
}

export async function signup(userData) {
  const res = await fetch(`${BASE_URL}/signup`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(userData),
  });
  
  if (!res.ok) {
    throw new Error("Signup failed");
  }
  
  return res.json();
}

// Admin functions
export async function getAdminData() {
  const res = await fetch(`${BASE_URL}/admin/data`);
  if (!res.ok) {
    throw new Error("Failed to fetch admin data");
  }
  return res.json();
}

export async function getUsers() {
  const res = await fetch(`${BASE_URL}/admin/users`);
  if (!res.ok) {
    throw new Error("Failed to fetch users");
  }
  return res.json();
}

export async function getSignups() {
  const res = await fetch(`${BASE_URL}/admin/signups`);
  if (!res.ok) {
    throw new Error("Failed to fetch signups");
  }
  return res.json();
}
