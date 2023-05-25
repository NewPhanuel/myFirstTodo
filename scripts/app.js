// Grabbing the elements
const todoInput = document.querySelector('.todo-input');
const todoButton = document.querySelector('.todo-button');
const todoList = document.querySelector('.todo-list');
const filterOption = document.querySelector('.todo-filter');

// Functions
const addTodo = (e) => {
    e.preventDefault();

    if (todoInput.value === '') {
    } else {
        const todoDiv = document.createElement('div');
        todoDiv.classList.add('todo');

        const todoButtons = document.createElement('div');
        todoButtons.classList.add('todo-buttons');

        const newTodo = document.createElement('li');
        newTodo.classList.add('todo-item');
        newTodo.innerText = todoInput.value;
        todoDiv.appendChild(newTodo);

        const completedButton = document.createElement('button');
        completedButton.innerText = 'Check';
        completedButton.classList.add('complete-btn');
        completedButton.addEventListener('click', checkButton);
        todoButtons.appendChild(completedButton);

        const trashButton = document.createElement('button');
        trashButton.innerText = 'Trash';
        trashButton.classList.add('trash-btn');
        trashButton.addEventListener('click', removeTodo);
        todoButtons.appendChild(trashButton);

        todoInput.value = '';

        todoDiv.appendChild(todoButtons);
        todoList.appendChild(todoDiv);
    }
};

const removeTodo = (e) => {
    item = e.target;
    subparent = item.parentElement;
    if (item.classList[0] === 'trash-btn') {
        const parentElement = subparent.parentElement;
        parentElement.classList.add('fall');
        setInterval(() => parentElement.remove(), 1000);
    }
};

const checkButton = (e) => {
    const button = e.target;
    const subParent = button.parentElement;
    const parent = subParent.parentElement;

    parent.classList.add('completed');

    button.innerText = 'Completed';
    button.style.backgroundColor = '#03c103';
    button.style.color = '#fff';
};

const filterTodo = (e) => {
    const todos = todoList.childNodes;
    todos.forEach((todo) => {
        switch (e.target.value) {
            case 'all':
                todo.style.display = 'block';
                break;
            case 'completed':
                if (todo.classList.contains('completed')) {
                    todo.style.disply = 'block';
                } else {
                    todo.style.display = 'none';
                }
                break;
            case 'uncompleted':
                if (todo.classList.contains('completed')) {
                    todo.style.display = 'none';
                } else {
                    todo.style.display = 'block';
                }
                break;
        }
    });
};

// Event listeners
todoButton.addEventListener('click', addTodo);
filterOption.addEventListener('click', filterTodo);
