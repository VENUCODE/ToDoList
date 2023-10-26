document.addEventListener("DOMContentLoaded", function () {
  const taskInput = document.getElementById("taskInput");
  const addTaskButton = document.getElementById("addTask");
  const taskList = document.getElementById("taskList");
  loadTasks();
  addTaskButton.addEventListener("click", addNewTask);
  taskInput.addEventListener("keydown", function (event) {
    if (event.key === "Enter") {
      addNewTask();
    }
  });

  taskList.addEventListener("click", function (event) {
    if (event.target.tagName === "BUTTON") {
      const parentLi = event.target.parentElement;
      parentLi.classList.add("slide-out");
      parentLi.addEventListener("animationend", function () {
        removeTask(parentLi);
      });
    }
  });

  function addNewTask() {
    const taskText = taskInput.value.trim();
    if (taskText !== "") {
      addTask(taskText);
      taskInput.value = "";
    }
  }

  function addTask(text) {
    const li = document.createElement("li");
    li.innerHTML = `<span>${text}</span><button>Delete</button>`;
    taskList.insertBefore(li, taskList.firstChild);
    saveTasks();
  }

  function removeTask(task) {
    task.remove();
    saveTasks();
  }

  function saveTasks() {
    const tasks = Array.from(taskList.children).map(
      (task) => task.querySelector("span").textContent
    );
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }

  function loadTasks() {
    const tasks = JSON.parse(localStorage.getItem("tasks")) || [];
    tasks.forEach(addTask);
  }
});
