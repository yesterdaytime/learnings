//#region https://typehero.dev/challenge/query-string-parser/solutions/3963

import type { Expect, Alike } from '@type-challenges/utils';
type Pretiffy<T> = {
    [K in keyof T]: T[K];
};

type BaseType = boolean | string | Array<boolean | string>;

type MapQueriesToList<
    Params extends string,
    Acc extends Array<string> = [],
> = Params extends ''
    ? Acc
    : Params extends `${infer First}&${infer RestParams}`
      ? MapQueriesToList<RestParams, [...Acc, First]>
      : [...Acc, Params];

type MapKV<
    ParamMap extends Record<string, BaseType>,
    K extends string,
    V extends BaseType,
> = K extends keyof ParamMap
    ? Omit<ParamMap, K> &
          (ParamMap[K] extends Array<BaseType>
              ? V extends ParamMap[K][number]
                  ? Record<K, ParamMap[K]>
                  : Record<K, [...ParamMap[K], V]>
              : V extends ParamMap[K]
                ? Record<K, V>
                : Record<K, [ParamMap[K], V]>)
    : ParamMap & Record<K, V>;

type MapQueries<
    Queries extends Array<string>,
    Map extends Record<string, BaseType> = {},
> = Queries extends [
    infer First extends string,
    ...infer Another extends string[],
]
    ? First extends `${infer K}=${infer V}`
        ? MapQueries<Another, MapKV<Map, K, V>>
        : MapQueries<Another, MapKV<Map, First, true>>
    : Map;

type ParseQueryString<T extends string> = Pretiffy<
    MapQueries<MapQueriesToList<T>>
>;

type MergeRecord = Record<'a', number> & Record<'b', boolean>;
type ObjectType = {
    a: number;
    b: boolean;
};

type cases = [
    Expect<Equal<ParseQueryString<''>, {}>>,
    Expect<Equal<ParseQueryString<'k1'>, { k1: true }>>,
    Expect<Equal<ParseQueryString<'k1&k1'>, { k1: true }>>,
    Expect<Equal<ParseQueryString<'k1&k2'>, { k1: true; k2: true }>>,
    Expect<Equal<ParseQueryString<'k1=v1'>, { k1: 'v1' }>>,
    Expect<Equal<ParseQueryString<'k1=v1&k1=v2'>, { k1: ['v1', 'v2'] }>>,
    Expect<Equal<ParseQueryString<'k1=v1&k2=v2'>, { k1: 'v1'; k2: 'v2' }>>,
    Expect<
        Equal<
            ParseQueryString<'k1=v1&k2=v2&k1=v2'>,
            { k1: ['v1', 'v2']; k2: 'v2' }
        >
    >,
    Expect<Equal<ParseQueryString<'k1=v1&k2'>, { k1: 'v1'; k2: true }>>,
    Expect<Equal<ParseQueryString<'k1=v1&k1=v1'>, { k1: 'v1' }>>,
    Expect<Equal<ParseQueryString<'k1=v1&k1=v2&k1=v1'>, { k1: ['v1', 'v2'] }>>,
    Expect<
        Equal<
            ParseQueryString<'k1=v1&k2=v1&k1=v2&k1=v1'>,
            { k1: ['v1', 'v2']; k2: 'v1' }
        >
    >,
    Expect<
        Equal<
            ParseQueryString<'k1=v1&k2=v2&k1=v2&k1=v3'>,
            { k1: ['v1', 'v2', 'v3']; k2: 'v2' }
        >
    >,
    Expect<Equal<ParseQueryString<'k1=v1&k1'>, { k1: ['v1', true] }>>,
    Expect<Equal<ParseQueryString<'k1&k1=v1'>, { k1: [true, 'v1'] }>>,
    Expect<Alike<MergeRecord, ObjectType>>,
];

//#endregion

type ChangeFieldType<U, K extends keyof U, NT> = Omit<U, K> & {
    K: NT;
};

type RecursionListType<
    T extends string,
    Acc extends string[] = [],
> = T extends `${infer F},${infer A}`
    ? RecursionListType<A, [...Acc, F]>
    : [...Acc, T];

const a: RecursionListType<'a,b,c'> = ['a', 'b', 'c'];

// type Equal<T, U> = T extends U ? U extends T ? true : false : false;

type Equal1<T, U> =
    (<Y>() => Y extends T ? 1 : 2) extends <Y>() => Y extends U ? 1 : 2
        ? true
        : false;

const b: Equal1<1 | 2, 1> = false;

type Equal<A, B> =
    (<T>() => T extends A ? 1 : 2) extends <T>() => T extends B ? 1 : 2
        ? true
        : false;

type Includes<T extends readonly any[], U> = true extends {
    [K in keyof T]: Equal<T[K], U>;
}[number]
    ? true
    : false;
