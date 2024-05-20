/**
 * 联合类型可简化
 */

type Union = "a" | "b" | "c";

type UppercaseA<Item extends string> = Item extends "a"
  ? Uppercase<Item>
  : Item;

type result = UppercaseA<Union>;

type str = `${Union}~~`;

type Camelcase<Str extends string> =
  Str extends `${infer Left}_${infer Right}${infer Rest}`
    ? `${Left}${Uppercase<Right>}${Camelcase<Rest>}`
    : Str;

type CamelcaseResult = Camelcase<"aa_bb_cc">;

type CamelcaseArr<Arr extends unknown[]> = Arr extends [
  infer Item,
  ...infer RestArr
]
  ? [Camelcase<Item & string>, ...CamelcaseArr<RestArr>]
  : [];

type CamelcaseArrResult = CamelcaseArr<["aa_aa_aa", "bb_bb_bb", "cc_cc_cc"]>;

type CamelcaseUnion<Item extends string> =
  Item extends `${infer Left}_${infer Right}${infer Rest}`
    ? `${Left}${Uppercase<Right>}${CamelcaseUnion<Rest>}`
    : Item;

type CamelcaseUnionResult = CamelcaseUnion<
  "aa_aa_aa" | "bb_bb_bb" | "cc_cc_cc"
>;

type IsUnion<A, B = A> = A extends A ? ([B] extends [A] ? false : true) : never;

type IsUnionResult = IsUnion<"a" | "b" | "c" | "d">;
type IsUnionResult1 = IsUnion<["a" | "b" | "c"]>;

type TestUnion<A, B = A> = A extends A ? { a: A; b: B } : never;

type TestUnionResult = TestUnion<"a" | "b" | "c">;

// 数组转联合类型
type union = ["aaa", "bbb"][number];

type BEM<
  Block extends string,
  Element extends string[],
  Modifiers extends string[]
> = `${Block}__${Element[number]}--${Modifiers[number]}`;

type bemResult = BEM<"guang", ["aaa", "bbb"], ["warning", "success"]>;

type Combination<A extends string, B extends string> =
  | A
  | B
  | `${A}${B}`
  | `${B}${A}`;

type AllCombinations<A extends string, B extends string = A> = A extends A
  ? Combination<A, AllCombinations<Exclude<B, A>>>
  : never;

type AllCombinationsResult = AllCombinations<"A" | "B" | "C">;

export {};
