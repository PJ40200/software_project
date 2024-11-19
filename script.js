document.addEventListener("DOMContentLoaded", () => {
    const newTaskBtn = document.querySelector(".new-task-btn");
    const taskList = document.querySelector(".task-list");
    const sidebarItems = document.querySelectorAll(".menu-item");
    const mainContent = document.querySelector(".main-content");

    let tasks = [
        { label: "Testing updates", deadline: "Yesterday", priority: "Medium", status: "Pending" },
    ];

    // Function to render tasks
    function renderTasks() {
        const completedTasks = tasks.filter(task => task.status === "Completed");
        const pendingTasks = tasks.filter(task => task.status === "Pending");

        taskList.innerHTML = `
            <h2>Pending Tasks</h2>
            ${pendingTasks
                .map(task => taskTemplate(task))
                .join("") || `<p>No pending tasks</p>`}
            <h2>Completed Tasks</h2>
            ${completedTasks
                .map(task => taskTemplate(task))
                .join("") || `<p>No completed tasks</p>`}
            <div class="add-task">Add New Task</div>
        `;

        // Add event listeners to buttons
        document.querySelectorAll(".mark-complete").forEach(button => {
            button.addEventListener("click", markTaskComplete);
        });

        document.querySelectorAll(".delete-task").forEach(button => {
            button.addEventListener("click", deleteTask);
        });
    }

    // Task template
    function taskTemplate(task) {
        return `
            <div class="task-card">
                <div class="task-status ${task.status.toLowerCase()}">${task.status}</div>
                <div class="task-details">
                    <h3>${task.label}</h3>
                    <p>Deadline: ${task.deadline}</p>
                    <div class="task-meta">
                        <span>Priority: ${task.priority}</span>
                    </div>
                </div>
                <div class="task-actions">
                    <button class="mark-complete" data-label="${task.label}">✅</button>
                    <button class="delete-task" data-label="${task.label}">🗑</button>
                </div>
            </div>
        `;
    }

    // Add new task functionality
    newTaskBtn.addEventListener("click", () => {
        const taskLabel = prompt("Enter task label:");
        const taskDeadline = prompt("Enter task deadline:");
        const taskPriority = prompt("Enter task priority (Low, Medium, High):");

        if (taskLabel && taskDeadline && taskPriority) {
            tasks.push({
                label: taskLabel,
                deadline: taskDeadline,
                priority: taskPriority,
                status: "Pending",
            });
            renderTasks();
        } else {
            alert("All fields are required!");
        }
    });

    // Mark task as complete
    function markTaskComplete(event) {
        const label = event.target.dataset.label;
        tasks = tasks.map(task =>
            task.label === label ? { ...task, status: "Completed" } : task
        );
        renderTasks();
    }

    // Delete task
    function deleteTask(event) {
        const label = event.target.dataset.label;
        tasks = tasks.filter(task => task.label !== label);
        renderTasks();
    }

    // Sidebar navigation functionality
    sidebarItems.forEach(item => {
        item.addEventListener("click", () => {
            const selectedMenu = item.textContent.trim();
            mainContent.innerHTML = "";

            switch (selectedMenu) {
                case "Tasks":
                    mainContent.innerHTML = `
                        <div class="task-section">
                            <div class="task-list"></div>
                        </div>
                    `;
                    renderTasks();
                    break;

                case "Analytics":
                    const completedTasks = tasks.filter(task => task.status === "Completed");
                    const pendingTasks = tasks.filter(task => task.status === "Pending");
                    const completionRate =
                        (completedTasks.length / tasks.length) * 100 || 0;

                    mainContent.innerHTML = `
                        <div class="analytics-section">
                            <h2>Analytics</h2>
                            <p>Total Tasks: ${tasks.length}</p>
                            <p>Pending Tasks: ${pendingTasks.length}</p>
                            <p>Completed Tasks: ${completedTasks.length}</p>
                            <p>Completion Rate: ${completionRate.toFixed(2)}%</p>
                        </div>
                    `;
                    break;

                case "Settings":
                    mainContent.innerHTML = `
                        <div class="settings-section">
                            <h2>Settings</h2>
                            <label>
                                Username: 
                                <input type="text" value="William Slater" id="username">
                            </label>
                            <label>
                                Theme: 
                                <select id="theme-select">
                                    <option value="light">Light</option>
                                    <option value="dark">Dark</option>
                                </select>
                            </label>
                            <button id="logout-btn">Logout</button>
                        </div>
                    `;

                    document.getElementById("theme-select").addEventListener("change", event => {
                        document.body.className = event.target.value;
                    });

                    document.getElementById("logout-btn").addEventListener("click", () => {
                        alert("Logging out...");
                    });
                    break;

                default:
                    break;
            }
        });
    });

    // Initial rendering
    renderTasks();
});
