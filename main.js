let tasks = [
  { taskName: 'Complete Javascript Project', date: '2025/23/01', priority: 'High' },
  { taskName: 'Review Team Document', date: '2025/12/02', priority: 'High' },
];

let taskInput = document.getElementById('task-name');
let addTask = document.getElementById('add-task');
let dateInput = document.getElementById('task-datepicker');
let priorityInput = document.getElementById('task-priority');
let taskNameError = document.getElementById('task-name-error');
let taskDateError = document.getElementById('task-date-error');
let taskPriorityError = document.getElementById('task-priority-error');
let taskTableBody = document.getElementById('task-table');

// Add task to table
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
  taskStatusCell.className = 'px-6 py-4';
  const statusButton = document.createElement('button');
  statusButton.setAttribute('id', 'status');
  statusButton.className =
    'py-1.5 text-white px-6 bg-yellow-600 rounded-lg transition-all duration-100 ease-in-out';
  statusButton.textContent = 'Pending';
  taskStatusCell.appendChild(statusButton);
  newRow.appendChild(taskStatusCell);

  // Append the new row to the table body
  taskTableBody.appendChild(newRow);
};

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

// Add new task on button click
addTask.addEventListener('click', () => {
  let isValid = true;

  // Validate task name
  if (taskInput.value.trim() === '') {
    taskNameError.classList.remove('hidden');
    taskInput.classList.add('!border-red-500');
    isValid = false;
  } else {
    taskNameError.classList.add('hidden');
    taskInput.classList.remove('!border-red-500');
  }

  // Validate date picker
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

  // Validate priority
  if (priorityInput.value === 'Choose Priority') {
    taskPriorityError.classList.remove('hidden');
    priorityInput.classList.add('!border-red-500');
    isValid = false;
  } else {
    taskPriorityError.classList.add('hidden');
    priorityInput.classList.remove('!border-red-500');
  }

  // If valid, add task
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

    alert('Task added successfully!');
  }
});
