document.getElementById('formTask').addEventListener('submit', saveTask);

function saveTask(e) {
    let title = document.getElementById('title').value;
    let description = document.getElementById('description').value;
    let date = document.getElementById('date').value;
    console.log(description);

    if (localStorage.getItem('id') === null) {
        var ids = 0;
        localStorage.setItem('id', ids.toString());
    } else if (localStorage.getItem('id') == 0) {
        var ids = 1;
        localStorage.setItem('id', ids.toString());
    } else {
        var ids = (parseInt(localStorage.getItem('id')) + 1);
        localStorage.setItem('id', ids);
    }

    let idValue = ids;

    let task = {
        idValue,
        title,
        description,
        date
    };

    if (localStorage.getItem('tasks') === null) {
        let tasks = [];
        tasks.push(task);
        localStorage.setItem('tasks', JSON.stringify(tasks));
    } else {
        let tasks = JSON.parse(localStorage.getItem('tasks'));
        tasks.push(task);
        localStorage.setItem('tasks', JSON.stringify(tasks));
    }

    getTasks();
    document.getElementById('formTask').reset();
    e.preventDefault();
}


function deleteTask(idValue) {
    let tasks = JSON.parse(localStorage.getItem('tasks'));
    for (let i = 0; i < tasks.length; i++) {
        if (tasks[i].idValue == idValue) {
            tasks.splice(i, 1);
        }
    }

    localStorage.setItem('tasks', JSON.stringify(tasks));
    getTasks();
}

function getTasks() {
    let tasks = JSON.parse(localStorage.getItem('tasks'));
    let tasksView = document.getElementById('tasks');
    tasksView.innerHTML = '';
    for (let i = 0; i < tasks.length; i++) {
        let title = tasks[i].title;
        let description = tasks[i].description;
        let datetasks = tasks[i].date;
        let idValue = tasks[i].idValue

        tasksView.innerHTML += `<div class="card mb-3">
        <div class="card-body">
            <p>${title} - ${description} - ${datetasks}
            <a href="#" onclick="deleteTask('${idValue}')" class="btn btn-danger ml-5">Eliminar</a>
            </p>
            </div>
        </div>`;
    }
}

getTasks();