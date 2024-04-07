//? Global Variables
let filterValue = "all";
//? selecting section
const todoInput = document.querySelector(".todo-input");
const todoForm = document.querySelector(".todo-form");
const todoList = document.querySelector(".todolist");
const selectTodos = document.querySelector(".filter-todos");
const selectFilter = document.querySelector(".filter-todos");
const updateTodoBtn = document.querySelector("#update-todo");

//? codes section
todoForm.addEventListener("submit", addNewTodo);
selectTodos.addEventListener("change", (e) => {
  filterValue = e.target.value;
  filterTodos();
});
document.addEventListener("DOMContentLoaded", (e) => {
  const todos = getAllTodos();
  createTodos(todos);
});
updateTodoBtn.addEventListener("click", updateTodo);
todoForm.addEventListener("submit", addNewTodo);
selectFilter.addEventListener("change", (e) => {
  filterValue = e.target.value;
  filterTodos();
});

//? functions
function addNewTodo(e) {
  e.preventDefault();
  if (!todoInput.value) return alert("لطفا نام فعالیت را وارد کنید!");
  const newTodo = {
    id: Date.now(),
    createdAt: new Date().toISOString(),
    title: todoInput.value,
    isCompleted: false,
  };

  saveTodo(newTodo);
  filterTodos();
}
function createTodos(todos) {
  let result = "";
  todos.forEach((todo) => {
    result += `<li class="todo">
          <p class="todo__title ${todo.isCompleted && "completed"}">${
      todo.title
    }</p>
          <span class="todo__createdAt ${
            todo.isCompleted && "completed"
          }"> ${new Date(todo.createdAt).toLocaleDateString("fa-ir")}</span>
          <div class="todo__action"> 
            <button class="todo__check ${todo.isCompleted && "completed"}"
            }" data-todo-id= ${
              todo.id
            }><i class="todo__check far fa-check-square"></i></button>
            <button onclick="openEditForm(event)" id="open-modal" class="todo__edit" data-todo-id = ${
              todo.id
            }><i class="fas fa-edit"></i></button>
            <button class="todo__remove" data-todo-id = ${
              todo.id
            }><i class="fas fa-trash-alt"></i></button>
          </div>
        </li>`;
  });
  todoList.innerHTML = result;
  todoInput.value = "";

  const removeBtns = [...document.querySelectorAll(".todo__remove")];
  removeBtns.forEach((btn) => btn.addEventListener("click", removeTodo));
  const checkBtns = [...document.querySelectorAll(".todo__check")];
  checkBtns.forEach((btn) => btn.addEventListener("click", doneTodo));
}
function filterTodos() {
  const todos = getAllTodos();
  switch (filterValue) {
    case "all": {
      createTodos(todos);
      break;
    }
    case "completed": {
      const filteredTodos = todos.filter((t) => t.isCompleted);
      createTodos(filteredTodos);
      break;
    }
    case "uncompleted": {
      const filteredTodos = todos.filter((t) => !t.isCompleted);
      createTodos(filteredTodos);
      break;
    }

    default:
      createTodos(todos);
      break;
  }
}
function removeTodo(e) {
  let todos = getAllTodos();
  const todoId = Number(e.target.dataset.todoId);
  todos = todos.filter((t) => t.id !== todoId);
  saveAllTodos(todos);
  filterTodos();
  //   console.log(e.target.dataset.todoId);
}
function doneTodo(e) {
  const todos = getAllTodos();
  const todoId = Number(e.target.dataset.todoId);
  const todo = todos.find((t) => t.id === todoId);
  todo.isCompleted = !todo.isCompleted;
  saveAllTodos(todos);
  filterTodos();
  //   console.log(e.target);
}
function getAllTodos() {
  const savedTodos = JSON.parse(localStorage.getItem("todos")) || [];
  return savedTodos;
}
function saveTodo(todo) {
  const savedTodos = getAllTodos();
  savedTodos.push(todo);
  localStorage.setItem("todos", JSON.stringify(savedTodos));
  return savedTodos;
}
function saveAllTodos(todos) {
  localStorage.setItem("todos", JSON.stringify(todos));
}
function findOneTodo(id) {
  const todos = getAllTodos();
  const todo = todos.find((t) => t.id === id);
  return todo;
}
let todoToEditId;
const editTodoInput = document.querySelector("#edit-todo");

function openEditForm(e) {
  todoToEditId = Number(e.target.dataset.todoId);
  const todoToEdit = findOneTodo(todoToEditId);
  editTodoInput.value = todoToEdit.title;
  openModal();
}

function updateTodo(e) {
  const todos = getAllTodos();
  const todo = todos.find((t) => t.id === todoToEditId);
  todo.title = editTodoInput.value;
  saveAllTodos(todos);
  filterTodos();
}

/* ####      #####  ------------------------------------------- */
/* ## ##     ## ##              *    *  By: Moji                */
/* ##  ##   ##  ##  ######  ###### ##  S.Mojtaba Sadatpour      */
/* ##   ## ##   ##  ##  ##    ##   ##  sadatpour.web@gmail.com  */
/* ##    ###    ##  ##  ##    ##   ##  Git:Sadatpour            */
/* ##    ###    ##  ######  ####   ##  www.sadatpour.com        */
/* ------------------------------------------------------------ */
