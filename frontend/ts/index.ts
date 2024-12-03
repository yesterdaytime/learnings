/** @format */

const testing = ['Testing', 'Testing1'] as const;

type testingType = (typeof testing)[number];

const testingObj = {
    a: 'Testing2',
    b: 'Testing3',
} as const;

type testingObjKeyType = keyof typeof testingObj;
type testingObjValType = (typeof testingObj)[keyof typeof testingObj];

export type GenericityTest<T> = {
    [K in keyof T]: T[K] extends String
        ? T[keyof T]
        : {
              [L in keyof T[K]]: T[K][L];
          };
};

type Method = (this: unknown, ...arg: unknown[]) => unknown;
function methodDecorator(
    target: Method,
    context: ClassMemberDecoratorContext
): Method {
    // target 就是当前被装饰的 class 方法
    const originalMethod = target;

    // 定义一个新方法
    const decoratedMethod: Method = function (this, ...args) {
        console.log('before method call'); // 扩展方法
        const returnValue = originalMethod.call(this, ...args); // 调用原有方法
        console.log('after method call'); // 扩展方法
        return returnValue;
    };

    // 返回装饰后的方法
    return decoratedMethod;
}

type Class = {
    new (...args: any[]): Object;
};

function myClassDecorator<TClass extends Class>(
    target: TClass,
    context: ClassDecoratorContext
): TClass {
    // 增加一个方法给 class
    target.prototype.method = function () {
        console.log('add on method');
    };

    // 增加一个 static 属性
    target['addonStaticProperty'] = 'addon static property';

    // 派生类
    const derivedClass = class extends target {
        childValue = 'child value';
    };

    // 返回派生类
    return derivedClass;
}
