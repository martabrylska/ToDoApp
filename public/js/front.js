// Twój kod
const newToDoInput = document.querySelector('.new-todo');
const toDoList = document.querySelector('.todo-list');
const counter = document.querySelector('.todo-count strong');
const clearButton = document.querySelector('.clear-completed');
const filters = document.querySelectorAll('.filters li a');


function generateTheList(arr) {
    toDoList.textContent = "";
    clearButton.classList.add('hidden');
    arr.forEach(({name, completed}) => {
        const newLi = document.createElement('li');
        const newDiv = document.createElement('div');
        newDiv.classList.add('view');
        const newInput = document.createElement('input');
        newInput.classList.add('toggle');
        newInput.setAttribute('type', 'checkbox');
        if (completed) {
            clearButton.classList.remove('hidden');
            newLi.classList.add('completed');
            newInput.setAttribute('checked', 'true');
        }
        const newLabel = document.createElement('label');
        const newButton = document.createElement('button');
        newButton.classList.add('destroy');
        newLabel.textContent = name;
        newDiv.append(newInput, newLabel, newButton);
        newLi.append(newDiv);
        toDoList.append(newLi);
    })
    counter.textContent = arr.length;
}

async function getTheResponse(path, task) {
    const res = await fetch(path, {
        method: 'POST',
        body: task,
        headers: {
            'Content-Type': 'application/json',
        }
    })
    return res.json();
}

(async () => {
    const arrListToDo = await getTheResponse('/');
    generateTheList(arrListToDo);
    if (arrListToDo.length === 0) clearButton.classList.add('hidden');
})()



async function addTheTask(event) {
    if (event.key === 'Enter') {

        const newToDo = newToDoInput.value;

        if (newToDo === '') return;

        newToDoInput.value = '';

        const arrListToDo = await getTheResponse('/add', JSON.stringify({newToDo}));
        generateTheList(arrListToDo);
    }
}

 async function completeTheTask(event) {

    if (event.target.classList.value === 'toggle') {

        const task = event.target.nextElementSibling.textContent;

        const arrListToDoChanged = await getTheResponse('/complete', JSON.stringify({task}));
        generateTheList(arrListToDoChanged);
    }
}

async function removeTheTask(event) {

    if (event.target.classList.value === 'destroy') {

        const task = event.target.previousElementSibling.textContent;

        const arrListToDoChanged = await getTheResponse('/remove', JSON.stringify({task}));
        generateTheList(arrListToDoChanged);
    }
}

async function clearCompletedTasks() {

    const arrListToDoChanged = await getTheResponse('/clear');
    generateTheList(arrListToDoChanged);
}

async function filterTasks(event, path) {

        const arrListToDo = await getTheResponse(path);
        generateTheList(arrListToDo);
}


newToDoInput.addEventListener('keypress', addTheTask);
toDoList.addEventListener('click', completeTheTask);
toDoList.addEventListener('click', removeTheTask);
clearButton.addEventListener('click', clearCompletedTasks);
filters.forEach((filter) => {
    filter.addEventListener('click', async event => {
        filters.forEach(filter=> filter.classList.remove('selected'));
       event.target.classList.add('selected');
       await filterTasks(event, `/${event.target.textContent.toLowerCase()}`);
    })
});
