document.getElementById("login-form").addEventListener("submit", async (e) => {
  e.preventDefault();

  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;

  try {
    const response = await fetch("/api/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({email, password }),
    });
  
    const data = await response.json();
    
    if (response.ok) {
      alert("Sign-in successful!");
      localStorage.setItem("authToken", data.token); // Save JWT token
      localStorage.setItem("username", data.username);  // save username
      window.location.href = "../complete.html"; // Redirect to dashboard
    } else {
      alert(`Error: ${data.error}`);
    }
  } catch (error) {
    console.error("Login failed:", error);
    alert("An error occurred. Please try again.");
  }
});
