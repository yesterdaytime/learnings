interface PersonInfo {
    id: string;
    name: string;
    age: number;
    comment?: string;
    description?: string;
}

// ---------- Require ------------
type PersonFullInfo = Required<PersonInfo>;

type PersonFullInfoNew = {
    [K in keyof PersonInfo]-?: PersonInfo[K];
};

// ---------- Partial ------------
type PersonPartialInfo = Partial<PersonInfo>;

type PersonPartialInfoNew = {
    [K in keyof PersonInfo]+?: PersonInfo[K];
};

const RequestMethods = ['GET', 'POST', 'PATCH', 'DELETE'] as const;
type Methods = Uppercase<(typeof RequestMethods)[number]>;

// ---------- Pick ------------
type GET_POST = Extract<Methods, 'GET' | 'POST'>;

type BasePersonInfo = Pick<PersonInfo, 'id' | 'name'>;

// ---------- Omit ------------
type ExceptGet = Exclude<Methods, 'GET'>;

type ExceptBasePersonInfo = Omit<PersonInfo, 'id' | 'name'>;

// ------------ complex types ------
type FormControl<T> = T;

type FormGroup<T> = T;

type FormArray<T> = Array<T>;

// -------------  genericity 泛型 ---------
//  extends 类似 ===， as 类似 && 泛型，只能在key中使用，没有非的操作。
//  BaseType maybe has some issues, I think I don't enum all the base types.
type BaseType = string | number | Date;

// Function generate
const identity = <T>(a: T): T => a;

const mapArray = <T, K>(arr: T[], fn: (a: T) => K): K[] => arr.map(fn);

// 默认类型
type Method = 'GET' | 'POST';

type ApiRequest<Data, Method = 'GET'> = {
    data: Data;
    method: Method;
};

// 部分字段readonly
// MyReadonly2<Todo2, 'title' | 'description'> === { readonly title: string, readonly description: string, [k in string]: string }
// 同时支持一个参数，MyReadonly2<Todo2> 代表所有字段readonly
type MyReadonly2<T, K extends keyof T = keyof T> = {
    readonly [P in K]: T[P];
} & {
    [P in keyof T as P extends K ? never : P]: T[P];
};

type Exact<U, T> =
    (<K>() => K extends U ? 1 : 2) extends <K>() => K extends T ? 1 : 2
        ? true
        : false;

type IsReadOnly<T> = Exact<T, Readonly<T>>;

type GetReadonlyKeys<T> = {
    [K in keyof T as IsReadOnly<K> extends true ? K : never]: T[K];
};

// 在这个type中，我将对应的object或数组解析成对应的type, 这个type 匹配的是angular的form type 解构，
// BaseType 可能需要再补充
type Form<T> =
    T extends Array<infer F>
        ? FormArray<F extends BaseType ? FormControl<F> : Form<F>>
        : FormGroup<{
              [K in keyof T]: T[K] extends BaseType
                  ? FormControl<T[K]>
                  : Form<T[K]>;
          }>;

type BaseArray<T extends string | number> = T[];

interface Item {}

type ArrayInfer<T> = T extends Array<infer F> ? FormArray<F> : FormGroup<T>;
