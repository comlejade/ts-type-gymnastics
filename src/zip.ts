type Zip<One extends unknown[], Other extends unknown[]> = One extends [
  infer OneFirst,
  ...infer OneRest
]
  ? Other extends [infer OtherFirst, ...infer OtherRest]
    ? [[OneFirst, OtherFirst], ...Zip<OneRest, OtherRest>]
    : []
  : [];
// type ZipRes = Zip<[1, 2, 3, 8, 9], [4, 5, 6, 7]>;
function zip(target: unknown[], source: unknown[]): unknown[];

function zip<Target extends unknown[], Source extends unknown[]>(
  target: Target,
  source: Source
): Zip<Target, Source>;

function zip(target: unknown[], source: unknown[]) {
  if (!target.length || !source.length) return [];

  const [one, ...rest1] = target;
  const [other, ...rest2] = source;

  return [[one, other], ...zip(rest1, rest2)];
}

type Mutable<Obj> = {
  -readonly [Key in keyof Obj]: Obj[Key];
};

const arr1 = [1, 2, 3];
const arr2 = [4, 5, 6];

const res = zip(arr1, arr2);

export { Zip };
