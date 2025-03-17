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
type GET = Extract<Methods, 'GET'>;

type BasePersonInfo = Pick<PersonInfo, 'id' | 'name'>;

// ---------- Omit ------------
type ExceptGet = Exclude<Methods, 'GET'>;

type ExceptBasePersonInfo = Omit<PersonInfo, 'id' | 'name'>;

// ------------ complex types ------
type FormControl<T> = T;

type FormGroup<T> = T;

type FormArray<T> = Array<T>;

// -------------  genericity 泛型 ---------
//  BaseType maybe has some issues, I think I don't enum all the base types.
type BaseType = string | number | Date;

// 在这个type中，我将对应的object或数组解析成对应的type, 这个type 匹配的是angular的form type 解构，
// BaseType 可能需要再补充
type Form<T> = T extends Array<infer F>
    ? FormArray<F extends BaseType ? FormControl<F> : Form<F>>
    : FormGroup<{
          [K in keyof T]: T[K] extends BaseType
              ? FormControl<T[K]>
              : Form<T[K]>;
      }>;
