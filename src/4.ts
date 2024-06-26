/**
 * 数组长度做计数
 */
type BuildArray<
  Length extends number,
  Ele = unknown,
  Arr extends unknown[] = []
> = Arr["length"] extends Length ? Arr : BuildArray<Length, Ele, [...Arr, Ele]>;

type Add<Num1 extends number, Num2 extends number> = [
  ...BuildArray<Num1>,
  ...BuildArray<Num2>
]["length"];

type AddResult = Add<32, 25>;

type Substract<
  Num1 extends number,
  Num2 extends number
> = BuildArray<Num1> extends [...arr1: BuildArray<Num2>, ...arr2: infer Rest]
  ? Rest["length"]
  : never;

type SubstractRes = Substract<33, 21>;

type Multiply<
  Num1 extends number,
  Num2 extends number,
  ResultArr extends unknown[] = []
> = Num2 extends 0
  ? ResultArr["length"]
  : Multiply<Num1, Substract<Num2, 1>, [...BuildArray<Num1>, ...ResultArr]>;

type MultiplyResult = Multiply<3, 22>;

type Divide<
  Num1 extends number,
  Num2 extends number,
  CountArr extends unknown[] = []
> = Num1 extends 0
  ? CountArr["length"]
  : Divide<Substract<Num1, Num2>, Num2, [unknown, ...CountArr]>;

type DivideResult = Divide<30, 5>;

/**
 * 数组长度实现计数
 */

type StrLen<
  Str extends string,
  CountArr extends unknown[] = []
> = Str extends `${string}${infer Rest}`
  ? StrLen<Rest, [...CountArr, unknown]>
  : CountArr["length"];

type StrLenRes = StrLen<"hello world">;

type GreaterThan<
  Num1 extends number,
  Num2 extends number,
  CountArr extends unknown[] = []
> = Num1 extends Num2
  ? false
  : CountArr["length"] extends Num2
  ? true
  : CountArr["length"] extends Num1
  ? false
  : GreaterThan<Num1, Num2, [...CountArr, unknown]>;

type GreaterThanResult = GreaterThan<3, 4>;
type GreaterThanResult1 = GreaterThan<6, 4>;
type GreaterThanResult2 = GreaterThan<4, 4>;

type FibonacciLoop<
  PreArr extends unknown[],
  CurrentArr extends unknown[],
  IndexArr extends unknown[],
  Num extends number = 1
> = IndexArr["length"] extends Num
  ? CurrentArr["length"]
  : FibonacciLoop<
      CurrentArr,
      [...PreArr, ...CurrentArr],
      [...IndexArr, unknown],
      Num
    >;

type Fibonacci<Num extends number> = FibonacciLoop<[1], [], [], Num>;

type FibonacciResult = Fibonacci<2>;

export {};
