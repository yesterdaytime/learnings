# TypeScript 详解

这是一篇关于 TypeScript 的详解，简洁却包含大部分内容。

TypeScript 是为了约束数据类型，在编写代码的时候就检测到错误。同时对参数变量起到提示作用，这样避免参数拼写错误导致的不易发现的运行错误。

既然是类型约束就要包含基础类型，通用类型，和泛型。通用类型包含 type, interface, enum 等。同时也提供了约束转化关键字 satisfies， as。

## 基础类型

|           |         |         |
| --------- | ------- | ------- |
| number    | string  | boolean |
| Date      | Array   | void    |
| undefined | null    | never   |
| any       | unknown |         |

基础类型中的 number，string， Date， boolean， Array 都是通用的，不在赘述， void 代表没有返回，常用于 Function。

下面是几个特殊的 type 的解释和实例。

#### undefined: 未声明的，代表可以不存在，通常在对可选属性传值时可以看到

```TypeScript
type A = {
   name?: string | null;
}

let a: A = { }; // Correct
a.name // undefined

function test(a?: number) { console.log(a) }

test() // Console will print 'undefined'
```

null: 是一个 object 类型，代表有类型，没有值。

```TypeScript
type A = {
   name: string | null;
}

let a: A = { }; // Error Property 'name' is missing in type { }, but required in type A
let a = { name: null } // Correct
```

#### never: 是所有 type 都不能覆盖的场景，常用于枚举 default，或者类型排除，never 类型无法赋值。

```TypeScript
type NoEmpty<T> = T extends null | undefined ? never : T; // 排除null 和 undefined

type MyString = NoEmpty<string | null | undefined>; // type MyString = string;

// enum default
type Shape =
    | { kind: 'circle'; radius: number }
    | { kind: 'square'; sideLength: number };

function getArea(shape: Shape): number {
    switch (shape.kind) {
        case 'circle':
            return Math.PI * shape.radius ** 2;
        case 'square':
            return shape.sideLength ** 2;
        default:
            const _exhaustiveCheck = shape; // shape type is never.
            throw new Error(`Unknown shape: ${_exhaustiveCheck}`);
    }
}
```

#### any: any 代表任何类型都接受，any 类型的参数可以赋任何值。同时可以用任何参数类型的 function,不会在编写代码的时候报错。

#### unknown: 这个是 any 的替代，是一个新的类型，如果你想对 unknown 的参数调用方法，会直接报错。

| 特性             | any                      | unknown                      |
| ---------------- | ------------------------ | ---------------------------- |
| 类型检查         | 完全忽略类型检查         | 强制类型检查或断言           |
| 安全性           | 不安全，容易引入错误     | 安全，防止误用               |
| 赋值给其他类型   | 可以直接赋值给任何类型   | 必须先进行类型检查或断言     |
| 其他类型赋值给它 | 任何类型都可以赋值给 any | 任何类型都可以赋值给 unknown |
| 适用场景         | 绕过类型系统时           | 数据类型未知但需要类型安全时 |

```typescript
let anyValue: any = 'string';
const result = anyValue.toUpperCase(); // Correct

let unKnownValue: unknown = 'string';
// const result = unKnownValue.toUpperCase(); // Error: 'value' is of type 'unknown'.
if (typeof value === 'string') {
    const result = unKnownValue.toUpperCase(); // Correct
}
```

## 通用类型

#### interface: 接口，通常用于定义 object 属性。

```typescript
interface Product {
    name: string;
    price: number;
    category?: string;
    quantity: number;
    totalPrice: () => number;
    productDate: Date;
}
```

#### class: 类，用于实现代码功能，常用功能。 在 typescript 中，我们不必像 JAVA 那样，每个 class 都有对应的 interface 约束，通常是内部参数加 function 的形式。上面 interface 中的计算属性也可以用 class 代替 interface 实现，不常用。

#### enum: 枚举。用来约束特定的值的，和其他编程语言类似。

#### type: 类型的补充实现，接口处理不了的问题都可以用 type 来实现。

下面是实现各种简单 type 组合的实例

```TypeScript
// --------- Union Types --------
type AorB = A | B;

interface PersonInfo {
    id: string;
    name: string;
    age: number;
    comment?: string;
    description?: string;
}

// ----- Intersection Types -----

type Person = PersonInfo & {
    gender: string;
}

// same like :
type Person = {
    id: string;
    name: string;
    age: number;
    comment?: string;
    description?: string;
    gender: string;
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
type Methods = Uppercase<(typeof RequestMethods)[number]>; // type Methods = "GET" | "POST" | "PATCH" | "DELETE"

// ---------- Pick ------------
type GET_POST = Extract<Methods, 'GET' | 'POST'>;

type BasePersonInfo = Pick<PersonInfo, 'id' | 'name'>;

// ---------- Omit ------------
type ExceptGet = Exclude<Methods, 'GET'>;

type ExceptBasePersonInfo = Omit<PersonInfo, 'id' | 'name'>;

```

## 泛型

泛型是很多编程语言中都具备的功能，简单的泛型可以满足大量的需求。我们主要看看泛型的基本操作。

TypeScript 泛型是继承的关系，即原来的类型是 optional，泛型解析不加`?`也是 optional。

在泛型中，我们可以用`K in keyof T`来拿到泛型 T 中的 key: `K`， 用 `extends` 判断是否是某个类型的 type，用 infer 声明内部 type，然后对 type 内部 type 进行判断。

### 基本泛型

```typescript
type MyArray<T> = T[];

interface Item {}

type Items = MyArray<Item>; // type Items = Item[];
```

### 带类型限制或判断的泛型

```typescript
type BaseArray<T extends string | number> = T[];

type Items = MyArray<number>; // Correct
type Items = BaseArray<Item>; // Error: Type 'Item' does not satisfy the constraint 'string | number'.
```

### 带类型推断的泛型

`infer F`是我们在定义泛型的时候并不知道传递是什么类型，用`F`代替，用于判断和取值

```TypeScript
type BaseType = string | number | Date | boolean | null | undefined | void;

type Form<T> = T extends Array<infer F>
    ? FormArray<F extends BaseType ? FormControl<F> : Form<F>>
    : FormGroup<{
          [K in keyof T]: T[K] extends BaseType
              ? FormControl<T[K]>
              : Form<T[K]>;
      }>;
```

## as 和 satisfies

在 Typescript 中，我们有时候需要将已有的数据转化成对应的类型，这个时候 as 和 satisfies 就是你的选择。

| 特性             | as                           | satisfies                    |
| ---------------- | ---------------------------- | ---------------------------- |
| 类型转换         | 类型断言，强制类型转化       | 类型验证，只确保符合约束条件 |
| 是否改变原始类型 | 改变                         | 不改变                       |
| 安全性           | 不安全，可能导致运行时错误   | 安全                         |
| 适用场景         | 知道类型，但绕过类型系统推断 | 保留原型细节时               |
