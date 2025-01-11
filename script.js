// DOM elements
const taskInput = document.getElementById('task-input');
const addTaskBtn = document.getElementById('add-task-btn');
const taskList = document.getElementById('task-list');

// Load tasks from localStorage
document.addEventListener('DOMContentLoaded', loadTasks);

addTaskBtn.addEventListener('click', addTask);
taskInput.addEventListener('keypress', function (e) {
    if (e.key === 'Enter') {
        addTask();
    }
});

function addTask() {
    const taskText = taskInput.value.trim();

    if (taskText === '') {
        alert('Please enter a task.');
        return;
    }

    // Create new task element
    const li = document.createElement('li');

    // Add task text
    li.innerHTML = `
        <span class="task-text">${taskText}</span>
        <button class="delete-btn">Delete</button>
    `;

    // Add event listeners
    const deleteBtn = li.querySelector('.delete-btn');
    deleteBtn.addEventListener('click', deleteTask);

    const taskTextSpan = li.querySelector('.task-text');
    taskTextSpan.addEventListener('click', toggleTaskCompletion);

    // Append the new task to the list
    taskList.appendChild(li);

    // Save tasks to localStorage
    saveTasks();

    // Clear the input field
    taskInput.value = '';
}

// Toggle task completion (checked/unchecked)
function toggleTaskCompletion(e) {
    const taskItem = e.target.closest('li');
    taskItem.classList.toggle('completed');
    saveTasks();
}

// Delete a task
function deleteTask(e) {
    const taskItem = e.target.closest('li');
    taskItem.remove();
    saveTasks();
}

// Save tasks to localStorage
function saveTasks() {
    const tasks = [];
    const taskItems = taskList.querySelectorAll('li');

    taskItems.forEach(item => {
        const taskText = item.querySelector('.task-text').textContent;
        const isCompleted = item.classList.contains('completed');
        tasks.push({ taskText, isCompleted });
    });

    localStorage.setItem('tasks', JSON.stringify(tasks));
}

// Load tasks from localStorage
function loadTasks() {
    const savedTasks = JSON.parse(localStorage.getItem('tasks')) || [];

    savedTasks.forEach(task => {
        const li = document.createElement('li');
        li.innerHTML = `
            <span class="task-text">${task.taskText}</span>
            <button class="delete-btn">Delete</button>
        `;

        if (task.isCompleted) {
            li.classList.add('completed');
        }

        // Add event listeners
        const deleteBtn = li.querySelector('.delete-btn');
        deleteBtn.addEventListener('click', deleteTask);

        const taskTextSpan = li.querySelector('.task-text');
        taskTextSpan.addEventListener('click', toggleTaskCompletion);

        taskList.appendChild(li);
    });
}
