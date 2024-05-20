"use strict";
// 协变和逆变
Object.defineProperty(exports, "__esModule", { value: true });
let person = { name: "", age: 20 };
// 逆变
let printHobbies;
printHobbies = (guang) => {
    console.log(guang.hobbies);
};
let printName;
printName = (person) => {
    console.log(person.name);
};
printHobbies = printName;
