// Get references to elements
const inputBox = document.getElementById("input-box");
const listContainer = document.getElementById("list-container");
const prioritySelector = document.getElementById("priority-selector");

// Function to add a task
function addTask() {
  if (inputBox.value.trim() === "") {
    alert("Please enter a task!");
    return;
 }

  // Create a new list item for the task
  const li = document.createElement("li");
  li.className = prioritySelector.value; // Set priority class

  // Add task text inside a <p> tag
  const taskText = document.createElement("p");
  taskText.textContent = inputBox.value;

  // Add a remove button
  const removeButton = document.createElement("span");
  removeButton.textContent = "×";

  // Append elements to the list item
  li.appendChild(taskText);
  li.appendChild(removeButton);
  listContainer.appendChild(li);

  // Clear input and save tasks
  inputBox.value = "";
  saveData();
}

// Event listener for list item actions
listContainer.addEventListener("click", (event) => {
  if (event.target.tagName === "LI") {
    event.target.classList.toggle("checked"); // Toggle completed task
    saveData();
  } else if (event.target.tagName === "SPAN") {
    event.target.parentElement.remove(); // Remove task
    saveData();
  }
});

// Save tasks to localStorage
function saveData() {
  const tasks = Array.from(listContainer.children).map((li) => ({
    text: li.querySelector("p").textContent, // Task text
    priority: li.className, // Task priority
  }));
  localStorage.setItem("tasks", JSON.stringify(tasks)); // Save as JSON
}

// Load tasks from localStorage
function loadData() {
  const tasks = JSON.parse(localStorage.getItem("tasks")) || [];
  tasks.forEach((task) => {
    const li = document.createElement("li");
    li.className = task.priority;

    const taskText = document.createElement("p");
    taskText.textContent = task.text;

    const removeButton = document.createElement("span");
    removeButton.textContent = "×";

    li.appendChild(taskText);
    li.appendChild(removeButton);
    listContainer.appendChild(li);
  });
}

// Clear all tasks
function clearAll() {
  if (confirm("Are you sure you want to clear all tasks?")) {
    listContainer.innerHTML = ""; // Remove all tasks
    saveData();
  }
}

// Load tasks when the page loads
window.onload = loadData;
