// DOM variables
const addTaskModal = document.getElementById("modal-add-task");

// Retrieve tasks and nextId from localStorage
let taskList = JSON.parse(localStorage.getItem("tasks"));
let nextId = JSON.parse(localStorage.getItem("nextId"));
var dialog;

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

// Todo: when the page loads, render the task list, add event listeners, make lanes droppable, and make the due date field a date picker
$(document).ready(function () {

});

// Function to add a new task
function addNewTask(event) {
  event.preventDefault;
}

addTaskModal.addEventListener("submit", function(event) {
  event.preventDefault;
  //addNewTask(event);
  $('#formModal').modal('hide');
});



// // Define our dialog



// $( function() {
  
//   // $("#dialog-task").dialog({
//   //   autoOpen: false
//   // });

//   $( "#btn-add-task" ).on( "click", function() {
//     $( "#dialog-task" ).dialog( "open" );
//   });

//   $( "#dialog-task" ).dialog({
//     autoOpen: false,
//     height: 400,
//     width: 350,
//     modal: true,
//     buttons: {
//       "Add Task": function() {
//         addNewTask();
//         $(this).dialog("close");
//       }
//     },
//     close: function() {
//       $(this).dialog("close");
//     } });

// } );


// $( function() {
//     var dialog, form,
 
//       // From http://www.whatwg.org/specs/web-apps/current-work/multipage/states-of-the-type-attribute.html#e-mail-state-%28type=email%29
//       emailRegex = /^[a-zA-Z0-9.!#$%&'*+\/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/,
//       name = $( "#name" ),
//       email = $( "#email" ),
//       password = $( "#password" ),
//       allFields = $( [] ).add( name ).add( email ).add( password ),
//       tips = $( ".validateTips" );
// });



    // form = dialog.find( "form" ).on( "submit", function( event ) {
    //     event.preventDefault();
    //     addUser();
    //   });

    // $( "#create-user" ).button().on( "click", function() {
    //     dialog.dialog( "open" );
    //   });