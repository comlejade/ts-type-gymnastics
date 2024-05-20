"use strict";
/**
 * 常用内置类型
 */
Object.defineProperty(exports, "__esModule", { value: true });
function hello() {
    console.log(this.name);
}
function say(age) {
    console.log(this.name);
    return this.name + " " + age;
}
