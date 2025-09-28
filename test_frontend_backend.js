// Test script to verify frontend can communicate with backend
async function testFrontendBackend() {
  try {
    console.log("Testing frontend to backend connection...");
    
    // Test GET request to fetch tasks
    const getResponse = await fetch('http://127.0.0.1:5000/api/tasks');
    const tasks = await getResponse.json();
    console.log(`Successfully fetched ${tasks.length} tasks`);
    
    // Test POST request to add a new task
    const newTask = {
      title: "Frontend Test Task",
      description: "This task was created from a frontend test",
      hours: 3,
      location: "Test Location",
      category: "testing"
    };
    
    const postResponse = await fetch('http://127.0.0.1:5000/api/tasks', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(newTask),
    });
    
    const createdTask = await postResponse.json();
    console.log(`Successfully created task with ID: ${createdTask.id}`);
    
    console.log("Frontend to backend connection test PASSED!");
  } catch (error) {
    console.error("Frontend to backend connection test FAILED:", error);
  }
}

// Run the test
testFrontendBackend();