import { elFooterTemp, elTaskList, elTemp } from "./html-elements.js";

export function uiRender(todo, type){
    elTaskList.innerHTML = '';
    let tasksToRender = type === 'all' ? [...todo.active, ...todo.completed] : todo[type];
    
    tasksToRender.forEach(el =>{
        let clone = elTemp.content.cloneNode(true);
        const title = clone.querySelector('h3');
        const li = clone.querySelector('li');
        const img = clone.querySelector('#checked');
        
        li.dataset.id = el.id;
        title.innerText = el.title;
        
        if (el.isCompleted) {
            title.classList.add('checkedStyle');
            img.src = './images/checked-circle.svg';
        } else {
            title.classList.remove('checkedStyle');
            const currentTheme = document.documentElement.dataset.theme;
            img.setAttribute('data-theme', currentTheme);
            img.src = currentTheme === 'dark' ? './images/dark-circle.svg' : './images/circle.svg';
        }
        
        elTaskList.append(clone);
    });
    if (tasksToRender.length > 0) {
        let footClone = elFooterTemp.content.cloneNode(true); 
        const counterSpan = footClone.querySelector('span');
        const activeCount = todo.active.length;
        counterSpan.textContent = `${activeCount} ${activeCount === 1 ? 'item' : 'items'} left`;
        elTaskList.append(footClone);
    } 
}


export function removeTodo(todo, type, id){
    const filtered = todo[type].filter(el => el.id !==id)
    const res = {...todo, [type]:filtered}   
    return res;
}