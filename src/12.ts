type DeepRecord<Obj extends Record<string, any>> = {
  [Key in keyof Obj]: Obj[Key] extends Record<string, any>
    ? DeepRecord<Obj[Key]> & Record<string, any>
    : Obj[Key];
} & Record<string, any>;

type Data = {
  aaa?: number;
  bbb: {
    ccc: number;
    ddd: string;
  };
  eee: {
    ccc: {
      fff: number;
    };
  };
};

const obj: DeepRecord<Data> = {
  aaa: 111,
  ggg: 222,
  bbb: {
    ccc: 111,
    ddd: "1111",
    hhh: "hhh",
  },
  eee: {
    jjj: "jjj",
    ccc: {
      fff: 111,
      lll: 222,
    },
  },
};

type GenerateType<Keys extends keyof any> = {
  [Key in Keys]: {
    [Key2 in Key]: "desc" | "asc";
  } & {
    [Key3 in Exclude<Keys, Key>]: false;
  };
}[Keys];

type res = GenerateType<"aaa" | "bbb" | "ccc" | "ddd">;

export {};
