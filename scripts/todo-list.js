const t_init = localStorage.getItem('tasks');
let tasks = t_init ? JSON.parse(t_init) : [];
renderTasks();

function saveTask() {
  const input = document.querySelector('.js-input-bar');
  const val = input.value;
  const dueDate = (document.querySelector('.js-due-date-input')).value;
  const isDone = false;
  
  if (input.value.trim() !== '') {
    tasks.push({
      val,
      dueDate,
      isDone
    });
    input.value = ``;
    document.querySelector('.js-due-date-input').value = ``;

    renderTasks();
  }
}


document.querySelector('.js-add-button').addEventListener('click', () => {
  saveTask();
});

document.querySelector('.js-input-bar').addEventListener('keydown', (event) => {
  if (event.key === 'Enter') saveTask();
});


function renderTasks() {
  const taskListElem = document.querySelector('.js-show-task-div');
  taskListElem.innerHTML = '';

  tasks.forEach((task, index) => {
    taskListElem.innerHTML += `
      <div class="task-div">
        <div class="task-name-div">
          <p class="task ${task.isDone ? 'done' : 'not-done'}">${task.val}</p>
        </div>
        <div class="due-date-div">
          <p class="date">${task.dueDate}</p>
        </div>
        <div class="task-button-div">
          <button class="done-button js-done-button" data-index="${index}">Done</button>
          <button class="delete-button js-delete-button" data-index="${index}" >Delete</button>
        </div>
      </div>  
      `;
  }
  );
  localStorage.setItem('tasks', JSON.stringify(tasks));
}

document.querySelector('.js-show-task-div').addEventListener('click', (event) => {
  if (event.target.classList.contains('js-delete-button')) {
    const index = event.target.getAttribute('data-index');
    tasks.splice(index, 1);
    renderTasks();
  } 
  else if (event.target.classList.contains('js-done-button')) {
    const index = event.target.getAttribute('data-index');
    const elem = tasks[index];
    elem.isDone = true;
    console.log(elem, "Done");
    renderTasks();
  }
});