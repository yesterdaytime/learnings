/// <reference lib="es2023" />

function sealed(constructor: Function) {
    Object.seal(constructor);
    Object.seal(constructor.prototype);
}

function logPropertyAccess(target: Object, propertyName: string) {
    let value = target && (target as any)[propertyName];

    Object.defineProperty(target, propertyName, {
        get() {
            console.log(`Get: ${propertyName} => ${value}`);
            return value;
        },
        set(v: any) {
            console.log(`Set: ${propertyName} => ${v}`);
            value = v;
        },
    });
}

class MyClass {
    @logPropertyAccess
    public myProperty = 'Hello';
}

let objTest = new MyClass();
console.log(objTest.myProperty); // Get: myProperty => Hello
objTest.myProperty = 'World'; // Set: myProperty => World

@sealed
class Greeter {
    greeting: string;
    constructor(message: string) {
        this.greeting = message;
    }
    greet() {
        return 'Hello, ' + this.greeting;
    }
}
