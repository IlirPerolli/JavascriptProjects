"use strict";
class CaesarCipher {
  _parentElement = document.querySelector(".content");
  _key = 3;
  _ciphertextKeyArray = [];
  _plaintextKeyArray = [];
  _alphabet = [
    "A",
    "B",
    "C",
    "D",
    "E",
    "F",
    "G",
    "H",
    "I",
    "J",
    "K",
    "L",
    "M",
    "N",
    "O",
    "P",
    "Q",
    "R",
    "S",
    "T",
    "U",
    "V",
    "W",
    "X",
    "Y",
    "Z",
  ];
  _button = document.querySelector(".btn");
  _inputField = document.querySelector(".plaintext");
  _inputKey = document.querySelector(".key");
  constructor() {
    this._button.addEventListener("click", this.getData.bind(this));
  }
  _clear() {
    this._parentElement.textContent = "";
  }
  getData(e) {
    e.preventDefault();
    this._clear();
    const inputArray = this._inputField.value.toUpperCase().split("");
    this._inputArray = inputArray;
    if (
      this._inputKey.value != "" &&
      parseInt(this._inputKey.value) > 0
    ) {
      this._key = parseInt(this._inputKey.value);
    }
    if (!this._inputField.value) return;
    this.encryptData();
  }
  encryptData() {
    this._plaintextKeyArray = [];
    this._ciphertextKeyArray = [];
    this._inputArray.forEach((element) => {
      console.log(element);
      const index = this._alphabet.indexOf(element);
      if (index == -1) window.location.reload();
      this._plaintextKeyArray.push(index);
      this._ciphertextKeyArray.push((index + this._key) % 26);
      console.log(index);
    });

    this.render();
  }
  render() {
    const markup = `<table class="table table-bordered mt-5">
      <thead>
        <tr>
          <th scope="col">PlainText</th>
          <th scope="col">Encryption</th>
          <th scope="col">Ciphertext</th>
        </tr>
      </thead>
      <tbody>
      ${this._inputArray
        .map((el, index) => {
          return `<tr>
          <th scope="row">${el}</th>
          <td>${this._plaintextKeyArray[index]}+${this._key} (mod 26)</td>
          <td>${this._ciphertextKeyArray[index]} - <b>${
            this._alphabet[this._ciphertextKeyArray[index]]
          }
        </b></td>
        </tr>
        `;
        })
        .join("")}
      
      </tbody>
    </table>
    
    <table class="table table-bordered mt-5 mb-5">
      <thead>
        <tr>
          <th scope="col">CipherText</th>
          <th scope="col">Decryption</th>
          <th scope="col">Plaintext</th>
        </tr>
      </thead>
      <tbody>
      ${this._ciphertextKeyArray
        .map((el, index) => {
          return `
        <tr>
          <th scope="row">${this._alphabet[el]}</th>
          <td>${el}-${this._key} (mod 26)</td>
          <td>${this._plaintextKeyArray[index]} - <b>${
            this._alphabet[this._plaintextKeyArray[index]]
          }</b></td>
        </tr>
        `;
        })
        .join("")}
      
      </tbody>
    </table>
    
    `;
    this._parentElement.insertAdjacentHTML("afterbegin", markup);
  }
}

new CaesarCipher();
