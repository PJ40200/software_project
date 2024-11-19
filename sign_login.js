function showSignup() {
    document.getElementById("login").classList.add("hidden");
    document.getElementById("signup").classList.remove("hidden");
  }
  
  function showLogin() {
    document.getElementById("signup").classList.add("hidden");
    document.getElementById("login").classList.remove("hidden");
  }
  
  function login() {
    const email = document.getElementById("loginEmail").value;
    const password = document.getElementById("loginPassword").value;
  
    if (email && password) {
      alert(`Logged in successfully as ${email}!`);
    } else {
      alert("Please fill out all fields!");
    }
  }

  function signup() {
    const email = document.getElementById("signupEmail").value;
    const password = document.getElementById("signupPassword").value;
  
    if (email && password) {
      alert(`Signup successful for ${email}!`);
      showLogin(); 
    } else {
      alert("Please fill out all fields!");
    }
  }
  