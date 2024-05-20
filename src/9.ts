import { ParseQueryString } from "./ParseQueryString";

function parseQueryString<Str extends string>(
  queryStr: Str
): ParseQueryString<Str>;

function parseQueryString(queryStr: string) {
  if (!queryStr || !queryStr.length) {
    return {};
  }

  const queryObj: Record<string, any> = {};

  const items = queryStr.split("&");

  items.forEach((item) => {
    const [key, value] = item.split("=");
    if (queryObj[key]) {
      if (Array.isArray(queryObj[key])) {
        queryObj[key].push(value);
      } else {
        queryObj[key] = [queryObj[key], value];
      }
    } else {
      queryObj[key] = value;
    }
  });

  return queryObj;
}

const res = parseQueryString("a=1&b=2&c=3");

res.a;
res.b;
res.c;

interface PromiseConstructor {
  all<T extends readonly unknown[] | []>(
    values: T
  ): Promise<{ -readonly [P in keyof T]: Awaited<T[P]> }>;

  race<T extends readonly unknown[] | []>(
    values: T
  ): Promise<Awaited<T[number]>>;
}

type CurriedFunc<Params, Return> = Params extends [infer Arg, ...infer Rest]
  ? (arg: Arg) => CurriedFunc<Rest, Return>
  : never;

declare function currying<Func>(
  fn: Func
): Func extends (...args: infer Params) => infer Result
  ? CurriedFunc<Params, Result>
  : never;
