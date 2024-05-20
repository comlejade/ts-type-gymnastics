type Zip<One extends unknown[], Other extends unknown[]> = One extends [
    infer OneFirst,
    ...infer OneRest
] ? Other extends [infer OtherFirst, ...infer OtherRest] ? [[OneFirst, OtherFirst], ...Zip<OneRest, OtherRest>] : [] : [];
export { Zip };
