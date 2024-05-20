export {};

type KebabCaseToCamelCase<Str extends string> =
  Str extends `${infer Prefix}-${infer Rest}`
    ? `${Prefix}${KebabCaseToCamelCase<Capitalize<Rest>>}`
    : Str;

type KebabCaseToCamelCaseRes = KebabCaseToCamelCase<"aaa-bbb-ccc">;

type CamelCaseToKebabCase<Str extends string> =
  Str extends `${infer First}${infer Rest}`
    ? First extends Lowercase<First>
      ? `${First}${CamelCaseToKebabCase<Rest>}`
      : `-${Lowercase<First>}${CamelCaseToKebabCase<Rest>}`
    : Str;

type CamelCaseToKebabCaseRes = CamelCaseToKebabCase<"aaaBbbCcc">;

type Chunk<
  Arr extends unknown[],
  ItemLen extends number,
  CurItem extends unknown[] = [],
  Res extends unknown[] = []
> = Arr extends [infer First, ...infer Rest]
  ? CurItem["length"] extends ItemLen
    ? Chunk<Rest, ItemLen, [First], [...Res, CurItem]>
    : Chunk<Rest, ItemLen, [First, ...CurItem], Res>
  : [...Res, CurItem];

type ChunkRes = Chunk<[1, 2, 3, 4, 5], 2>;

type TupleToNestedObject<Tuple extends unknown[], Value> = Tuple extends [
  infer First,
  ...infer Rest
]
  ? {
      [Key in First as Key extends keyof any
        ? Key
        : never]: Rest extends unknown[]
        ? TupleToNestedObject<Rest, Value>
        : Value;
    }
  : Value;

type TupleToNestedObjectRes = TupleToNestedObject<["guang", "and", "dong"], 1>;

type PartialObjectPropByKeys<
  Obj extends Record<string, any>,
  Key extends keyof any
> = Partial<Pick<Obj, Extract<keyof Obj, Key>>> & Omit<Obj, Key>;

interface Dong {
  name: string;
  age: number;
  address: string;
}

type PartialObjectPropByKeysRes = PartialObjectPropByKeys<Dong, "name">;
