import { elFooterLi, elNewTaskForm, elTaskList } from "./html-elements.js";
import { uiRender, removeTodo } from "./ui-render.js";

// Load tasks from localStorage or initialize with default state
export let todos = JSON.parse(localStorage.getItem('tasks')) || {
    active: [],
    completed: [],
    get all() {
        return [...this.active, ...this.completed];
    }
};

// Render the initial state
uiRender(todos, 'all');

// Removing leading whitespaces as the user types
elNewTaskForm.addEventListener('input', function (evt) {
    let value = evt.target.value;
    if (/^\s+/g.test(value)) {
        evt.target.value = value.trimStart();
    }
});

// Adding new task to active form of todos, and rendering using uiRender func
elNewTaskForm.addEventListener('submit', function (evt) {
    evt.preventDefault();
    let taskText = evt.target.input.value;
    todos['active'].push({ title: taskText, isCompleted: false, id: Date.now().toString() });
    localStorage.setItem('tasks', JSON.stringify(todos)); 
    uiRender(todos, 'active');
    evt.target.reset();
});


// Click event for ul
elTaskList.addEventListener('click', function (evt) {
    const li = evt.target.closest('li');
    // deleting a task when we click to a delete img
    if (evt.target.matches('#deleteImg')) {
        const li = evt.target.closest('li');
        todos = removeTodo(todos, 'active', li.dataset.id);
        localStorage.setItem('tasks', JSON.stringify(todos));
        uiRender(todos, 'active');        
    }

    // add the task to the complited when we check the checkbox
    if (evt.target.matches('#checked')) {
        const elId = li.dataset.id;
        const taskIndex = todos.active.findIndex(task => task.id ==elId);

        if (taskIndex !== -1){
            const completedTask = {...todos.active[taskIndex], isCompleted: true};
            todos.completed.push(completedTask);
            todos.active.splice(taskIndex, 1);
            evt.target.src = './images/checked-circle.svg'
            console.log(evt.target.src)
            console.log(todos)
        } else {
            const completedTaskIndex = todos.completed.findIndex(task => task.id === elId);
            const activeTask = { ...todos.completed[completedTaskIndex], isCompleted: false };
            todos.active.push(activeTask);
            todos.completed.splice(completedTaskIndex, 1);
            evt.target.src = './images/circle.svg'
            console.log(evt.target.src)
            console.log(todos)
        }
        
        
    }

    if(evt.target.matches('#all')){
        uiRender(todos, 'all');
        console.log('all clicked')
    }

    if(evt.target.matches('#active')){
        uiRender(todos, 'active');
        console.log('active clicked')
    }

    if(evt.target.matches('#completed')){
        if (todos['completed'].length > 0){
            uiRender(todos, 'completed');
            console.log('completed clicked')
        } else{
            console.log('nothing to render')
        }
    }

});



// elTaskList.addEventListener('click', function (evt) {
//     const li = evt.target.closest('li');
//     if (!li) return; // Ensure li exists

//     // Check if the clicked element is the checked-circle
//     if (evt.target.matches('#checked')) {
//         const elId = li.dataset.id;
//         const taskIndex = todos.active.findIndex(task => task.id === elId);
        
//         if (taskIndex !== -1) {
//             // Task is currently active, move it to completed
//             const completedTask = { ...todos.active[taskIndex], isCompleted: true };
//             todos.completed.push(completedTask);
//             todos.active.splice(taskIndex, 1); // Remove from active
//             evt.target.src = './images/checked-circle.svg'; // Change the icon
//         } else {
//             // Task is currently completed, move it back to active
//             const completedTaskIndex = todos.completed.findIndex(task => task.id === elId);
//             const activeTask = { ...todos.completed[completedTaskIndex], isCompleted: false };
//             todos.active.push(activeTask);
//             todos.completed.splice(completedTaskIndex, 1); // Remove from completed
//             evt.target.src = './images/circle.svg'; // Change the icon back
//         }

//         // Update local storage and re-render the UI
//         localStorage.setItem('tasks', JSON.stringify(todos));
//         uiRender(todos, 'all'); // Render all tasks to reflect changes
//     }

//     // Handle delete action
//     if (evt.target.matches('.deleteImg')) {
//         todos = removeTodo(todos, 'active', li.dataset.id);
//         localStorage.setItem('tasks', JSON.stringify(todos));
//         uiRender(todos, 'active');        
//     }
// });


elTaskList.addEventListener('mouseenter', function(evt){
    if (evt.target.matches('#checked')){
        console.log('hovered')
    }
})
