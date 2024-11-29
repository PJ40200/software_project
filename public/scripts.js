let tasks = [];

document.addEventListener('DOMContentLoaded', async () => {
  const taskList = document.getElementById('task-list');
  const addTaskButton = document.getElementById('add-task-btn');
  const taskModal = document.getElementById('task-modal');
  const closeModal = document.getElementById('close-modal');
  const taskForm = document.getElementById('task-form');
  const navLinks = document.querySelectorAll('.left-sidebar ul li a');
  const completionPopup = document.getElementById('completion-popup');
  const closePopupButton = document.getElementById('close-popup');

  // Add username to the page
  const username = localStorage.getItem("username");

  // Check if username exists and update the DOM
  if (username) {
    document.getElementById("user-name").textContent = username;
  } else {
    console.error("No username found in local storage.");
    document.getElementById("user-name").textContent = "Guest";
  }

  // Fetch tasks from the API
  const token = localStorage.getItem("authToken");

  try {
    const response = await fetch("/api/tasks", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (response.ok) {
      const fetchedTasks = await response.json();
      tasks = fetchedTasks; // Load tasks into local array
      renderTasks();
      updateSidebar();
      updateTaskChart();
    } else {
      console.error("Error fetching tasks:", await response.json());
    }
  } catch (error) {
    console.error("Error:", error);
  }

  // Open the modal
  addTaskButton.addEventListener('click', () => {
    taskModal.style.display = 'block';
  });

  // Close the modal
  closeModal.addEventListener('click', () => {
    taskModal.style.display = 'none';
  });

  // Submit the new task
  taskForm.addEventListener('submit', async (e) => {
    e.preventDefault();

    const title = document.getElementById('task-name').value;
    const description = document.getElementById('task-desc').value;
    const priority = document.querySelector('input[name="priority"]:checked').value;
    const deadline = document.getElementById('task-deadline').value;

    // Create task object
    const newTask = {
      title,
      description,
      priority,
      deadline,
      status: "pending",
    };
    console.log(newTask);
    // Add task to the local array and update the DOM
    tasks.push(newTask);
    taskModal.style.display = 'none';
    taskForm.reset();
    renderTasks();
    updateSidebar();
    updateTaskChart(); // Ensure the chart is updated after adding a task

    // Send the new task to the server
    const token = localStorage.getItem("authenticateToken");
    // console.log(authToken);
    try {
      const response = await fetch("/api/tasks", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          title,
          description,
          priority,
          deadline,
          status: "pending",
        }),
      });

      if (!response.ok) {
        console.error("Error adding task:", await response.json());
        alert("Failed to add task.");
      }
      else{
        console.log("Task added successfully");
      }
    } catch (error) {
      console.error("Error:", error.message);
      alert("An error occurred while adding the task that u have added.");
    }
  });

  // Render tasks based on filter
  function renderTasks(filter = "all") {
    taskList.innerHTML = "";

    const filteredTasks = tasks.filter(task => filter === "all" || task.status === filter);

    filteredTasks.forEach(task => {
      const taskDiv = document.createElement('div');
      taskDiv.classList.add('task');
      taskDiv.setAttribute('data-id', task.id);
      taskDiv.innerHTML = `
        <input type="checkbox" ${task.status === "completed" ? "checked" : ""} class="task-status">
        <p><strong>${task.title}</strong></p>
        <p>${task.description}</p>
        <p><small>Deadline: ${task.deadline}</small></p>
        <div class="task-meta">
          <span class="priority ${task.priority}" style="background-color : #dfdd65">${task.priority}</span>
          <button class="delete-task">🗑️</button>
        </div>
      `;

      taskDiv.querySelector('.task-status').addEventListener('change', () => {
        task.status = taskDiv.querySelector('.task-status').checked ? "completed" : "pending";
        renderTasks(filter);
        updateSidebar(); // Update the task summary
        updateTaskChart(); // Ensure the chart is updated after changing status

        // Show completion popup
        if (task.status === "completed") {
          completionPopup.style.display = 'block';
        }

        // Send the updated task status to the server
        const token = localStorage.getItem("authToken");

        fetch(`/api/tasks/${task.id}`, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({ status: task.status }),
        })
        .then(response => {
          if (!response.ok) {
            console.error("Error updating task status:", response);
          }
        })
        .catch(error => console.error("Error:", error));
      });

      taskDiv.querySelector('.delete-task').addEventListener('click', () => {
        tasks = tasks.filter(t => t.id !== task.id);
        renderTasks(filter);
        updateSidebar(); // Update the task summary
        updateTaskChart(); // Ensure the chart is updated after deleting a task

        // Send delete request to the server
        const token = localStorage.getItem("authToken");

        fetch(`/api/tasks/${task.id}`, {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        .then(response => {
          if (!response.ok) {
            console.error("Error deleting task:", response);
          }
        })
        .catch(error => console.error("Error:", error));
      });

      taskList.appendChild(taskDiv);
    });

    // Hide "Add Task" button for completed tasks
    if (filter === "completed" || filter === "pending") {
      addTaskButton.style.display = "none";
    } else {
      addTaskButton.style.display = "block";
    }
  }

  // Close completion popup
  closePopupButton.addEventListener('click', () => {
    completionPopup.style.display = 'none';
  });

  // Update sidebar counts and task summary
  function updateSidebar() {
    const completedCount = tasks.filter(task => task.status === "completed").length;
    const totalTasks = tasks.length;

    // Update the sidebar filter counts
    document.querySelector('[data-filter="completed"]').innerText = `Completed Tasks (${completedCount})`;
    document.querySelector('[data-filter="pending"]').innerText = `Pending Tasks (${totalTasks - completedCount})`;

    // Update the task summary in the right sidebar
    document.getElementById('total-tasks').innerText = totalTasks;
    document.getElementById('completed-tasks').innerText = completedCount;
  }

  // Sidebar filtering
  navLinks.forEach(link => {
    link.addEventListener('click', (e) => {
      e.preventDefault();
      const filter = link.getAttribute('data-filter');
      renderTasks(filter);
    });
  });

  // Create a doughnut chart
  function createDoughnutChart(completedTasks, pendingTasks) {
    const ctx = document.getElementById('task-chart').getContext('2d');

    // Destroy the chart if it already exists to prevent multiple charts
    if (window.taskChart) {
      window.taskChart.destroy();
    }

    // Create a new doughnut chart
    window.taskChart = new Chart(ctx, {
      type: 'doughnut',
      data: {
        labels: ['Completed Tasks', 'Pending Tasks'],
        datasets: [{
          label: 'Task Distribution',
          data: [completedTasks, pendingTasks],
          backgroundColor: [
            '#4CAF50', // Green for completed tasks
            '#FF5722', // Orange for pending tasks
          ],
          borderColor: [
            '#388E3C', // Dark green
            '#E64A19', // Dark orange
          ],
          borderWidth: 1,
        }],
      },
      options: {
        responsive: true,
        plugins: {
          legend: {
            position: 'bottom',
          },
        },
      },
    });
  }

  // Update task chart
  function updateTaskChart() {
    const completedTasks = tasks.filter(task => task.status === "completed").length;
    const pendingTasks = tasks.filter(task => task.status === "pending").length;
    createDoughnutChart(completedTasks, pendingTasks);
  }

  renderTasks();
});
