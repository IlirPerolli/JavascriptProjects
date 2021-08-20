'use strict';
const key = document.querySelectorAll('#key');

const playSound = function (keyPressed) {
  const key = new Audio(`sounds/key${keyPressed}.mp3`);
  key.play();
};

for (let i = 0; i < key.length; i++) {
  key[i].addEventListener('click', function () {
    playSound(i + 1);
  });
}
const keysObj = {
  a: 0,
  s: 1,
  d: 2,
  f: 3,
  g: 4,
  h: 5,
  j: 6,
  k: 7,
  l: 8,
  c: 9,
  v: 10,
  b: 11,
  n: 12,
  m: 13,
};
const allowedCharacters = [
  'a',
  's',
  'd',
  'f',
  'g',
  'h',
  'j',
  'k',
  'l',
  'c',
  'v',
  'b',
  'n',
  'm',
];
document.addEventListener('keydown', function (e) {
  if (allowedCharacters.includes(e.key)) {
    document.querySelector(`.${e.key}`).classList.toggle('clicked');
    setTimeout(function () {
      document.querySelector(`.${e.key}`).classList.toggle('clicked');
    }, 100);

    playSound(keysObj[e.key] + 1);
  }
});
