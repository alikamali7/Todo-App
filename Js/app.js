const taskInput = document.getElementById("input-task");
const dateInput = document.getElementById("input-date");
const add = document.getElementById("add");
const alertMassage = document.getElementById("alert-massage")

const todos = []

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
    taskInput.value = ""
    dateInput.value = ""
    console.log(todos);
    showAlert("Todo added successfuly", "success")
  } else {
    showAlert("Please enter a todo!", "error")
  }
};
add.addEventListener("click", addHandler);
