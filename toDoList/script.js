"use strict";

const input = document.querySelector("input");
const taskContainer = document.querySelector("#task-container");
const task = document.querySelectorAll(".task");
const message = document.querySelector("#message");
const tasks = { activeTasks: 0 };
const addMessage = function () {
  if (tasks.activeTasks == 0) {
    message.textContent = "Jeni i lirë gjithë ditën 😀";
  } else {
    message.textContent = "";
  }
};
addMessage();
document.addEventListener("keydown", function (e) {
  if (
    e.key === "Enter" &&
    input.value.trim() != "" &&
    input.value.length >= 3
  ) {
    //create task
    const newTask = document.createElement("div");
    newTask.classList.add("task");
    newTask.title =
      "Kliko për t'a perfunduar detyrën / Kliko 2 herë per t'a ribërë";
    newTask.textContent = input.value;
    taskContainer.prepend(newTask);

    //create x button
    const spanDelete = document.createElement("span");
    spanDelete.classList.add("x-button");
    spanDelete.textContent = "✕";
    spanDelete.title = "Kliko per t'a fshirë detyrën";
    newTask.append(spanDelete);

    tasks["activeTasks"] = tasks["activeTasks"] + 1;
    input.value = "";
    addMessage();
  }
});

document.addEventListener("click", function (e) {
  if (e.target && e.target.classList == "x-button") {
    //   console.log(e.target);
    // e.target.classList.add("hidden");
    const parentDiv = e.target.parentElement;

    if (tasks.activeTasks != 0 && parentDiv.classList[1] != "completed") {
      tasks["activeTasks"] = tasks["activeTasks"] - 1;
    }
    // parentDiv.classList.add("hidden");
    parentDiv.remove();

    addMessage();
    // console.log(e.target.parentElement);
    // console.log(e.target);
  }
});

document.addEventListener("click", function (e) {
  if (e.target && e.target.classList == "task") {
    const task = e.target;
    task.classList.add("completed");

    if (tasks.activeTasks != 0) {
      tasks["activeTasks"] = tasks["activeTasks"] - 1;
    }

    // console.log(e.target);
    addMessage();
  }
});
document.addEventListener("dblclick", function (e) {
  if (e.target && e.target.classList[1] == "completed") {
    const task = e.target;
    task.classList.remove("completed");
    tasks["activeTasks"] = tasks["activeTasks"] + 1;

    // console.log(e.target);
    addMessage();
  }
});
