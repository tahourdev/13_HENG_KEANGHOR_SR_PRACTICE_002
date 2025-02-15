// ==================================================================================
// Sample task data stored as an array of objects
// Each task contains a task name, due date (formatted as YYYY/DD/MM), and priority level
let tasks = [
  { taskName: 'Complete Javascript Project', date: '2025/23/01', priority: 'High' },
  { taskName: 'Review Team Document', date: '2025/12/02', priority: 'High' },
];

// ==================================================================================
// DOM Element References

// Input field for entering a new task name
let taskInput = document.getElementById('task-name');

// Button to add a new task
let addTask = document.getElementById('add-task');

// Input field for selecting the task's due date
let dateInput = document.getElementById('task-datepicker');

// Dropdown for selecting the task priority (e.g., High, Medium, Low)
let priorityInput = document.getElementById('task-priority');

// Error message elements for form validation
let taskNameError = document.getElementById('task-name-error'); // Task name error
let taskDateError = document.getElementById('task-date-error'); // Task date error
let taskPriorityError = document.getElementById('task-priority-error'); // Task priority error

// Table body where tasks will be dynamically inserted
let taskTableBody = document.getElementById('task-table');

// Toast notification element for displaying success messages
const toast = document.getElementById('toast-success');

// Button inside the toast notification to manually close it
const closeToastBtn = toast.querySelector('button');

// ==================================================================================
// Funtion to add task to table
const addTaskToTable = (task) => {
  // Create a new row
  const newRow = document.createElement('tr');
  newRow.className =
    'cursor-pointer border-b transition-all duration-100 ease-in-out dark:border-gray-500 dark:text-white text-slate-800 border-gray-200';

  // Add task name cell
  const taskNameCell = document.createElement('td');
  taskNameCell.className = 'px-6 py-4 font-medium whitespace-nowrap';
  taskNameCell.textContent = task.taskName;
  newRow.appendChild(taskNameCell);

  // Add task date cell
  const taskDateCell = document.createElement('td');
  taskDateCell.className = 'px-6 py-4';
  taskDateCell.textContent = task.date;
  newRow.appendChild(taskDateCell);

  // Add task priority cell
  const taskPriorityCell = document.createElement('td');
  taskPriorityCell.className = 'px-6 py-4';
  taskPriorityCell.textContent = task.priority;
  newRow.appendChild(taskPriorityCell);

  // Add task status cell with a button
  const taskStatusCell = document.createElement('td');
  const statusButton = document.createElement('button');
  statusButton.setAttribute('id', 'status');
  statusButton.className =
    'py-1.5 text-white px-6 transition-all duration-100 ease-in-out bg-yellow-600 rounded-lg';
  statusButton.textContent = 'Pending';
  taskStatusCell.appendChild(statusButton);
  newRow.appendChild(taskStatusCell);

  // Append the new row to the table body
  taskTableBody.appendChild(newRow);
};

// ==================================================================================
// Function for toggling task status
taskTableBody.addEventListener('click', (event) => {
  // Find the closest row
  const clickedRow = event.target.closest('tr');
  console.log(clickedRow);

  // Ensure the click is inside a valid row
  if (!clickedRow) return;

  // Find the status button inside the clicked row
  const statusButton = clickedRow.querySelector('button');

  if (statusButton) {
    // Toggle completed class (line-through)
    clickedRow.classList.toggle('line-through');

    // Toggle button text and color
    if (statusButton.textContent === 'Pending') {
      statusButton.textContent = 'Completed';
      statusButton.classList.remove('bg-yellow-600');
      statusButton.classList.add('bg-green-600');
    } else {
      statusButton.textContent = 'Pending';
      statusButton.classList.remove('bg-green-600');
      statusButton.classList.add('bg-yellow-600');
    }
  }
});

// Populate existing tasks on page load
tasks.forEach((task) => {
  addTaskToTable(task);
});

// ==================================================================================
// Function to display the toast notification when a task is successfully added
const showToast = () => {
  toast.classList.remove('opacity-0', 'duration-100', 'ease-linear', '-bottom-5');
  toast.classList.add('opacity-100', 'duration-300', 'ease-in-out', 'bottom-0');

  // Hide after 3 seconds
  setTimeout(() => {
    hideToast();
  }, 3000);
};

// Function to hide toast
const hideToast = () => {
  toast.classList.remove('opacity-100', 'duration-300', 'ease-in-out', 'bottom-0');
  toast.classList.add('opacity-0', 'duration-100', 'ease-linear', '-bottom-5');
};

// Handle manual close
closeToastBtn.addEventListener('click', hideToast);

// ==================================================================================
// Function to add a new task when the "Add Task" button is clicked
addTask.addEventListener('click', () => {
  let isValid = true;

  // ==================================================================================
  // Validate Task Name Input
  if (taskInput.value.trim() === '') {
    taskNameError.classList.remove('hidden');
    taskInput.classList.add('!border-red-500');
    isValid = false;
  } else {
    taskNameError.classList.add('hidden');
    taskInput.classList.remove('!border-red-500');
  }

  // ==================================================================================
  // Validate Task Date Input
  if (dateInput.value === '') {
    taskDateError.classList.remove('hidden');
    dateInput.classList.add('!border-red-500');
    isValid = false;
  } else {
    const selectedDate = new Date(dateInput.value);
    const currentDate = new Date();
    currentDate.setHours(0, 0, 0, 0);

    if (selectedDate < currentDate) {
      taskDateError.textContent = 'Please select a date that is today or in the future.';
      taskDateError.classList.remove('hidden');
      dateInput.classList.add('!border-red-500');
      isValid = false;
    } else {
      taskDateError.classList.add('hidden');
      dateInput.classList.remove('!border-red-500');
    }
  }

  // ==================================================================================
  // Validate Task Priority Selection
  if (priorityInput.value === 'Choose Priority') {
    taskPriorityError.classList.remove('hidden');
    priorityInput.classList.add('!border-red-500');
    isValid = false;
  } else {
    taskPriorityError.classList.add('hidden');
    priorityInput.classList.remove('!border-red-500');
  }

  // ==================================================================================
  // If all inputs are valid, proceed to add the task
  if (isValid) {
    const taskName = taskInput.value.trim();
    const taskDate = dateInput.value;
    const taskPriority = priorityInput.value;

    // Format date to YYYY/DD/MM
    const dateParts = taskDate.split('/');
    const formattedDate = `${dateParts[2]}/${dateParts[1]}/${dateParts[0]}`;
    console.log(taskDate);

    // Create a task object
    const newTask = { taskName, date: formattedDate, priority: taskPriority };

    // Add to tasks array
    tasks.push(newTask);

    // Add task to the table
    addTaskToTable(newTask);

    // Log tasks for debugging
    console.log('Tasks:', tasks);

    // Clear input fields
    taskInput.value = '';
    dateInput.value = '';
    priorityInput.value = 'Choose Priority';

    showToast();
  }
});
