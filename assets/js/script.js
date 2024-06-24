// DOM variables
const btnMainAddTask = document.getElementById("btn-main-add-task");
const btnModalAddTask = document.getElementById("btn-modal-add-task");

// // Retrieve tasks and nextId from localStorage (not used)
// let taskList = JSON.parse(localStorage.getItem("tasks"));
// let nextId = JSON.parse(localStorage.getItem("nextId"));

// Function to read Tasks from localStorage
function readTasksFromStorage() {
  try {
    let tasks = JSON.parse(localStorage.getItem('tasks'));
    if (!tasks) {
      tasks = [];
    }
    return tasks;
  } catch (error) {
    alert(error);
  }
}

// Function to save Tasks to localStorage
function saveTasksToStorage(tasks) {
  try {
    localStorage.setItem('tasks', JSON.stringify(tasks));
  }
  catch {
    alert(error);
  }
}

// Function to Delete a Task
function handleDeleteTask(event) {
  const taskId = $(this).attr('data-task-id');
  const tasks = readTasksFromStorage();

  // Delete task from the array.
  tasks.forEach((task) => {
    if (task.id === taskId) {
      tasks.splice(tasks.indexOf(task), 1);
    }
  });

  // Save all tasks to localStorage
  saveTasksToStorage(tasks);
  // Render task data to the screen
  renderTaskList();
}

// Function to create a task card
function createTaskCard(task) {
  // Set up card variables
  const taskCard = $('<div>')
    .addClass('card task-card draggable my-3')
    .attr('data-task-id', task.id);
  const cardHeader = $('<div>').addClass('card-header h4').text(task.title);
  const cardBody = $('<div>').addClass('card-body');
  const cardDueDate = $('<p style="font-weight: bold; font-style: italic;">').addClass('card-text').text(task.dueDate);
  const cardDesc = $('<p>').addClass('card-text').text(task.desc);
  
  // Create Delete button
  const cardDeleteBtn = $('<button>')
    .addClass('btn btn-danger delete')
    .text('Delete')
    .attr('data-task-id', task.id);
  cardDeleteBtn.on('click', handleDeleteTask);

  // Set the background color based on due date (show Due Date if task is NOT done)
  if (task.dueDate && task.status !== 'done') {
    const now = dayjs();
    const taskDueDate = dayjs(task.dueDate, 'DD/MM/YYYY');
    // If task is due today - YELLOW, if it is overdue - RED
    if (now.isSame(taskDueDate, 'day')) {
      taskCard.addClass('bg-warning text-white');
    } else if (now.isAfter(taskDueDate)) {
      taskCard.addClass('bg-danger text-white');
      cardDeleteBtn.addClass('border-light');
    }
  }
  else {
    taskCard.addClass('text-primary');
  }

  // Add card elments to taskCard
  cardBody.append(cardDesc, cardDueDate, cardDeleteBtn);
  taskCard.append(cardHeader, cardBody);

  return taskCard;
}

// Function to render Tasks to the page
function renderTaskList() {
  // Get swim-lanes elements to attach cards to
  const todoList = $('#todo-cards');
  const inProgressList = $('#in-progress-cards');
  const doneList = $('#done-cards');
  // Empty out swim-lanes
  todoList.empty();
  inProgressList.empty();
  doneList.empty();  
  // Read Tasks from localStorage
  const tasks = readTasksFromStorage();  
  console.log(tasks)
  // Loop through tasks and create task cards for each status
  for (let task of tasks) {
    if (task.status === 'to-do') {
      todoList.append(createTaskCard(task));
    } else if (task.status === 'in-progress') {
      inProgressList.append(createTaskCard(task));
    } else if (task.status === 'done') {
      doneList.append(createTaskCard(task));
    }
  }
  // Use JQuery UI to make task cards draggable
  $('.draggable').draggable({
    opacity: 0.7,
    zIndex: 100,
    // ? This is the function that creates the clone of the card that is dragged. This is purely visual and does not affect the data.
    helper: function (e) {
      // ? Check if the target of the drag event is the card itself or a child element. If it is the card itself, clone it, otherwise find the parent card  that is draggable and clone that.
      const original = $(e.target).hasClass('ui-draggable')
        ? $(e.target)
        : $(e.target).closest('.ui-draggable');
      // ? Return the clone with the width set to the width of the original card. This is so the clone does not take up the entire width of the lane. This is to also fix a visual bug where the card shrinks as it's dragged to the right.
      return original.clone().css({
        width: original.outerWidth(),
      });
    },
  });
}

// Todo: create a function to generate a unique task id
function generateTaskId() {
  return self.crypto.randomUUID();
  // Another way to get a Unique ID
  // return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'
  //   .replace(/[xy]/g, function (c) {
  //       const r = Math.random() * 16 | 0, 
  //           v = c == 'x' ? r : (r & 0x3 | 0x8);
  //       return v.toString(16);
  //   });
}

// Function to add a New Task
function handleAddTask(event){
  const taskTitle = $("#task-title").val().trim();
  const taskDueDate = $("#task-due-date").val();
  const taskDesc = $("#task-desc").val().trim();
  const newID = generateTaskId();
  console.log("add")
  const newTask = {
    id: newID,
    title: taskTitle,
    dueDate: taskDueDate,
    desc: taskDesc,
    status: 'to-do',
  };
  // Get Tasks saved from localStorage
  const tasks = readTasksFromStorage();
  // Add New Task to tasks array
  tasks.push(newTask);
  // Save all tasks to localStorage
  saveTasksToStorage(tasks);
  // Render task data to the screen
  renderTaskList();
}

// Function to handle dropping a task into a new swim-lane
function handleDrop(event, ui) {
  // Get Tasks saved from localStorage
  const tasks = readTasksFromStorage();
  // Get TaskId
  const taskId = ui.draggable[0].dataset.taskId;
  // Get the ID of the lane that the card was dropped into
  const newStatus = event.target.id;
  // Locate task card by the `id` and update the project status
  for (let task of tasks) {
    if (task.id === taskId) {
      task.status = newStatus;
    }
  }
   // Save all tasks to localStorage
   saveTasksToStorage(tasks);
   // Render task data to the screen
   renderTaskList();
}

// Runs when the page loads
$(document).ready(function () {
  // Set DatePicker to Due Date input where user can change month and year
  $('#task-due-date').datepicker({
    changeMonth: true,
    changeYear: true,
  });
  // Make swim-lanes droppable
  $('.lane').droppable({
    accept: '.draggable',
    drop: handleDrop,
  });
  // Render task data to the screen
  renderTaskList();
});

// Button click event to Add Task on MAIN page
btnMainAddTask.addEventListener("click", function(event) {
  event.preventDefault();
  $("#task-title").val('');
  $("#task-due-date").val('');
  $("#task-desc").val('');
  $("#task-title").focus();
});

// Button submit event on modal dialog
btnModalAddTask.addEventListener("click", function(event) {
  event.preventDefault();
  // Get input values
  const taskTitle = $("#task-title").val().trim();
  const taskDueDate = $("#task-due-date").val();
  const taskDesc = $("#task-desc").val().trim();
  // Make sure input values exist
  if (taskTitle && taskDueDate && taskDesc) {
    handleAddTask();
  }
  else {
    return;
  }
  // Hide Modal dialog
  $('#formModal').modal('hide');
});

// Hide form when Close X button is clicked
$("#formModal").on('click','button.close', function(event) {
  $('#formModal').modal('hide');
})
