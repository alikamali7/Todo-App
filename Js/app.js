const taskInput = document.getElementById("input-task");
const dateInput = document.getElementById("input-date");
const add = document.getElementById("add");
const alertMassage = document.getElementById("alert-massage")
const todosBody = document.querySelector("tbody")

const todos = JSON.parse(localStorage.getItem("todos")) || [] ;

const generatedId =() => {
    return  Math.round(Math.random() * Math.random() * Math.pow(10, 15)).toString();
};


const showAlert = (massage, type) => {
    alertMassage.innerHTML = ""
    const alert = document.createElement("p")
    alert.innerText = massage;
    alert.classList.add("alert");
    alert.classList.add(`alert-${type}`);
    alertMassage.append(alert)

    setTimeout(() => {
        alert.style.display = "none"
    }, 2000)
}

const displayTodos = () => {
  todosBody.innerHTML =""
  if(!todos.length) {
    todosBody.innerHTML = "<tr><td colspan='4'>No Task found!</td></tr>"
    return;
  }
  todos.forEach(todo => {
    todosBody.innerHTML += `
      <tr>
        <td>${todo.task}</td>
        <td>${todo.date || "No Date"}</td>
        <td>${todo.completed ? "Completed" : "Pending"}</td>
        <td>
          <button>Edit</button>
          <button>Do</button>
          <button>Delete</button>
        </td>
      </tr>
    `
  });
}

const addHandler = () => {
  const task = taskInput.value;
  const date = dateInput.value;
  const todo = {
    id: generatedId(),
    task: task,
    date,
    completed: false
  };
  if (task) {
    todos.push(todo);
    localStorage.setItem("todos", JSON.stringify(todos));
    displayTodos()
    taskInput.value = ""
    dateInput.value = ""
    console.log(todos);
    showAlert("Todo added successfuly", "success")
  } else {
    showAlert("Please enter a todo!", "error")
  }
};
add.addEventListener("click", addHandler);
