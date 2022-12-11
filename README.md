# ts-print

If you are working with complex types, it's sometimes usefull to be able to print any type for better debugging. You can print any type except of the object-type.

```typescript
type PrintVoidTest = Print<void>;
// prints: "void"

type PrintVoidTest2 = Print<undefined>;
// prints: "undefinied"

type PrintVoidOrUndefiniedTest0 = Print<void>;
// prints: "void"

type PrintFunctionTest = Print<(n: number, x: number) => number>;
// prints: `(...args:[${number}, ${number}]) => ${number}`

type PrintFunctionTest2 = Print<(n: number, x: any) => number>;
// prints: `(...args:[${number}, any]) => ${number}`

type PrintBooleanTest = Print<boolean>;
// prints: "true" | "false"

type PrintTrueTest = Print<true>;
// prints: "true"

type PrintFalseTest = Print<false>;
// prints: "false"

type PrintArrayTest = Print<[y: 4, x: number]>;
// prints: `[4, ${number}]`

type PrintNeverTest = Print<never>;
// prints: "never"

type PrintBigIntTest = Print<100n>;
// prints: "100n"

type PrintNumberTest = Print<1>;
// prints: "1"

type PrintAnyTest = Print<any>;
// prints: "any"

type PrintUnkownTest = Print<unknown>;
// prints: "unknown"

// PrintObjectTypes will print every value in an object recursively
type PrintObjectTest = PrintObjectTypes<Date>;
// prints: {
//     toString: `(...args:[]) => ${string}`;
//     toDateString: `(...args:[]) => ${string}`;
//     toTimeString: `(...args:[]) => ${string}`;
//     toLocaleString: `(...args:[]) => ${string}`;
//     toLocaleDateString: `(...args:[]) => ${string}`;
//     toLocaleTimeString: `(...args:[]) => ${string}`;
//     valueOf: `(...args:[]) => ${number}`;
//     getTime: `(...args:[]) => ${number}`;
//     ... 36 more ...;
//     [Symbol.toPrimitive]: `(...args:[${string}]) => ${string}`
// }
```
