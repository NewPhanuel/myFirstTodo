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
        saveLocalTodos(todoInput.value);

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
    const parentElement = subparent.parentElement;

    if (item.classList[0] === 'trash-btn') {
        parentElement.classList.add('fall');
        removeLocalTodos(parentElement);
        setInterval(() => parentElement.remove(), 1000);
    }
};

const checkButton = (e) => {
    let checked;

    localStorage.getItem('checked') === null
        ? (checked = [])
        : (checked = JSON.parse(localStorage.getItem('checked')));

    const button = e.target;
    const parent = button.parentElement.parentElement;

    if (button.innerText === 'Completed') {
        parent.classList.remove('completed');
        parent.children[0].classList.remove('strike');

        let deletedTodo = parent.children[0].innerText;
        checked.splice(checked.indexOf(deletedTodo), 1);
        localStorage.setItem('checked', JSON.stringify(checked));

        button.innerText = 'Check';
        button.style.backgroundColor = '#fff';
        button.style.color = '#28b5e3';
        button.style.transition = '0.5s';
    } else {
        parent.classList.add('completed');
        parent.children[0].classList.add('strike');

        checked.push(parent.children[0].innerText);
        localStorage.setItem('checked', JSON.stringify(checked));

        button.innerText = 'Completed';
        button.style.backgroundColor = '#03c103';
        button.style.color = '#fff';
    }
};

// const rememberCheckedTodos = (todo) => {
//     let checked;

//     localStorage.getItem('checked') === null
//         ? (checked = [])
//         : (checked = JSON.parse(localStorage.getItem('checked')));

//     checked.push(todo.children[0].innerText);
//     localStorage.setItem('checked', JSON.stringify(checked));
// };

const filterTodo = (e) => {
    const todos = todoList.childNodes;
    todos.forEach((todo) => {
        switch (e.target.value) {
            case 'all':
                todo.style.display = 'block';
                break;
            case 'completed':
                todo.style.display = 'block';
                todo.classList.contains('completed')
                    ? (todo.style.disply = 'block')
                    : (todo.style.display = 'none');
                break;
            case 'uncompleted':
                !todo.classList.contains('completed')
                    ? (todo.style.display = 'block')
                    : (todo.style.display = 'none');
                break;
        }
    });
};

const saveLocalTodos = (todo) => {
    let todos;

    localStorage.getItem('todos') === null
        ? (todos = [])
        : (todos = JSON.parse(localStorage.getItem('todos')));

    todos.push(todo);
    localStorage.setItem('todos', JSON.stringify(todos));
};

const getLocalTodos = () => {
    let todos;

    localStorage.getItem('todos') === null
        ? (todos = [])
        : (todos = JSON.parse(localStorage.getItem('todos')));

    todos.forEach((todo) => {
        let checked;

        localStorage.getItem('checked') === null
            ? (checked = [])
            : (checked = JSON.parse(localStorage.getItem('checked')));

        const todoDiv = document.createElement('div');
        todoDiv.classList.add('todo');

        const todoButtons = document.createElement('div');
        todoButtons.classList.add('todo-buttons');

        const newTodo = document.createElement('li');
        newTodo.classList.add('todo-item');
        newTodo.innerText = todo;
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

        checked.forEach((check) => {
            if (newTodo.innerText === check) {
                newTodo.classList.add('strike');
                todoDiv.classList.add('completed');

                completedButton.innerText = 'Completed';
                completedButton.style.backgroundColor = '#03c103';
                completedButton.style.color = '#fff';
            }
        });

        todoDiv.appendChild(todoButtons);
        todoList.appendChild(todoDiv);
    });
};

const removeLocalTodos = (todo) => {
    let checked;

    localStorage.getItem('checked') === null
        ? (checked = [])
        : (checked = JSON.parse(localStorage.getItem('checked')));

    let todos;

    localStorage.getItem('todos') === null
        ? (todos = [])
        : (todos = JSON.parse(localStorage.getItem('todos')));

    let deletedTodo = todo.children[0].innerText;
    todos.splice(todos.indexOf(deletedTodo), 1);
    checked.splice(checked.indexOf(deletedTodo), 1);

    localStorage.setItem('todos', JSON.stringify(todos));
    localStorage.setItem('checked', JSON.stringify(checked));
};

// Event listeners
todoButton.addEventListener('click', addTodo);
filterOption.addEventListener('click', filterTodo);
document.addEventListener('DOMContentLoaded', getLocalTodos);
