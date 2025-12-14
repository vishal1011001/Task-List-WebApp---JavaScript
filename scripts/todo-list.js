const t_init = localStorage.getItem('tasks');
let tasks = t_init ? JSON.parse(t_init) : [];
renderTasks();

document.querySelector('.js-add-button').addEventListener('click', () => {
  const input = document.querySelector('.js-input-bar');
  const val = input.value;
  const dueDate = (document.querySelector('.js-due-date-input')).value;
  if(input.value.trim() !== '') {
    tasks.push({
      val,
      dueDate
    });
    input.value = ``;
    document.querySelector('.js-due-date-input').value = ``;
    
    renderTasks();
  }

});

function renderTasks() {
  const taskListElem = document.querySelector('.js-show-task-div');
    taskListElem.innerHTML = '';
  
    tasks.forEach((task,index) => {
      taskListElem.innerHTML += `
      <div class="task-div">
        <div class="task-name-div">
          <p class="task">${task.val}</p>
        </div>
        <div class="due-date-div">
          <p class="date">${task.dueDate}</p>
        </div>
        <div class="task-button-div">
          <button class="delete-button js-delete-button" data-index="${index}"        >Delete</button>
          <!-- <button class="done-button js-done-button">DONE</button> -->
        </div>
      </div>  
      `;
    }
  );
  localStorage.setItem('tasks', JSON.stringify(tasks));
}

document.querySelector('.js-show-task-div').addEventListener('click', (event) => {
  if(event.target.classList.contains('js-delete-button')) {
    const index = event.target.getAttribute('data-index');
    tasks.splice(index,1);
    renderTasks();
  }
});