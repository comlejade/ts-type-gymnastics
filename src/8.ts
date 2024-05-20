/**
 * 常用内置类型
 */

export {};

type ParametersRes = Parameters<(name: string, age: number) => {}>;

type ReturnTypeRes = ReturnType<() => "ding">;

interface Person {
  name: "guang";
}

interface PersonContructor {
  new (name: string): Person;
}

type ConstructorParametersRes = ConstructorParameters<PersonContructor>;

type InstanceTypeRes = InstanceType<PersonContructor>;

function hello(this: Person) {
  console.log(this.name);
}

// hello.call({})

type ThisParameterTypeRes = ThisParameterType<typeof hello>;

function say(this: Person, age: number) {
  console.log(this.name);
  return this.name + " " + age;
}

type OmitThisParameterRes = OmitThisParameter<typeof say>;

type PartialRes = Partial<{ name: "dong"; age: 18 }>;

type RequiredRes = Required<{ name?: "dong" }>;

type ReadonlyRes = Readonly<{ name: "dong" }>;

type PickRes = Pick<{ name: "dong"; age: 18; sex: 1 }, "name" | "age">;

type RecordRes = Record<"a" | "b", number>;

type ExcludeRes = Exclude<"a" | "b" | "c" | "d", "a" | "b">;

type ExtractRes = Extract<"a" | "b" | "c" | "d", "a" | "b">;

type OmitRes = Omit<{ name: "guang"; age: 20 }, "name">;

type AwaitedRes = Awaited<Promise<Promise<Promise<number>>>>;

type NonNullableRes = NonNullable<{ name: "guang" }>;

type NonNullableRes1 = NonNullable<null>;
