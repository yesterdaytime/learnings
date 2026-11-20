type Pretiffy<T> = {
    [K in keyof T]: T[K];
};

type GetQueryParams<
    Query extends string,
    Acc extends string[] = [],
> = Query extends ''
    ? Acc
    : Query extends `${infer Param}&${infer Rest}`
      ? GetQueryParams<Rest, [...Acc, Param]>
      : [...Acc, Query];

type AddToMappedParams<
    MappedParams extends Record<
        string,
        boolean | string | Array<string | boolean>
    >,
    Key extends string,
    Value extends string | boolean,
> = Key extends keyof MappedParams
    ? Omit<MappedParams, Key> &
          (MappedParams[Key] extends Array<string | boolean>
              ? Value extends MappedParams[Key][number]
                  ? Record<Key, MappedParams[Key]>
                  : Record<Key, [...MappedParams[Key], Value]>
              : Value extends MappedParams[Key]
                ? Record<Key, MappedParams[Key]>
                : Record<Key, [MappedParams[Key], Value]>)
    : MappedParams & Record<Key, Value>;

type MapParams<
    Params extends string[],
    MappedParams extends Record<
        string,
        boolean | string | Array<string | boolean>
    > = {},
> = Params extends [
    infer Param extends string,
    ...infer RestParams extends string[],
]
    ? Param extends `${infer Key}=${infer Value}`
        ? MapParams<RestParams, AddToMappedParams<MappedParams, Key, Value>>
        : MapParams<RestParams, AddToMappedParams<MappedParams, Param, true>>
    : MappedParams;

type ParseQueryString<QueryString extends string> = MapParams<
    GetQueryParams<QueryString>
>;

type GetComputedReturnTypes<T extends Record<PropertyKey, any>> = {
    [Key in keyof T]: T[Key] extends (...args: any[]) => infer RType
        ? RType
        : never;
};

declare function SimpleVue<
    TData extends Record<PropertyKey, any>,
    TComputed extends Record<PropertyKey, () => any>,
    TMethods extends Record<PropertyKey, (...args: any[]) => any>,
>(options: {
    data: (this: void) => TData;
    computed: TComputed & ThisType<TData>;
    methods: TMethods &
        ThisType<TData & GetComputedReturnTypes<TComputed> & TMethods>;
}): any;

declare function SimpleVue<
    TData extends Record<PropertyKey, any>,
    TComputed extends Record<PropertyKey, () => any>,
    TMethods extends Record<PropertyKey, (...args: any[]) => any>,
>(options: {
    data: (this: void) => TData;
    computed: TComputed & ThisType<TData>;
    methods: TMethods &
        ThisType<TData & TMethods & GetComputedReturnTypes<TComputed>>;
}): any;

type MergeRecord = Record<'a', number> & Record<'b', boolean>;
type ObjectType = {
    a: number;
    b: boolean;
};

type CheckTypes<T, U> = {
    [K in keyof T | keyof U]: K;
};
