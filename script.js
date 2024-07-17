document.addEventListener('DOMContentLoaded', () => {
    // DOM elements
    const addBtn = document.getElementById('add-btn');
    const filterBtn = document.getElementById('filter-btn');
    const deleteAllBtn = document.getElementById('delete-all-btn');
    const alertBox = document.getElementById('alert');
    const dropdown = document.getElementById('dropdown');
    const todoList = document.getElementById('todo-list');
    const container = document.getElementById('container');

    // Array to store todos
    let todos = [];

    // Event listeners setup
    addBtn.addEventListener('click', addTodo);
    filterBtn.addEventListener('click', toggleDropdown);
    deleteAllBtn.addEventListener('click', deleteAllTodos);

    // Event listener for dropdown filter options
    document.querySelectorAll('#dropdown button').forEach(button => {
        button.addEventListener('click', (event) => {
            const filter = event.target.getAttribute('data-filter');
            filterTodos(filter);
        });
    });

    // Function to add a new todo
    function addTodo() {
        const todoInput = document.getElementById('todo-input');
        const todoDate = document.getElementById('todo-date');
        const task = todoInput.value;
        const date = todoDate.value;

        if (!task || !date) {
            showAlert('Please enter a task and a due date', 'error');
            return;
        }

        const todo = { task, date, status: 'pending' };
        todos.push(todo);
        renderTodos(todos);
        showAlert('Task added successfully', 'success');
        clearInputs();
    }

    // Function to show alerts
    function showAlert(message, type) {
        alertBox.textContent = message;
        alertBox.className = `alert ${type}`;
        alertBox.style.display = 'block';
        container.classList.add('enlarged');

        setTimeout(() => {
            alertBox.style.opacity = '0';
            setTimeout(() => {
                alertBox.style.display = 'none';
                alertBox.style.opacity = '1';
                container.classList.remove('enlarged');
            }, 500);
        }, 2000);
    }

    // Function to toggle dropdown visibility
    function toggleDropdown() {
        dropdown.style.display = dropdown.style.display === 'block' ? 'none' : 'block';
    }

    // Function to filter todos based on status (all, pending, complete)
    function filterTodos(status) {
        const filteredTodos = status === 'all' ? todos : todos.filter(todo => todo.status === status);
        renderTodos(filteredTodos);
        dropdown.style.display = 'none';
    }

    // Function to delete all todos
    function deleteAllTodos() {
        todos = [];
        renderTodos(todos);
        showAlert('All tasks deleted', 'info');
    }

    // Function to render todos in the UI
    function renderTodos(todos) {
        todoList.innerHTML = '';
        todos.forEach((todo, index) => {
            const row = document.createElement('tr');
            row.innerHTML = `
                <td>${todo.task}</td>
                <td>${todo.date}</td>
                <td>${todo.status}</td>
                <td class="actions">
                    <button class="edit-btn" onclick="editTodo(${index})">✏️</button>
                    <button class="complete-btn" onclick="completeTodo(${index})">✔️</button>
                    <button class="delete-btn" onclick="deleteTodo(${index})">🗑️</button>
                </td>
            `;
            todoList.appendChild(row);
        });
    }

    // Function to clear input fields after adding a todo
    function clearInputs() {
        document.getElementById('todo-input').value = '';
        document.getElementById('todo-date').value = '';
    }

    // Function to edit a todo
    window.editTodo = function(index) {
        const newTask = prompt('Edit task:', todos[index].task);
        const newDate = prompt('Edit due date:', todos[index].date);
        if (newTask !== null && newDate !== null) {
            todos[index].task = newTask;
            todos[index].date = newDate;
            renderTodos(todos);
        }
    };

    // Function to mark a todo as complete
    window.completeTodo = function(index) {
        todos[index].status = 'complete';
        renderTodos(todos);
    };

    // Function to delete a todo
    window.deleteTodo = function(index) {
        todos.splice(index, 1);
        renderTodos(todos);
        showAlert('Task deleted', 'info');
    };
});
