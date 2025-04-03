import { elFooterTemp, elTaskList, elTemp } from "./html-elements.js";

// rendering todo[type] to ui by taking clone from elTemp template and adding it to elTaskList ul
export function uiRender(todo, type){
    elTaskList.innerHTML = '';
    todo[type].forEach(el =>{
        let clone = elTemp.content.cloneNode(true);
        const title = clone.querySelector('h3');
        const li = clone.querySelector('li');
        const img = clone.querySelector('#checked');

        li.dataset.id = el.id;
        title.innerText = el.title;

        img.src = el.isCompleted ? './images/checked-circle.svg' : './images/circle.svg';
        elTaskList.append(clone);
    });
    if (todo[type].length > 0) {
        let footClone = elFooterTemp.content.cloneNode(true); 
        elTaskList.append(footClone);
    } 
}


export function removeTodo(todo, type, id){
    const filtered = todo[type].filter(el => el.id !==id)
    const res = {...todo, [type]:filtered}   
    return res;
}