"use strict";
const boxes = document.querySelectorAll("#box");
const turns = document.querySelector(".turns");
const reset = document.querySelector(".reset");
const lightMode = document.querySelector(".light");
const darkMode = document.querySelector(".dark");
let player, scores, playing, initialPlayer; //initial player per te ditur kush ka luajur ne fillim kurse player kush luan aktualisht

const init = function () {
  // console.log(player);
  if (player === "undefined") {
    player = 0;
    initialPlayer = 0;
    // console.log(initialPlayer);
  } else {
    player = initialPlayer === 0 ? 1 : 0;
    initialPlayer = player;
  }
  turns.textContent = `Rradha e ${player === 0 ? "X" : "O"}`;
  playing = true;
  scores = {};
  reset.classList.add("hidden");
  for (let i = 0; i < boxes.length; i++) {
    document.querySelector(`.box--${i}`).style.pointerEvents = "auto";
    document.querySelector(`.box--${i}`).textContent = "";
  }
};
const checkWin = function (x, y, z) {
  if (
    scores[x] === scores[y] &&
    scores[y] == scores[z] &&
    scores[x] != null &&
    scores[y] != null &&
    scores[z] != null
  ) {
    // console.log(typeof scores[0]);
    turns.textContent = `${scores[x]} fitoi!`;

    playing = false;
    reset.classList.remove("hidden");
  }
};
const checkWinner = function () {
  checkWin(0, 1, 2);
  checkWin(3, 4, 5);
  checkWin(6, 7, 8);
  checkWin(0, 3, 6);
  checkWin(1, 4, 7);
  checkWin(2, 5, 8);
  checkWin(0, 4, 8);
  checkWin(2, 4, 6);

  if (Object.keys(scores).length == 9 && playing == true) {
    turns.textContent = `Barazim!`;

    playing = false;
    reset.classList.remove("hidden");
  }
};
init();
for (let i = 0; i < boxes.length; i++) {
  boxes[i].addEventListener("click", function () {
    if (playing) {
      document.querySelector(`.box--${i}`).textContent =
        player === 0 ? "X" : "O";
      scores[i] = player === 0 ? "X" : "O";
      player = player === 0 ? 1 : 0;

      document.querySelector(`.box--${i}`).style.pointerEvents = "none";
      turns.textContent = `Rradha e ${player === 0 ? "X" : "O"}`;
      checkWinner();
    }
  });
}
reset.addEventListener("click", init);
document.addEventListener("keydown", function (e) {
  if (e.key == "Escape" || e.key == "r" || e.key == "R") {
    init();
  }
});
// lightMode.addEventListener("click", function () {
//   lightMode.classList.toggle("hidden");
//   darkMode.classList.toggle("hidden");
//   document.body.style.backgroundColor = "white";
//   document.body.style.color = "black";
//   for (let i = 0; i < boxes.length; i++) {
//     boxes[i].style.color = "black";
//     boxes[i].style.backgroundColor = "#dfdfdf ";
//   }
//   reset.src = "reset-black.png";
// });
const changeThemeColor = function (
  bodyBackground,
  bodyColor,
  boxBackground,
  boxColor
) {
  lightMode.classList.toggle("hidden");
  darkMode.classList.toggle("hidden");
  document.body.style.backgroundColor = bodyBackground;
  document.body.style.color = bodyColor;
  for (let i = 0; i < boxes.length; i++) {
    boxes[i].style.backgroundColor = boxBackground;
    boxes[i].style.color = boxColor;
  }
  reset.src = bodyColor === "white" ? "reset-white.png" : "reset-black.png";
  // console.log(reset.src);
};

darkMode.addEventListener("click", function () {
  changeThemeColor("#2d2a2e", "white", "#403E41", "white");
});
lightMode.addEventListener("click", function () {
  changeThemeColor("white", "black", "#dfdfdf", "black");
});
// darkMode.addEventListener("click", function () {

//   lightMode.classList.toggle("hidden");
//   darkMode.classList.toggle("hidden");
//   document.body.style.backgroundColor = "#2d2a2e";
//   document.body.style.color = "white";
//   for (let i = 0; i < boxes.length; i++) {
//     boxes[i].style.color = "white";
//     boxes[i].style.backgroundColor = "#403E41";
//   }
//   reset.src = "reset-white.png";
// });
