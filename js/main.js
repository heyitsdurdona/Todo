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
    // deleting a task when we click to a delete img
    if (evt.target.matches('#deleteImg')) {
        const li = evt.target.closest('li');
        todos = removeTodo(todos, 'active', li.dataset.id);
        localStorage.setItem('tasks', JSON.stringify(todos));
        uiRender(todos, 'active');        
    }

    // add the task to the complited when we check the checkbox
    if (evt.target.matches('#checked')) {
        const li = evt.target.closest('li');
        const title = li.querySelector('h3').innerText;
        const elId = li.dataset.id;
        todos = removeTodo(todos, 'active', elId);       

        todos['completed'].push({title: title, isCompleted: true, id: elId});
        console.log(todos);

        evt.target.src = ('./images/checked-circle.svg')
        localStorage.setItem('tasks', JSON.stringify(todos));
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



elTaskList.addEventListener('mouseenter', function(evt){
    if (evt.target.matches('#checked')){
        console.log('hovered')
    }
})
