const taskForm = document.querySelector('#taskForm');
const taskList = document.querySelector('#todoList');
const emptyList = document.querySelector('#emptyList');
taskForm.addEventListener('submit', addTask);

function addTask(evt) {
  evt.preventDefault();
  // Create taskText variable from "value" key of the Element object
  // const { value: taskText } = taskForm.querySelector('#taskText');
  const taskInput = taskForm.querySelector('#taskText');
  const taskText = taskInput.value;
  if (taskText.trim() === '') {
    return;
  }

  const taskSelect = taskForm.querySelector('#taskCategory');
  const taskCategory = taskSelect.value.toUpperCase();

  const task = {
    id: crypto.randomUUID(),
    text: taskText,
    isCompleted: false,
    category: taskCategory,
  };
  const getCategoryBg = (category) => {
    switch (category) {
      case 'A':
        return 'list-group-item-danger';
      case 'B':
        return 'list-group-item-primary';
      case 'C':
        return 'list-group-item-success';
      case 'D':
        return 'list-group-item-warning';
    }
  };
  const taskBg = getCategoryBg(taskCategory);
  const taskClasses = task.isCompleted
    ? `list-group-item ${taskBg} d-flex gap-2 align-items-center task-done`
    : `list-group-item ${taskBg} d-flex gap-2 align-items-center`;
  const taskHTML = `
        <li id="${task.id}" class="${taskClasses}">
          ${task.text}
          <svg xmlns="http://www.w3.org/2000/svg" data-action="copy" width="10" height="10" fill="currentColor" class="bi bi-copy align-top pale" viewBox="0 0 16 16">
            <path fill-rule="evenodd" d="M4 2a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2zm2-1a1 1 0 0 0-1 1v8a1 1 0 0 0 1 1h8a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1zM2 5a1 1 0 0 0-1 1v8a1 1 0 0 0 1 1h8a1 1 0 0 0 1-1v-1h1v1a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h1v1z"/>
          </svg>
          <button data-action="done" class="ms-auto btn btn-sm btn-outline-success">
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor"
              class="bi bi-check2-square" viewBox="0 0 16 16">
              <path
                d="M3 14.5A1.5 1.5 0 0 1 1.5 13V3A1.5 1.5 0 0 1 3 1.5h8a.5.5 0 0 1 0 1H3a.5.5 0 0 0-.5.5v10a.5.5 0 0 0 .5.5h10a.5.5 0 0 0 .5-.5V8a.5.5 0 0 1 1 0v5a1.5 1.5 0 0 1-1.5 1.5H3z" />
              <path
                d="m8.354 10.354 7-7a.5.5 0 0 0-.708-.708L8 9.293 5.354 6.646a.5.5 0 1 0-.708.708l3 3a.5.5 0 0 0 .708 0z" />
            </svg>
          </button>
          <button data-action="remove" class="btn btn-sm btn-outline-danger">
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-trash3"
              viewBox="0 0 16 16">
              <path
                d="M6.5 1h3a.5.5 0 0 1 .5.5v1H6v-1a.5.5 0 0 1 .5-.5ZM11 2.5v-1A1.5 1.5 0 0 0 9.5 0h-3A1.5 1.5 0 0 0 5 1.5v1H2.506a.58.58 0 0 0-.01 0H1.5a.5.5 0 0 0 0 1h.538l.853 10.66A2 2 0 0 0 4.885 16h6.23a2 2 0 0 0 1.994-1.84l.853-10.66h.538a.5.5 0 0 0 0-1h-.995a.59.59 0 0 0-.01 0H11Zm1.958 1-.846 10.58a1 1 0 0 1-.997.92h-6.23a1 1 0 0 1-.997-.92L3.042 3.5h9.916Zm-7.487 1a.5.5 0 0 1 .528.47l.5 8.5a.5.5 0 0 1-.998.06L5 5.03a.5.5 0 0 1 .47-.53Zm5.058 0a.5.5 0 0 1 .47.53l-.5 8.5a.5.5 0 1 1-.998-.06l.5-8.5a.5.5 0 0 1 .528-.47ZM8 4.5a.5.5 0 0 1 .5.5v8.5a.5.5 0 0 1-1 0V5a.5.5 0 0 1 .5-.5Z" />
            </svg> </button>
        </li>
  `;
  taskList.insertAdjacentHTML('beforeend', taskHTML);
  if (taskList.children.length > 1) {
    emptyList.classList.add('hide');
  }
  taskInput.value = '';
  taskInput.focus();
}

taskList.addEventListener('click', toggleCompletion);
function toggleCompletion(evt) {
  if (evt.target.dataset.action !== 'done') {
    return;
  }

  const doneBtn = evt.target;
  doneBtn.classList.toggle('btn-outline-success');
  doneBtn.classList.toggle('btn-success');
  const mom = doneBtn.closest('li');
  mom.classList.toggle('task-done');
}
taskList.addEventListener('click', removeTask);
function removeTask(evt) {
  if (evt.target.dataset.action !== 'remove') {
    return;
  }

  const deleteBtn = evt.target;
  const mom = deleteBtn.closest('li');
  mom.remove();
  if (taskList.children.length === 1) {
    emptyList.classList.remove('hide');
  }
}

taskList.addEventListener('click', copyTaskValue);
function copyTaskValue(evt) {
  if (evt.target.dataset.action !== 'copy') {
    return;
  }

  const copyBtn = evt.target;
  const mom = copyBtn.closest('li');
  const momText = mom.textContent.trim();
  navigator.clipboard.writeText(momText);
  const notificationToast = document.querySelector('#liveToast');
  notificationToast.classList.add('fade');
  notificationToast.classList.add('show');
  notificationToast.classList.add('showing');
  setTimeout(() => {
    notificationToast.classList.remove('showing');
  }, 500);
  setTimeout(() => {
    notificationToast.classList.remove('show');
  }, 3000);
}
