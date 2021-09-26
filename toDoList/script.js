"use strict";

const input = document.querySelector("input");
const taskContainer = document.querySelector("#task-container");

const message = document.querySelector("#message");

class Task {
  date = new Date();
  id = (Date.now() + "").slice(-5);
  completed = false;
  constructor(text) {
    this.description = text;
  }
}

class App {
  #tasks = [];
  constructor() {
    this._getItemStorage();
    this._setMessage();
    document.addEventListener("keydown", this._newTask.bind(this));
    taskContainer.addEventListener("click", this._deleteTask.bind(this));
    taskContainer.addEventListener("click", this._completeTask.bind(this));
  }
  _newTask(e) {
    if (e.key !== "Enter" || input.value.length < 3) {
      return;
    }
    const task = input.value;
    const newTask = new Task(task);
    this.#tasks.push(newTask);
    this._displayTask(newTask);
    this._setItemStorage();
    this._setMessage();
  }
  _displayTask(task) {
    const html = ` <div class="task ${
      task.completed == true ? "completed" : ""
    }" data-id='${task.id}'>
    ${task.description}
    <span class="x-button">&#10005;</span>
  </div>`;
    taskContainer.insertAdjacentHTML("afterbegin", html);
    this._clearInput();
  }
  _clearInput() {
    input.value = "";
    input.focus();
  }

  _deleteTask(e) {
    if (e.target.classList.contains("x-button")) {
      const task = e.target.closest(".task");
      console.log(task.dataset.id);
      const taskID = this.#tasks.findIndex((taskIndex) => {
        return taskIndex.id == task.dataset.id;
      });
      this.#tasks.splice(taskID, 1);

      task.classList.add("hidden");
      this._setItemStorage();
      this._setMessage();
    }
  }

  _completeTask(e) {
    if (e.target.classList.contains("task")) {
      const taskEl = e.target;

      const taskObj = this.#tasks.find((task) => task.id == taskEl.dataset.id);
      if (taskObj.completed == true) {
        taskObj.completed = false;
      } else {
        taskObj.completed = true;
      }
      taskEl.classList.toggle("completed");
      this._setItemStorage();
      this._setMessage();
    }
  }
  _setMessage() {
    let uncompletedTasks = 0;
    if (this.#tasks.length == 0) {
      message.textContent = "Jeni i lirë tërë ditën 😊";
    } else {
      this.#tasks.forEach((task) => {
        if (task.completed == false) uncompletedTasks++;
      });
      if (uncompletedTasks != 0) {
        message.textContent = `${uncompletedTasks} detyra të mbetura 😢`;
      } else {
        message.textContent = "Jeni i lirë tërë ditën 😊";
      }
    }
  }
  _setItemStorage() {
    sessionStorage.setItem("tasks", JSON.stringify(this.#tasks));
  }
  _getItemStorage() {
    const data = JSON.parse(sessionStorage.getItem("tasks"));
    if (!data) return;

    this.#tasks = data;
    this.#tasks.forEach((task) => {
      this._displayTask(task);
    });
  }
}

const app = new App();
