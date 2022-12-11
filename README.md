# ts-print

If you are working with complex types, it's sometimes usefull to be able to print any type for better debugging. You can print any type except of the object-type.

```typescript
type PrintVoidTest = Print<void>;
// void

type PrintVoidTest2 = Print<undefined>;
// undefinied

type PrintVoidOrUndefiniedTest0 = Print<void>;
// void

type PrintVoidOrUndefiniedTest1 = Print<undefined>;
// undefined

type PrintFunctionTest = Print<(n: number, x: number) => number>;
// `(...args:[${number}, ${number}]) => ${number}`

type PrintFunctionTest2 = Print<(n: number, x: any) => number>;
// `(...args:[${number}, any]) => ${number}`

type PrintBooleanTest = Print<boolean>;
// boolean

type PrintTrueTest = Print<true>;
// true

type PrintFalseTest = Print<false>;
// false

type PrintArrayTest = Print<[y: 4, x: number]>;
// [4, ${number}]

type PrintNeverTest = Print<never>;
// never

type PrintBigIntTest = Print<100n>;
// 100n

type PrintNumberTest = Print<1>;
// 1

type PrintAnyTest = Print<any>;
// any

type PrintUnkownTest = Print<unknown>;
// unknown

type PrintObjectTest = PrintObjectTypes<Date>;
// {
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
