let task = document.getElementById("Task");
let btn_add = document.getElementById("button-add");
let btn_del = document.getElementById(".button-del");
let tasks_holder = document.querySelector(".tasks-holder");
let checkbox = document.querySelectorAll(".completed");
let taskOfArray = [];

if (window.localStorage.getItem("tasks")) {
  taskOfArray = JSON.parse(window.localStorage.getItem("tasks"));
  addTask(taskOfArray);
}
function addTask(arrayOfTasks) {
  arrayOfTasks.forEach((element) => {
    let div_element = document.createElement("div");
    div_element.style.justifyContent = "space-between";
    div_element.style.alignItems = "center";
    div_element.style.display = "flex";
    div_element.style.padding = "0 10px";
    div_element.style.marginBottom = "10px";
    div_element.className = `div-task ${element.id}`;
    if (element.completed) {
      div_element.classList.add("complete");
      div_element.innerHTML = `
        <div id='title-task ${element.id}'>
            <h2 style='color: white;'>${element.title}</h2>
        </div>
        <div id='div-buttons ${element.id}'></div>`;
    } else {
      div_element.innerHTML = `
        <div id='title-task ${element.id}'>
            <h2 style='color: white;'>${element.title}</h2>
        </div>
        <div id='div-buttons ${element.id}'></div>`;
    }
    btn_del = document.createElement("button");
    btn_del.setAttribute("type", "button");
    btn_del.className = "button-del";
    btn_del.textContent = "Delete";
    btn_del.style.cssText =
      "background-color: red; color: white; outline: 2px solid; border: none; cursor: pointer;";
    btn_del.onclick = (e) => {
      const parent_id = e.target.parentNode.parentNode;
      console.log(parent_id);
      taskOfArray.forEach((api) => {
        if (api.id == parent_id.classList[1]) {
          const id = taskOfArray.indexOf(api);
          taskOfArray.splice(id, 1);
          window.localStorage.setItem("tasks", JSON.stringify(taskOfArray));
          parent_id.remove();
        }
      });
    };
    let checkbox = document.createElement("input");
    checkbox.type = "checkbox";
    checkbox.name = "completed";
    checkbox.className = "completing";
    if (element.completed) checkbox.checked = true;
    checkbox.onchange = (e) => {
      const parent_id = e.target.parentNode.parentNode;
      taskOfArray.forEach((api) => {
        if (api.id == parent_id.classList[1]) {
          api.completed = !api.completed;
          window.localStorage.setItem("tasks", JSON.stringify(taskOfArray));
        }
      });
      parent_id.classList.toggle("complete");
    };
    tasks_holder.appendChild(div_element);
    document.getElementById(`div-buttons ${element.id}`).appendChild(checkbox);
    document.getElementById(`div-buttons ${element.id}`).appendChild(btn_del);
  });
}

function createTask(value) {
  const date = Date.now();
  const data = {
    id: date,
    title: value,
    completed: false,
  };
  taskOfArray.push(data);
  window.localStorage.setItem("tasks", JSON.stringify(taskOfArray));
  let div_element = document.createElement("div");
  div_element.style.justifyContent = "space-between";
  div_element.style.alignItems = "center";
  div_element.style.display = "flex";
  div_element.style.padding = "0 10px";
  div_element.style.marginBottom = 100;
  div_element.className = `div-task ${date}`;
  div_element.innerHTML = `
    <div id='title-task ${date}'>
        <h2 style='color: white;'>${value}</h2>
    </div>
    <div id='div-buttons ${date}'></div>`;
  btn_del = document.createElement("button");
  btn_del.setAttribute("type", "button");
  btn_del.className = "button-del";
  btn_del.textContent = "Delete";
  btn_del.style.cssText =
    "background-color: red; color: white; outline: 2px solid; border: none; cursor: pointer;";
  btn_del.onclick = (e) => {
    const parent_id = e.target.parentNode.parentNode;
    taskOfArray.forEach((api) => {
      if (api.id == parent_id.classList[1]) {
        const id = taskOfArray.indexOf(api);
        taskOfArray.splice(id, 1);
        window.localStorage.setItem("tasks", JSON.stringify(taskOfArray));
        parent_id.remove();
      }
    });
  };
  let checkbox = document.createElement("input");
  checkbox.type = "checkbox";
  checkbox.name = "completed";
  checkbox.className = "completing";
  checkbox.onchange = (e) => {
    const parent_id = e.target.parentNode.parentNode;
    taskOfArray.forEach((api) => {
      if (api.id == parent_id.classList[1]) {
        api.completed = !api.completed;
        window.localStorage.setItem("tasks", JSON.stringify(taskOfArray));
      }
    });
    parent_id.classList.toggle("complete");
  };
  tasks_holder.appendChild(div_element);
  document.getElementById(`div-buttons ${date}`).appendChild(checkbox);
  document.getElementById(`div-buttons ${date}`).appendChild(btn_del);
}

btn_add.onclick = () => {
  if (task.value) createTask(task.value);
  task.value = "";
};
