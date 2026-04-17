const form = document.getElementsByName("add")[0];
const formdata = new FormData(form);
const formText = document.getElementsByName("todoText")[0];
const todoDone = document.getElementsByClassName("DoneCont")[0];
const todoNotDone = document.getElementsByClassName("notDoneCont")[0];
const inProgress = document.getElementsByClassName("inProgressCont")[0];

const contNotDoneText = document.getElementsByClassName("contNotDoneText")[0];
const ProgressText = document.getElementsByClassName("ProgressText")[0];
const contDoneText = document.getElementsByClassName("contDoneText")[0];

let todos = [];

init();

function init() {
  todoNotDone.innerHTML = "";
  todoDone.innerHTML = "";
  inProgress.innerHTML = "";

  initList = JSON.parse(localStorage.getItem("todos", todos));
  if (initList) {
    todos = initList;
  } else {
    todos = [];
  }

  todos.forEach((Element, idx) => {
    display(Element.text, Element.status, idx);
  });
  counter();
}
function update() {
  todoNotDone.innerHTML = "";
  todoDone.innerHTML = "";
  inProgress.innerHTML = "";

  localStorage.setItem("todos", JSON.stringify(todos));
  init();
}
function display(text, status, index) {
  const todo = document.createElement("div");
  todo.setAttribute("class", "todo");
  todo.setAttribute("draggable", "true");

  const todoText = document.createElement("p");
  todoText.textContent = text;
  todoText.setAttribute("class", "todoText");

  const select = document.createElement("select");
  select.setAttribute("class", "todoStatus");

  const notdone = document.createElement("option");
  notdone.textContent = "Не завершено";
  notdone.value = 0;

  const progress = document.createElement("option");
  progress.textContent = "в процессе";
  progress.value = 1;

  const done = document.createElement("option");
  done.textContent = "завершено";
  done.value = 2;
  const delBtn = document.createElement("button");

  delBtn.setAttribute("class", "delBtn");
  const delImg = document.createElement("img");
  delImg.setAttribute("src", "content/icons/delete.png");
  delBtn.appendChild(delImg);
  todo.appendChild(delBtn);

  select.addEventListener("change", () => {
    console.log();
    todos[index] = { text: text, status: parseInt(select.value) };
    update();
  });

  delBtn.addEventListener("click", () => {
    console.log();

    todos.splice(index, 1);

    update();
  });

  select.appendChild(notdone);
  select.appendChild(progress);
  select.appendChild(done);

  todo.appendChild(todoText);

  todo.appendChild(select);

  select.value = status;

  if (status == 0) {
    todoNotDone.appendChild(todo);
  } else if (status == 1) {
    inProgress.appendChild(todo);
  } else if (status == 2) {
    todoDone.appendChild(todo);
  }
}

function counter() {
  let countDone = 0;
  let countProgress = 0;
  let countNotDone = 0;

  todos.forEach((Element) => {
    if (Element.status == 0) {
      countNotDone = countNotDone + 1;
    }

    if (Element.status == 1) {
      countProgress = countProgress + 1;
    }

    if (Element.status == 2) {
      countDone = countDone + 1;
    }
  });

  contNotDoneText.textContent = `Не завершенных: ${countNotDone}`;
  contDoneText.textContent = `Завершенных: ${countDone}`;
  ProgressText.textContent = `В процессе: ${countProgress}`;
}

function add() {
  const todoTextnew = formText.value;

  todos.push({
    text: todoTextnew,

    status: 0,
  });

  console.log(todos);
  formText.value = "";
  update();
}

form.addEventListener("submit", (e) => {
  e.preventDefault();
  add();
});
