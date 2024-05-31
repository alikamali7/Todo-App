const taskInput = document.getElementById("input-task");
const dateInput = document.getElementById("input-date");
const add = document.getElementById("add");
const edit = document.getElementById("edit-button");
const alertMassage = document.getElementById("alert-massage");
const todosBody = document.querySelector("tbody");
const deleteAllButton = document.getElementById("del-all");
const filterButtons = document.querySelectorAll(".filter-todos")

let todos = JSON.parse(localStorage.getItem("todos")) || [];

const generatedId = () => {
  return Math.round(
    Math.random() * Math.random() * Math.pow(10, 15)
  ).toString();
};

const saveToLocalStorage = () => {
  localStorage.setItem("todos", JSON.stringify(todos));
};

const showAlert = (massage, type) => {
  alertMassage.innerHTML = "";
  const alert = document.createElement("p");
  alert.innerText = massage;
  alert.classList.add("alert");
  alert.classList.add(`alert-${type}`);
  alertMassage.append(alert);

  setTimeout(() => {
    alert.style.display = "none";
  }, 2000);
};

const displayTodos = (data) => {
  // const todoList = data ? data : todos;
  const todoList = data || todos; // Like up
  todosBody.innerHTML = "";
  if (!todoList.length) {
    todosBody.innerHTML = "<tr><td colspan='4'>No Task found!</td></tr>";
    return;
  }
  todoList.forEach((todo) => {
    todosBody.innerHTML += `
      <tr>
        <td>${todo.task}</td>
        <td>${todo.date || "No Date"}</td>
        <td>${todo.completed ? "Completed" : "Pending"}</td>
        <td>
          <button onclick="editHandler('${todo.id}')">Edit</button>
          <button onclick="toggleHandler('${todo.id}')">
            ${todo.completed ? "Undo" : "Do"}
          </button>
          <button onclick="deleteHandler('${todo.id}')">Delete</button>
        </td>
      </tr>
    `;
  });
};

const addHandler = () => {
  const task = taskInput.value;
  const date = dateInput.value;
  const todo = {
    id: generatedId(),
    task: task,
    date,
    completed: false,
  };
  if (task) {
    todos.push(todo);
    saveToLocalStorage();
    displayTodos();
    taskInput.value = "";
    dateInput.value = "";
    showAlert("Todo added successfuly", "success");
  } else {
    showAlert("Please enter a todo!", "error");
  }
};

const deleteAllHandler = () => {
  if (todos.length) {
    todos = [];
    saveToLocalStorage();
    displayTodos();
    showAlert("All todo cleared successfully", "success");
  } else {
    showAlert("No todos to clear", "error");
  }
};

const deleteHandler = (id) => {
  const newTodos = todos.filter((todo) => todo.id !== id);
  todos = newTodos;
  saveToLocalStorage();
  displayTodos();
  showAlert("Todo delete successfully", "success");
};

const toggleHandler = (id) => {
  // const newTodos = todos.map((todo) => {
  //   if(todo.id === id){
  //     // return {          // Way 1
  //     //   id: todo.id,
  //     //   task: todo.task,
  //     //   date: todo.date,
  //     //   completed: !todo.completed,
  //     // };
  //     return {            // Way 2
  //       ...todo,
  //       completed: !todo.completed,
  //     }
  //   } else {
  //     return todo
  //   }
  // });
  // todos = newTodos;
  const todo = todos.find((todo) => todo.id === id)
  todo.completed = !todo.completed;
  saveToLocalStorage()
  displayTodos()
  showAlert("Todo status changed successfully", "success")
};

const editHandler = (id) => {
  const todo = todos.find(todo => todo.id === id);
  taskInput.value = todo.task;
  dateInput.value = todo.date;
  add.style.display = "none";
  edit.style.display = "inline-block";
  edit.dataset.id = id;
};

const applyEditHandler = (event) => {
  const id = event.target.dataset.id;
  const todo =  todos.find(todo => todo.id === id);
  todo.task = taskInput.value
  todo.date = dateInput.value
  taskInput.value = ""; 
  dateInput.value = "";
  add.style.display = "inline-block";
  edit.style.display = "none";
  saveToLocalStorage()
  displayTodos()
  showAlert("Todo edited successfuly", "success")
};

const filterHandler = (event) => {
  let filteredTodos = null;
  const filter = event.target.dataset.filter;

  switch (filter) {
    case "pending":
      filteredTodos = todos.filter(todo => todo.completed === false)
      break;

    case "completed":
      filteredTodos = todos.filter(todo => todo.completed === true)
      break;
  
    default:
      filteredTodos = todos;
      break;
  }
  displayTodos(filteredTodos)
}

window.addEventListener("load", displayTodos);
add.addEventListener("click", addHandler);
deleteAllButton.addEventListener("click", deleteAllHandler);
edit.addEventListener("click", applyEditHandler)
filterButtons.forEach((button) => {
  button.addEventListener("click", filterHandler)
})