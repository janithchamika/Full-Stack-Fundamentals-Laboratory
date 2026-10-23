
const taskInput = document.getElementById('taskInput');
const addTaskBtn = document.getElementById('addTaskBtn');
const errorMsg = document.getElementById('errorMsg');
const taskList = document.getElementById('taskList');
const taskCounter = document.getElementById('taskCounter');
const filterRadios = document.querySelectorAll('input[name="filter"]');
const clearCompletedBtn = document.getElementById('clearCompletedBtn');


let tasks = JSON.parse(localStorage.getItem('tasks')) || [];
let currentFilter = 'all';


renderTasks();


addTaskBtn.addEventListener('click', addTask);
taskInput.addEventListener('keypress', function(e) {
    if (e.key === 'Enter') addTask();
});

function addTask() {
    const taskText = taskInput.value.trim();
    
    
    if (taskText === '') {
        errorMsg.classList.remove('d-none');
        return;
    }
    errorMsg.classList.add('d-none');

  
    const newTask = {
        id: Date.now(),
        text: taskText,
        completed: false
    };

    tasks.push(newTask);
    taskInput.value = '';
    renderTasks();
}

function renderTasks() {
    
    localStorage.setItem('tasks', JSON.stringify(tasks));

   
    let filteredTasks = tasks;
    if (currentFilter === 'active') {
        filteredTasks = tasks.filter(task => !task.completed);
    } else if (currentFilter === 'completed') {
        filteredTasks = tasks.filter(task => task.completed);
    }

  
    taskList.innerHTML = '';

    if (filteredTasks.length === 0) {
        taskList.innerHTML = `<li class="list-group-item text-center text-muted border-0 mt-3">No tasks found.</li>`;
    }


    filteredTasks.forEach(task => {
        const li = document.createElement('li');
        li.className = `list-group-item ${task.completed ? 'task-completed bg-light' : ''}`;
        
        // Checkbox (Task 4)
        const checkbox = document.createElement('input');
        checkbox.type = 'checkbox';
        checkbox.className = 'form-check-input';
        checkbox.checked = task.completed;
        checkbox.addEventListener('change', () => toggleTask(task.id));

        // Task Text
        const span = document.createElement('span');
        span.className = 'task-text flex-grow-1 ms-3 text-break';
        span.textContent = task.text;

        // Delete Button (Task 5)
        const delBtn = document.createElement('button');
        delBtn.className = 'btn btn-danger btn-sm';
        delBtn.textContent = 'Delete';
        delBtn.addEventListener('click', () => deleteTask(task.id));

        li.appendChild(checkbox);
        li.appendChild(span);
        li.appendChild(delBtn);
        taskList.appendChild(li);
    });

    // Task 8: Incomplete tasks ගාණ පෙන්නන්න
    const activeCount = tasks.filter(task => !task.completed).length;
    taskCounter.textContent = `${activeCount} remaining`;
}

// 5. Task එක Complete/Active කිරීම (Task 4)
function toggleTask(id) {
    tasks = tasks.map(task => 
        task.id === id ? { ...task, completed: !task.completed } : task
    );
    renderTasks();
}

// 6. Task එකක් මකා දැමීම (Task 5)
function deleteTask(id) {
    tasks = tasks.filter(task => task.id !== id);
    renderTasks();
}

// 7. Filter Radio Buttons වල වෙනසක් වෙද්දි
filterRadios.forEach(radio => {
    radio.addEventListener('change', (e) => {
        currentFilter = e.target.value;
        renderTasks();
    });
});

// 8. Completed Tasks ඔක්කොම මකා දැමීම (Task 8)
clearCompletedBtn.addEventListener('click', () => {
    tasks = tasks.filter(task => !task.completed);
    renderTasks();
});