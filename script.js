// Task Manager Logic

// DOM Elements
// Sidebar Navigation
const menuItems = document.querySelectorAll(".menu-item");

menuItems.forEach(item => {
  item.addEventListener("click", () => {
    // Remove active class from all items
    menuItems.forEach(menu => menu.classList.remove("active"));

    // Add active class to clicked item
    item.classList.add("active");

    // Switch to the appropriate section (for demo purposes)
    const section = item.getAttribute("data-section");
    if (section === "completed") {
      alert("Switching to Completed Tasks...");
    } else if (section === "favorites") {
      alert("Switching to Favorites...");
    } else if (section === "stats") {
      alert("Switching to Stats...");
    } else {
      alert("Switching to All Tasks...");
    }
  });
});
