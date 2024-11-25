document.addEventListener('DOMContentLoaded', () => {
  const taskList = document.getElementById('task-list');
  const addTaskButton = document.getElementById('add-task-btn');
  const taskModal = document.getElementById('task-modal');
  const closeModal = document.getElementById('close-modal');
  const taskForm = document.getElementById('task-form');
  const navLinks = document.querySelectorAll('.left-sidebar ul li a');
  const completionPopup = document.getElementById('completion-popup');
  const closePopupButton = document.getElementById('close-popup');

  let tasks = [];

  // Open the modal
  addTaskButton.addEventListener('click', () => {
    taskModal.style.display = 'block';
  });

  // Close the modal
  closeModal.addEventListener('click', () => {
    taskModal.style.display = 'none';
  });

  // Submit the new task
  taskForm.addEventListener('submit', (e) => {
    e.preventDefault();

    const title = document.getElementById('task-name').value;
    const description = document.getElementById('task-desc').value;
    const priority = document.querySelector('input[name="priority"]:checked').value;
    const deadline = document.getElementById('task-deadline').value;

    tasks.push({
      id: tasks.length + 1,
      title,
      description,
      priority,
      deadline,
      status: "pending",
    });

    taskModal.style.display = 'none';
    taskForm.reset();
    renderTasks();
    updateSidebar();
    updateTaskChart(); // Ensure the chart is updated after adding a task
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
          <span class="priority ${task.priority}">${task.priority}</span>
          <button class="delete-task">🗑️</button>
        </div>
      `;

      taskDiv.querySelector('.task-status').addEventListener('change', () => {
        task.status = taskDiv.querySelector('.task-status').checked ? "completed" : "pending";
        renderTasks(filter);
        updateSidebar();

        // Show completion popup
        if (task.status === "completed") {
          completionPopup.style.display = 'block';
        }

        updateTaskChart(); // Ensure the chart is updated after changing status
      });

      taskDiv.querySelector('.delete-task').addEventListener('click', () => {
        tasks = tasks.filter(t => t.id !== task.id);
        renderTasks(filter);
        updateSidebar();
        updateTaskChart(); // Ensure the chart is updated after deleting a task
      });

      taskList.appendChild(taskDiv);
    });

    // Hide "Add Task" button for completed tasks
    if (filter === "completed" || filter == "pending") {
      addTaskButton.style.display = "none";
    } else {
      addTaskButton.style.display = "block";
    }
  }

  // Close completion popup
  closePopupButton.addEventListener('click', () => {
    completionPopup.style.display = 'none';
  });

  // Update sidebar counts
  function updateSidebar() {
    const completedCount = tasks.filter(task => task.status === "completed").length;
    const pendingCount = tasks.filter(task => task.status === "pending").length;

    document.querySelector('[data-filter="completed"]').innerText = `Completed Tasks (${completedCount})`;
    document.querySelector('[data-filter="pending"]').innerText = `Pending Tasks (${pendingCount})`;
  }

  // Sidebar filtering
  navLinks.forEach(link => {
    link.addEventListener('click', (e) => {
      e.preventDefault();
      const filter = link.getAttribute('data-filter');
      renderTasks(filter);
    });
  });

  renderTasks();
});

function createDoughnutChart(completedTasks, pendingTasks) {
  const ctx = document.getElementById('task-chart').getContext('2d');

  console.log("Completed Tasks:", completedTasks, "Pending Tasks:", pendingTasks);

  // Log the values for debugging
  console.log("Completed Tasks:", completedTasks, "Pending Tasks:", pendingTasks);

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

function updateTaskChart() {
  
  const completedTasks = tasks.filter(task => task.status === "completed").length;
  const pendingTasks = tasks.filter(task => task.status === "pending").length;
  // Call the function to update the chart
  console.log("Updating chart: Completed:", completedTasks, "Pending:", pendingTasks);
  createDoughnutChart(completedTasks, pendingTasks);
}
