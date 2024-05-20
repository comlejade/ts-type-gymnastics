/**
 * 模式匹配做提取
 * 利用 extends ? : 表达式来限定
 * infer 来声明局部变量来提取需要的类型
 */
/**
 * Promise 类型
 */
type p = Promise<"guang">;

type GetValueType<P> = P extends Promise<infer Value> ? Value : never;

type GetValueResult = GetValueType<p>;

/**
 * 数组类型提取
 */
type arr = [1, 2, 3];

type GetFirst<Arr extends unknown[]> = Arr extends [infer First, ...unknown[]]
  ? First
  : never;

type GetFirstResult = GetFirst<arr>;

type GetLast<Arr extends unknown[]> = Arr extends [...unknown[], infer Last]
  ? Last
  : never;

type GetLastResult = GetLast<arr>;

type PropArr<Arr extends unknown[]> = Arr extends []
  ? []
  : Arr extends [...infer Rest, unknown]
  ? Rest
  : never;

type PropResult = PropArr<arr>;

type PropResult1 = PropArr<[]>;

type ShiftArr<Arr extends unknown[]> = Arr extends []
  ? []
  : Arr extends [unknown, ...infer Rest]
  ? Rest
  : never;

type ShiftResult = ShiftArr<arr>;

/**
 * 字符串类型提取
 */
type StartsWith<
  Str extends string,
  Prefix extends string
> = Str extends `${Prefix}${string}` ? true : false;

type StartsWithResult = StartsWith<"guang and dong", "guang">;
type StartsWithResult1 = StartsWith<"guang and dong", "dong">;

type ReplaceStr<
  Str extends string,
  From extends string,
  To extends string
> = Str extends `${infer Prefix}${From}${infer Suffix}`
  ? `${Prefix}${To}${Suffix}`
  : Str;

type ReplaceResult = ReplaceStr<
  "Guangguang's best friend is ? ",
  "?",
  "Dongdong"
>;

type ReplaceResult1 = ReplaceStr<"abc", "?", "Dongdong">;

type TrimStrRight<Str extends string> = Str extends `${infer Rest}${
  | " "
  | "\n"
  | "\t"}`
  ? TrimStrRight<Rest>
  : Str;

type TrimStrRightResult = TrimStrRight<"guang    ">;
type TrimStrLeft<Str extends string> = Str extends `${
  | " "
  | "\t"
  | "\n"}${infer Rest}`
  ? TrimStrLeft<Rest>
  : Str;

type TrimStrLeftResult = TrimStrLeft<"   guang">;

type TrimStr<Str extends string> = TrimStrLeft<TrimStrRight<Str>>;

type TrimStrResult = TrimStr<"   guang   ">;

/**
 * 函数类型提取
 */
type GetParameters<Func extends Function> = Func extends (
  ...args: infer Args
) => unknown
  ? Args
  : never;

type ParametersResult = GetParameters<(name: string, arge: number) => string>;

type GetReturnType<Func extends Function> = Func extends (
  ...args: any[]
) => infer ReturnType
  ? ReturnType
  : never;

type GetReturnTypeResult = GetReturnType<() => "dong">;

class Dong {
  name: string;

  constructor() {
    this.name = "dong";
  }

  hello(this: Dong) {
    return "hello, " + this.name;
  }
}

const dong = new Dong();

dong.hello.call({ xxx: 1 });

type GetThisParameterType<T> = T extends (
  this: infer ThisType,
  ...args: any[]
) => any
  ? ThisType
  : unknown;

type GetThisParameterTypeRes = GetThisParameterType<typeof dong.hello>;

/**
 * 构造器类型
 */

interface Person {
  name: string;
}

interface PersonConstructor {
  new (name: string): Person;
}

type GetInstanceType<Constructor extends new (...args: any) => any> =
  Constructor extends new (...args: any) => infer InstanceType
    ? InstanceType
    : any;

type GetInstanceTypeRes = GetInstanceType<PersonConstructor>;

type GetConstructorParameters<Constructor extends new (...args: any) => any> =
  Constructor extends new (...args: infer ParametersType) => any
    ? ParametersType
    : any;

type GetConstructorParametersRes = GetConstructorParameters<PersonConstructor>;

/**
 * 索引类型
 */

type GetRefProps<Props> = "ref" extends keyof Props
  ? Props extends { ref?: infer Value | undefined }
    ? Value
    : never
  : never;

type GetRefPropsRes = GetRefProps<{ ref?: 1; name: "dong" }>;

type GetRefPropsRes1 = GetRefProps<{ ref?: undefined; name: "dong" }>;

export {};
