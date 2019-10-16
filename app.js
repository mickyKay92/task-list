// Defining the UI Variables

const form = document.querySelector("#task-form");
const taskList = document.querySelector(".collection");
const clearBtn = document.querySelector(".clear-tasks");
const filter = document.querySelector("#filter");
const taskInput = document.querySelector("#task");

// Load all event listeners - function
function loadEventListeners() {
  // DOM load event
  document.addEventListener("DOMContentLoaded", getTasks);
  // Add task event
  form.addEventListener("submit", addTask);
  // Remove task event
  taskList.addEventListener("click", removeTask);
  // Clear task event
  clearBtn.addEventListener("click", clearTasks);
  // Filter task event
  filter.addEventListener("keyup", filterTasks);
}

// Get tasks from LocalStorage
function getTasks() {
  let tasks;
  if (localStorage.getItem("tasks") === null) {
    tasks = [];
  } else {
    tasks = JSON.parse(localStorage.getItem("tasks"));
  }

  tasks.forEach(function(task) {
    // Create li element
    const li = document.createElement("li");
    // Add class to li
    li.className = "collection-item";
    // Create a text node of user input and append to the li
    li.appendChild(document.createTextNode(task));
    // Create new link element
    const link = document.createElement("a");
    // Add class to link
    link.className = "delete-item secondary-content";
    // Add icon HTML
    link.innerHTML = '<i class="fa fa-remove"></i>';
    // Append link to the li
    li.appendChild(link);

    // Append li to the ul
    taskList.appendChild(li);
  });
}

// Load all event listeners
loadEventListeners();

// Add Task
function addTask(e) {
  // If user forgets to add text to the field before subitting
  if (taskInput.value === "") {
    return alert("Remember to add a task first!");
  }
  // Create li element
  const li = document.createElement("li");
  // Add class to li
  li.className = "collection-item";
  // Create a text node of user input and append to the li
  li.appendChild(document.createTextNode(taskInput.value));
  // Create new link element
  const link = document.createElement("a");
  // Add class to link
  link.className = "delete-item secondary-content";
  // Add icon HTML
  link.innerHTML = '<i class="fa fa-remove"></i>';
  // Append link to the li
  li.appendChild(link);

  // Append li to the ul
  taskList.appendChild(li);

  // Store in LocalStorage
  storeInLocalStorage(taskInput.value);

  // Clear the input
  taskInput.value = "";

  e.preventDefault();
}

// Store Task
function storeInLocalStorage(task) {
  let tasks;
  if (localStorage.getItem("tasks") === null) {
    tasks = [];
  } else {
    tasks = JSON.parse(localStorage.getItem("tasks"));
  }
  tasks.push(task);

  localStorage.setItem("tasks", JSON.stringify(tasks));
}

// Remove Task
function removeTask(e) {
  /* Set to only remove if the 'X' button is clicked.
    otherwise the task will delete if user clicks anywhere
    on the container. 'X' icon has a class name of 'delete-item'
    as per above JS, so this function only applies to the 'X' icon
    */
  if (e.target.parentElement.classList.contains("delete-item")) {
    /* Remove the parent of the parent of the 'X' icon (the li),
      because the icon is the <i> within the <a> within the <li>.
      Without this syntax, only the 'X' icon will be removed */
    if (confirm("Are you sure you want to delete this task?")) {
      e.target.parentElement.parentElement.remove();
      // Remove from LocalStorage
      removeFromLocalStorage(e.target.parentElement.parentElement);
    }
  }
}

// Remove from LocalStorage
function removeFromLocalStorage(taskItem) {
  let tasks;
  if (localStorage.getItem("tasks") === null) {
    tasks = [];
  } else {
    tasks = JSON.parse(localStorage.getItem("tasks"));
  }
  tasks.forEach(function(task, index) {
    if (taskItem.textContent === task) {
      tasks.splice(index, 1);
    }
  });

  localStorage.setItem("tasks", JSON.stringify(tasks));
}

// Clear All Tasks
function clearTasks() {
  //   taskList.innerHTML = "";
  while (taskList.firstChild) {
    taskList.removeChild(taskList.firstChild);
  }
  /* Can use 'taskList.innerHTML = "";' but this is slower across
  all browsers - src: https://jsperf.com/innerhtml-vs-removechild/47 */

  // Clear from LocalStorage
  clearFromLocalStorage();
}

// Clear from LocalStorage
function clearFromLocalStorage() {
  localStorage.clear();
}

// Filter Tasks

function filterTasks(e) {
  // converts user input to lower case to easily match
  const text = e.target.value.toLowerCase();

  document.querySelectorAll(".collection-item").forEach(function(task) {
    const item = task.firstChild.textContent;
    if (item.toLowerCase().indexOf(text) != -1) {
      task.style.display = "block";
    } else {
      task.style.display = "none";
    }
  });
}
