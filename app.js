const taskInput = document.getElementById('taskInput');
const addTaskBtn = document.getElementById('addTaskBtn');
const taskList = document.getElementById('taskList');
const editModal = document.getElementById('editModal');
const editTaskInput = document.getElementById('editTaskInput');
const cancelEditBtn = document.getElementById('cancelEditBtn');
const saveEditBtn = document.getElementById('saveEditBtn');

let taskToEdit = null;

// Function to add a new task
function addTask() {
    const taskText = taskInput.value.trim();

    if (taskText === '') {
        alert('Please enter a task');
        return;
    }

    // Create a new list item
    const li = document.createElement('li');
    li.className = 'flex justify-between items-center bg-gray-100 px-4 py-2 rounded-md shadow';

    // Task text
    const span = document.createElement('span');
    span.textContent = taskText;
    li.appendChild(span);

    // Action buttons (Edit & Delete)
    const actionBtns = document.createElement('div');
    actionBtns.className = 'space-x-2';

    // Edit button
    const editBtn = document.createElement('button');
    editBtn.className = 'text-blue-500 mr-3  hover:text-blue-700';
    editBtn.textContent = 'Edit';
    editBtn.addEventListener('click', () => openEditModal(li, span));

    // Delete button
    const deleteBtn = document.createElement('button');
    deleteBtn.className = 'text-red-500 text-2xl hover:text-red-700';
    deleteBtn.innerHTML = '&times;';
    deleteBtn.addEventListener('click', () => li.remove());

    actionBtns.appendChild(editBtn);
    actionBtns.appendChild(deleteBtn);
    li.appendChild(actionBtns);

    // Append the new task to the list
    taskList.appendChild(li);

    // Clear the input
    taskInput.value = '';
}

// Open Edit Modal
function openEditModal(taskItem, taskTextElement) {
    taskToEdit = { taskItem, taskTextElement };
    editTaskInput.value = taskTextElement.textContent;
    editModal.classList.remove('hidden');
}

// Close Edit Modal
function closeEditModal() {
    editModal.classList.add('hidden');
    taskToEdit = null;
}

// Save the edited task
function saveEditTask() {
    if (taskToEdit && editTaskInput.value.trim() !== '') {
        taskToEdit.taskTextElement.textContent = editTaskInput.value.trim();
        closeEditModal();
    } else {
        alert('Please enter a valid task.');
    }
}

// Event listener for the Add Task button
addTaskBtn.addEventListener('click', addTask);

// Optional: Add task with Enter key
taskInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
        addTask();
    }
});

// Cancel Edit button
cancelEditBtn.addEventListener('click', closeEditModal);

// Save Edit button
saveEditBtn.addEventListener('click', saveEditTask);

// Close modal if clicked outside the modal content
window.addEventListener('click', (e) => {
    if (e.target === editModal) {
        closeEditModal();
    }
});