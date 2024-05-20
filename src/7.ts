// 协变和逆变

// 协变, 子 -> 父
interface Person {
  name: string;
  age: number;
}

interface Guang {
  name: string;
  age: number;
  hobbies: string[];
}

let person: Person = { name: "", age: 20 };

// 逆变
let printHobbies: (guang: Guang) => void;

printHobbies = (guang) => {
  console.log(guang.hobbies);
};

let printName: (person: Person) => void;

printName = (person) => {
  console.log(person.name);
};

printHobbies = printName;

// printName = printHobbies;

export {};
