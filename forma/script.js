"use strict";

let btnEl = document.querySelector("#btn");
let nameEl = document.querySelector('[name="userName"]');
let phoneEl = document.querySelector('[name="userPhone"]');
let emailEl = document.querySelector('[name="userEmail"]');
let textEl = document.querySelector('[name="userText"]');

let regexpName = /^[a-zа-яёЁ]+\s*[a-zа-яёЁ]*\s*[a-zа-яёЁ]*\s*$/i; // допускается ввести до трёх слов через пробел (от просто имени до полного ФИО)
let regexpPhone = /^\+\d\(\d{3}\)\d{3}\-\d{4}$/;
let regexpEmail = /[a-z0-9]+[\.\-]*[a-z0-9]+\@[a-z0-9]+\.[a-z]{2,4}/i;
let regexpText = /.+/;

// Реализация без ООП:
//
// function test(element, regexp) {
//     if (regexp.test(element.value)) {
//         element.classList.remove("red_border");
//     } else {
//         element.classList.add("red_border");
//     }
// }

// btnEl.addEventListener("click", () => {
//     test(nameEl, regexpName);
//     test(phoneEl, regexpPhone);
//     test(emailEl, regexpEmail);
//     test(textEl, regexpText);
// });



// Реализация через ООП:

class CheckForm {
    constructor(element, regexp){
        this.element = element;
        this.value = element.value;
        this.regexp = regexp;
        this.check();
    }

    check() {
        if (this.regexp.test(this.value)) {
            this.element.classList.remove("red_border");
        } else {
            this.element.classList.add("red_border");
        }
    }
}

btnEl.addEventListener("click", () => {
    let testName = new CheckForm(nameEl, regexpName);
    let testPhone = new CheckForm(phoneEl, regexpPhone);
    let testEmail = new CheckForm(emailEl, regexpEmail);
    let testText = new CheckForm(textEl, regexpText);
});

