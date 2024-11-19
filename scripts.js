// Task Manager Functionality
document.addEventListener('DOMContentLoaded', () => {
    const taskList = document.getElementById('completed-tasks');
    const addTaskButton = document.getElementById('add-task-btn');
  
    // Add New Task
    addTaskButton.addEventListener('click', () => {
      const newTask = document.createElement('div');
      newTask.classList.add('task');
      newTask.innerHTML = `
        <p><strong>New Task</strong></p>
        <p>Description of the task goes here.</p>
        <div class="task-meta">
          <span class="priority medium">medium</span>
          <button class="edit-task">✏️</button>
          <button class="delete-task">🗑️</button>
        </div>
      `;
      taskList.appendChild(newTask);
    });
  
    // Edit and Delete Task
    taskList.addEventListener('click', (event) => {
      if (event.target.classList.contains('delete-task')) {
        const task = event.target.closest('.task');
        task.remove();
      } else if (event.target.classList.contains('edit-task')) {
        const task = event.target.closest('.task');
        const taskTitle = task.querySelector('p strong');
        const taskDescription = task.querySelector('p:nth-child(2)');
  
        // Prompt user to edit title and description
        const newTitle = prompt('Edit Task Title:', taskTitle.textContent);
        const newDescription = prompt('Edit Task Description:', taskDescription.textContent);
  
        if (newTitle) taskTitle.textContent = newTitle;
        if (newDescription) taskDescription.textContent = newDescription;
      }
    });
  });

  