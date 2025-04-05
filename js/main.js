import { elFooterLi, elNewTaskForm, elTaskList, elTheme, elAdd, elRemove, elClick } from "./html-elements.js";
import { uiRender, removeTodo } from "./ui-render.js";


const savedTheme = localStorage.getItem('theme') || 'light';
document.documentElement.dataset.theme = savedTheme;
elTheme.src = savedTheme === 'dark' ? './images/sun.svg' : './images/moon.svg';

// dark/light theme
elTheme.addEventListener('click', function(evt){
    elAdd.play();
    const currentTheme = document.documentElement.dataset.theme;
    const newTheme = currentTheme === 'light' ? 'dark' : 'light';
    document.documentElement.dataset.theme = newTheme;
    evt.target.src = newTheme === 'dark' ? './images/sun.svg' : './images/moon.svg';

    const circleImages = document.querySelectorAll('#checked');
    circleImages.forEach(img => {
        if (!img.src.includes('checked-circle')) {
            img.src = newTheme === 'dark' ? '../images/dark-circle.svg' : './images/circle.svg';
        }
    });
    localStorage.setItem('theme', newTheme);
});


// loading tasks
export let todos = JSON.parse(localStorage.getItem('tasks')) || {
    active: [],
    completed: [],
    get all() {
        return [...this.active, ...this.completed];
    }
};

// initial rendering
let currentFilter = 'all';
uiRender(todos, currentFilter);

// removing leading spaces
elNewTaskForm.addEventListener('input', function (evt) {
    let value = evt.target.value;
    if (/^\s+/g.test(value)) {
        evt.target.value = value.trimStart();
    }
});

// adding new task
elNewTaskForm.addEventListener('submit', function (evt) {
    elAdd.play();
    evt.preventDefault();
    let taskText = evt.target.input.value;
    currentFilter = 'active';
    todos[currentFilter].push({ title: taskText, isCompleted: false, id: Date.now().toString() });
    localStorage.setItem('tasks', JSON.stringify(todos)); 
    uiRender(todos, 'all');
    evt.target.reset();
});


// click event for ul
elTaskList.addEventListener('click', function (evt) {
    const li = evt.target.closest('li');
    // deleting a task when we click to a delete img
    if (evt.target.matches('#deleteImg')) {
        elRemove.play();
        const taskId = li.dataset.id;
        console.log(taskId)
        const isInActive = todos.active.some(task => task.id === taskId);
        const isInCompleted = todos.completed.some(task => task.id === taskId);
        
        if (isInActive) {
            todos = removeTodo(todos, 'active', taskId);
            if (currentFilter === 'active' && todos.active.length === 0) {
                currentFilter = 'all';
            }
        } else if (isInCompleted) {
            todos = removeTodo(todos, 'completed', taskId);
            if (currentFilter === 'completed' && todos.completed.length === 0) {
                currentFilter = 'all';
            }
        }
        localStorage.setItem('tasks', JSON.stringify(todos));
        uiRender(todos, currentFilter);
    }

    // add the task to the complited when we check the checkbox
    if (evt.target.matches('#checked')) {
        elClick.play();
        const elId = li.dataset.id;
        console.log(elId)
        const taskIndex = todos.active.findIndex(task => task.id ==elId);
        li.classList.toggle('checkedStyle');

        if (taskIndex !== -1){
            const completedTask = {...todos.active[taskIndex], isCompleted: true};
            todos.completed.push(completedTask);
            todos.active.splice(taskIndex, 1);
            if (currentFilter === 'active' && todos.active.length === 0) {
                currentFilter = 'all';
            }
            evt.target.src = './images/checked-circle.svg';
            localStorage.setItem('tasks', JSON.stringify(todos));
            console.log(evt.target.src)
            console.log(todos)
        } else {
            const completedTaskIndex = todos.completed.findIndex(task => task.id === elId);
            const activeTask = { ...todos.completed[completedTaskIndex], isCompleted: false };
            todos.active.push(activeTask);
            todos.completed.splice(completedTaskIndex, 1);

            if (currentFilter === 'completed' && todos.completed.length === 0) {
                currentFilter = 'all';
            }
            evt.target.src = './images/circle.svg';
            localStorage.setItem('tasks', JSON.stringify(todos));
            console.log(evt.target.src)
            console.log(todos)
        }
        
        uiRender(todos, currentFilter);
    }

    // rendering task accoring to currentFilter
    if(evt.target.matches('#all')){
        elClick.play();
        currentFilter = 'all';
        uiRender(todos, currentFilter);
        console.log('all clicked')
    }

    if(evt.target.matches('#active')){
        elClick.play();
        if(todos['active'].length > 0){
            currentFilter = 'active';
            uiRender(todos, currentFilter);
            console.log('active clicked')
        } else{
            alert('No active tasks');
            console.log('nothing to render')
        }
    }

    if(evt.target.matches('#completed')){
        elClick.play();
        if (todos['completed'].length > 0){
            currentFilter = 'completed';
            uiRender(todos, currentFilter);
            console.log('completed clicked')
        } else{
            alert('No completed tasks');
            console.log('nothing to render')
        }
    }

    if(evt.target.matches('#clearCompleted') && evt.target.tagName === 'SPAN'){
        elRemove.play();
        todos.completed = [];
        localStorage.setItem('tasks', JSON.stringify(todos));
        uiRender(todos, currentFilter);
    }

});


