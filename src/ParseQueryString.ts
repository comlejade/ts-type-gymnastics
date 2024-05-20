type ParseParam<param extends string> =
  param extends `${infer Key}=${infer Value}` ? { [K in Key]: Value } : {};

type MergeParam<
  Param1 extends Record<string, any>,
  Param2 extends Record<string, any>
> = {
  [Key in keyof Param1 | keyof Param2]: Key extends keyof Param1
    ? Key extends keyof Param2
      ? MergeValues<Param1[Key], Param2[Key]>
      : Param1[Key]
    : Key extends keyof Param2
    ? Param2[Key]
    : never;
};

type MergeValues<One, Other> = One extends Other
  ? One
  : Other extends unknown[]
  ? [One, ...Other]
  : [One, Other];

type ParseQueryString<T extends string> =
  T extends `${infer param}&${infer Rest}`
    ? MergeParam<ParseParam<param>, ParseQueryString<Rest>>
    : ParseParam<T>;

type ParseQueryStringRes = ParseQueryString<"a=1&b=2&c=3">;

export { ParseQueryString };
