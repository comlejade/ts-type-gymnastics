type Obj = {
  a: number;
  b: string | number;
  [key: string]: any;
};

const obj = {
  a: 1,
  b: "bb",
  c: 3,
  d: 4,
} satisfies Obj;
