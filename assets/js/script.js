// DOM variables
const addTaskModal = document.getElementById("modal-add-task");

// Retrieve tasks and nextId from localStorage
let taskList = JSON.parse(localStorage.getItem("tasks"));
let nextId = JSON.parse(localStorage.getItem("nextId"));

// Todo: create a function to generate a unique task id
function generateTaskId() {

}

// Todo: create a function to create a task card
function createTaskCard(task) {

}

// Todo: create a function to render the task list and make cards draggable
function renderTaskList() {

}

// Todo: create a function to handle adding a new task
function handleAddTask(event){

}

// Todo: create a function to handle deleting a task
function handleDeleteTask(event){

}

// Todo: create a function to handle dropping a task into a new status lane
function handleDrop(event, ui) {

}

// Function to read Tasks from localStorage
function readTasksFromStorage() {
  let tasks = JSON.parse(localStorage.getItem('projects'));
  if (!tasks) {
    tasks = [];
  }
  return tasks;
}

// Function to save Tasks to localStorage
function saveProjectsToStorage(tasks) {
  localStorage.setItem('tasks', JSON.stringify(tasks));
}

function printTaskData() {
  const tasks = readTasksFromStorage();

  // ? Empty existing project cards out of the lanes
  // const todoList = $('#todo-cards');
  // todoList.empty();

  // const inProgressList = $('#in-progress-cards');
  // inProgressList.empty();

  // const doneList = $('#done-cards');
  // doneList.empty();

  // // ? Loop through projects and create project cards for each status
  // for (let project of projects) {
  //   if (project.status === 'to-do') {
  //     todoList.append(createProjectCard(project));
  //   } else if (project.status === 'in-progress') {
  //     inProgressList.append(createProjectCard(project));
  //   } else if (project.status === 'done') {
  //     doneList.append(createProjectCard(project));
  //   }
  }

// Todo: when the page loads, render the task list, add event listeners, make lanes droppable, and make the due date field a date picker
$(document).ready(function () {
  $("#task-due-date").datepicker();
  printTaskData();



});

// Function to add a new task
function addNewTask(event) {
  event.preventDefault;
}

addTaskModal.addEventListener("submit", function(event) {
  event.preventDefault;
  //addNewTask(event);
  $("task-title").val('');
  $('#formModal').modal('hide');
});


