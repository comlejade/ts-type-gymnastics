/**
 * 特殊类型
 */

type IsAny<T> = 1 extends 2 & T ? true : false;

type IsAnyResult = IsAny<any>;
type IsAnyResult1 = IsAny<1>;

type IsEqual1<A, B> = (A extends B ? true : false) &
  (B extends A ? true : false);

type IsEqualRes = IsEqual1<"a", any>;

type IsEqual2<A, B> = (<T>() => T extends A ? 1 : 2) extends <
  T
>() => T extends B ? 1 : 2
  ? true
  : false;

type IsEqual2Res = IsEqual2<"a", any>;

type IsUnion1<A, B = A> = A extends A
  ? [B] extends [A]
    ? false
    : true
  : never;

type IsUnionRes = IsUnion1<1 | 2>;
type IsUnionRes1 = IsUnion1<1>;

type TestNever<T> = T extends number ? 1 : 2;
type TestNeverRes = TestNever<never>;

type IsNever<T> = [T] extends [never] ? true : false;

type IsNeverRes = IsNever<never>;
type IsNeverRes1 = IsNever<1>;

type TestAny<T> = T extends number ? 1 : 2;
type TestAnyRes = TestAny<any>;

type len = [1, 2, 3]["length"];
type len2 = number[]["length"];

type NotEqual<A, B> = (<T>() => T extends A ? 1 : 2) extends <
  T
>() => T extends B ? 1 : 2
  ? false
  : true;

type IsTuple<T> = T extends [...params: infer Eles]
  ? NotEqual<Eles["length"], number>
  : false;

type IsTupleResult = IsTuple<[1, 2, 3]>;

type IsTupleResult2 = IsTuple<number[]>;

// 联合转交叉
type UnionToIntersection<U> = (
  U extends U ? (x: U) => unknown : never
) extends (x: infer R) => unknown
  ? R
  : never;

type UnionToIntersectionResult = UnionToIntersection<
  { guang: 1 } | { dong: 2 }
>;

type GetOptional<Obj extends Record<string, any>> = {
  [Key in keyof Obj as {} extends Pick<Obj, Key> ? Key : never]: Obj[Key];
};

type obj = {
  name: string;
  age?: number;
};

type GetOptionalResult = GetOptional<obj>;

type isRequired<Key extends keyof Obj, Obj> = {} extends Pick<Obj, Key>
  ? never
  : Key;

type GetRequired<Obj extends Record<string, any>> = {
  [Key in keyof Obj as isRequired<Key, Obj>]: Obj[Key];
};

type GetRequiredResult = GetRequired<obj>;

type Dong = {
  [key: string]: any;
  sleep(): void;
};

type RemoveIndexSignature<Obj extends Record<string, any>> = {
  [Key in keyof Obj as Key extends `${infer Str}` ? Str : never]: Obj[Key];
};

class Ding {
  public name: string;
  protected age: number;
  private hobbies: string[];

  constructor() {
    this.name = "ding";
    this.age = 20;
    this.hobbies = ["sleep", "eat"];
  }
}

type publickKeys = keyof Ding;

type ClassPublicProps<Obj extends Record<string, any>> = {
  [Key in keyof Obj]: Obj[Key];
};

type ClassPublicPropsResult = ClassPublicProps<Ding>;

const obj2 = { a: 1, b: 2 } as const;

type objType2 = typeof obj2;

const arr2 = [1, 2, 3] as const;

type arrType2 = typeof arr2;

type ReverseArr<Arr> = Arr extends readonly [infer A, infer B, infer C]
  ? [C, B, A]
  : never;

type ReverseArrRes = ReverseArr<arrType2>;

export {};
