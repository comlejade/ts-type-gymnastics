"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Dong {
    constructor() {
        this.name = "dong";
    }
    hello() {
        return "hello, " + this.name;
    }
}
const dong = new Dong();
dong.hello.call({ xxx: 1 });
