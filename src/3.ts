/**
 * 递归复用做循环
 */
/**
 * Promise 的递归复用
 */
type ttt1 = Promise<Promise<Promise<Record<string, any>>>>;

type DeepPromiseValueType<P extends Promise<unknown>> = P extends Promise<
  infer ValueType
>
  ? ValueType extends Promise<unknown>
    ? DeepPromiseValueType<ValueType>
    : ValueType
  : never;

type DeepPromiseResult = DeepPromiseValueType<ttt1>;

type DeepPromiseValueType2<T> = T extends Promise<infer ValueType>
  ? DeepPromiseValueType2<ValueType>
  : T;

type DeepPromiseResult2 = DeepPromiseValueType2<ttt1>;

/**
 * 数组类型的递归
 */

type ReverseArr<Arr extends unknown[]> = Arr extends [infer One, ...infer Rest]
  ? [...ReverseArr<Rest>, One]
  : Arr;

type ReverseArrRes = ReverseArr<[1, 2, 3, 4, 5]>;

type IsEqual<A, B> = (A extends B ? true : false) &
  (B extends A ? true : false);

type Includes<Arr extends unknown[], FindItem> = Arr extends [
  infer First,
  ...infer Rest
]
  ? IsEqual<First, FindItem> extends true
    ? true
    : Includes<Rest, FindItem>
  : false;

type IncludesResult = Includes<[1, 2, 3, 4, 5], 4>;
type IncludesResult1 = Includes<[1, 2, 3, 4, 5], 6>;

type RemoveItem<
  Arr extends unknown[],
  Item,
  Result extends unknown[] = []
> = Arr extends [infer First, ...infer Rest]
  ? IsEqual<First, Item> extends true
    ? RemoveItem<Rest, Item, Result>
    : RemoveItem<Rest, Item, [...Result, First]>
  : Result;

type RemoveItemResult = RemoveItem<[1, 2, 2, 3], 2>;

type BuildArray<
  Length extends number,
  Ele = unknown,
  Arr extends unknown[] = []
> = Arr["length"] extends Length ? Arr : BuildArray<Length, Ele, [...Arr, Ele]>;

type BuildArrResult = BuildArray<5>;

/**
 * 字符串类型递归
 */

type ReplaceAll<
  Str extends string,
  From extends string,
  To extends string
> = Str extends `${infer Left}${From}${infer Right}`
  ? `${Left}${To}${ReplaceAll<Right, From, To>}`
  : Str;

type ReplaceAllResult = ReplaceAll<"guang guang guang", "guang", "dong">;

type StringToUnion<Str extends string> = Str extends `${infer One}${infer Rest}`
  ? One | StringToUnion<Rest>
  : never;

type StringToUnionRes = StringToUnion<"dong">;

type ReverseStr<
  Str extends string,
  Result extends string = ""
> = Str extends `${infer Prefix}${infer Suffix}`
  ? ReverseStr<Suffix, `${Prefix}${Result}`>
  : Result;

type ReverseStrResult = ReverseStr<"hello">;

/**
 * 对象类型递归
 */

type DeepReadonly<Obj extends Record<string, any>> = {
  readonly [Key in keyof Obj]: Obj[Key] extends object
    ? Obj[Key] extends Function
      ? Obj[Key]
      : DeepReadonly<Obj[Key]>
    : Obj[Key];
};

type obj = {
  a: {
    b: {
      c: {
        f: () => "dong";
        d: {
          e: {
            guang: string;
          };
        };
      };
    };
  };
};

type DeepReadonlyResult = DeepReadonly<obj>;

export {};
