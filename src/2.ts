/**\
 * 重新构造做变换
 */

type ttt = Promise<number>;

type GetValueType2<P> = P extends Promise<infer Value> ? Value : never;

type isTwo<T> = T extends 2 ? true : false;

/**
 * 数组重新构造
 */

type Push<Arr extends unknown[], Ele> = [...Arr, Ele];

type PushResult = Push<[1, 2, 3], 4>;
type Unshift<Arr extends unknown[], Ele> = [Ele, ...Arr];
type UnshiftRes = Unshift<[1, 2, 3, 4], 1>;

type tuple1 = [1, 2];
type tuple2 = ["guang", "dong"];

type tuple = [[1, "guang"], [2, "dong"]];

type Zip<One extends unknown[], Two extends unknown[]> = One extends [
  infer OneFirst,
  infer OneSecond
]
  ? Two extends [infer TwoFirst, infer TwoSecond]
    ? [[OneFirst, TwoFirst], [OneSecond, TwoSecond]]
    : []
  : [];

type ZipResult = Zip<tuple1, tuple2>;

type Zip2<One extends unknown[], Two extends unknown[]> = One extends [
  infer OneFirst,
  ...infer OneRest
]
  ? Two extends [infer TwoFirst, ...infer TwoRest]
    ? [[OneFirst, TwoFirst], ...Zip2<OneRest, TwoRest>]
    : []
  : [];

type tuple3 = [1, 2, 3, 4];
type tuple4 = ["guang", "dong", "haha", "he"];

type Zip2Res = Zip2<tuple3, tuple4>;

/**
 * 字符串重新构造
 */
type CapicalizeStr<Str extends string> =
  Str extends `${infer First}${infer Rest}`
    ? `${Uppercase<First>}${Rest}`
    : Str;

type CapicalizeStrRes = CapicalizeStr<"guang">;

type CamelCaseStr<Str extends string> =
  Str extends `${infer Left}_${infer Right}${infer Rest}`
    ? `${Left}${Uppercase<Right>}${CamelCaseStr<Rest>}`
    : Str;

type CamelCaseRes = CamelCaseStr<"guang_dang_dong">;

type DropSubStr<
  Str extends string,
  SubStr extends string
> = Str extends `${infer Prefix}${SubStr}${infer Suffix}`
  ? DropSubStr<`${Prefix}${Suffix}`, SubStr>
  : Str;

type DropResult = DropSubStr<"dong~~~~", "~">;

/**
 * 函数类型的重新构造
 */

type AppendArgument<Func extends Function, Arg> = Func extends (
  ...args: infer Args
) => infer ReturnType
  ? (...args: [...Args, Arg]) => ReturnType
  : never;

type AppendArgumentRes = AppendArgument<(name: string) => boolean, number>;

/**
 * 索引类型重新构造
 */

type Mapping<Obj extends object> = {
  [Key in keyof Obj]: [Obj[Key], Obj[Key], Obj[Key]];
};

type MappingRes = Mapping<{ a: 1; b: 2 }>;

type UppercaseKey<Obj extends object> = {
  [Key in keyof Obj as Uppercase<Key & string>]: Obj[Key];
};

type UppercaseKeyResult = UppercaseKey<{ guang: 1; dong: 2 }>;

type Record1<K extends string | number | symbol, T> = { [P in K]: T };

type UpppercaseKey<Obj extends Record<string, any>> = {
  [Key in keyof Obj as Uppercase<Key & string>]: Obj[Key];
};

type ToReadonly<T> = {
  readonly [Key in keyof T]: T[Key];
};

type ReadonlyRes = ToReadonly<{ name: string; age: number }>;

type ToPartail<T> = {
  [Key in keyof T]?: T[Key];
};

type PartialRes = ToPartail<{ name: string; age: number }>;

type ToMutable<T> = {
  -readonly [Key in keyof T]: T[Key];
};

type MutableRes = ToMutable<{ readonly name: string; readonly age: number }>;

type ToRequired<T> = {
  [Key in keyof T]-?: T[Key];
};

type RequiredRes = ToRequired<{ name?: string; age: number }>;

type FilterByValueType<Obj extends Record<string, any>, ValueType> = {
  [Key in keyof Obj as Obj[Key] extends ValueType ? Key : never]: Obj[Key];
};

interface Person {
  name: string;
  age: number;
  hobby: string[];
}

type FilterResult = FilterByValueType<Person, string | number>;

export {};
