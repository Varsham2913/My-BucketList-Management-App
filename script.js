document.addEventListener("DOMContentLoaded", () => {
  const taskInput = document.getElementById("new-task");
  const addTaskButton = document.getElementById("add-task");
  const taskList = document.getElementById("task-list");

  // Load tasks from localStorage
  let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
  renderTasks();

  addTaskButton.addEventListener("click", () => {
    const taskText = taskInput.value.trim();
    if (taskText !== "") {
      tasks.push({ text: taskText, completed: false });
      saveTasks();
      renderTasks();
      taskInput.value = "";
    }
  });

  taskInput.addEventListener("keyup", (event) => {
    if (event.key === "Enter") {
      addTaskButton.click();
    }
  });

  function renderTasks() {
    taskList.innerHTML = "";
    tasks.forEach((task, index) => {
      const listItem = document.createElement("li");
      listItem.innerHTML = `
                <span class="${task.completed ? "complete" : ""}">${
        task.text
      }</span>
                <button class="delete" data-index="${index}">Delete</button>
            `;
      taskList.appendChild(listItem);
    });
  }

  taskList.addEventListener("click", (event) => {
    if (event.target.classList.contains("delete")) {
      const index = event.target.dataset.index;
      tasks.splice(index, 1);
      saveTasks();
      renderTasks();
    } else if (event.target.tagName === "SPAN") {
      const taskText = event.target.textContent;
      const taskIndex = tasks.findIndex((task) => task.text === taskText);
      if (taskIndex > -1) {
        tasks[taskIndex].completed = !tasks[taskIndex].completed;
        saveTasks();
        renderTasks();
      }
    }
  });

  function saveTasks() {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }
});
