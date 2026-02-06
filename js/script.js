// Array untuk menyimpan semua todo
let todos = [];

// Menyimpan filter yang sedang aktif
let currentFilter = 'all';

// Mengambil elemen dari HTML
const form = document.getElementById('todo-form');
const input = document.getElementById('todo-input');
const dateInput = document.getElementById('todo-date');
const list = document.getElementById('todo-list');

// Event ketika form disubmit (Add Todo)
form.addEventListener('submit', function (e) {
    e.preventDefault();

    const todoText = input.value;
    const todoDate = dateInput.value;

    // Membuat object todo baru
    const newTodo = {
        text: todoText,
        date: todoDate,
        completed: false
    };

    // Menambahkan ke array
    todos.push(newTodo);

    // 🔍 TAMPILKAN DATA KE CONSOLE
    console.log("Todo ditambahkan:", newTodo);
    console.log("Semua todo:", todos);

    // Reset input
    input.value = '';
    dateInput.value = '';

    renderTodos();
});

// Fungsi untuk menampilkan todo
function renderTodos(filter = currentFilter) {
    currentFilter = filter;
    list.innerHTML = '';

    let filteredTodos = todos;

    // Filter todo
    if (filter === 'active') {
        filteredTodos = todos.filter(todo => !todo.completed);
    } else if (filter === 'completed') {
        filteredTodos = todos.filter(todo => todo.completed);
    }

    // Jika kosong
    if (filteredTodos.length === 0) {
        list.innerHTML = `<li class="text-pink-100 italic">No todos available</li>`;
        return;
    }

    filteredTodos.forEach((todo, index) => {
        const li = document.createElement('li');
        li.className =
            "flex justify-between items-center bg-pink-400 text-white p-2 rounded";

        li.innerHTML = `
            <div>
                <p class="${todo.completed ? 'line-through opacity-70' : ''}">
                    ${todo.text}
                </p>
                <small>${todo.date || ''}</small>
            </div>

            <div class="flex gap-2">
                <button onclick="toggleTodo(${index})">✔</button>
                <button onclick="deleteTodo(${index})">🗑</button>
            </div>
        `;

        list.appendChild(li);
    });
}

// Mengubah status todo
function toggleTodo(index) {
    todos[index].completed = !todos[index].completed;

    // 🔍 Console untuk cek toggle
    console.log("Todo diubah:", todos[index]);

    renderTodos();
}

// Menghapus todo
function deleteTodo(index) {
    console.log("Todo dihapus:", todos[index]);

    todos.splice(index, 1);

    console.log("Sisa todo:", todos);

    renderTodos();
}

// Menampilkan kondisi awal
renderTodos();
