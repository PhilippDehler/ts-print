type AnyFn = (...args: any[]) => any;

/**
 * PrintError
 * - PrintError<"Info", "Message"> => "[ERROR: Info]: Message"
 */
export type PrintError<
  TInfo extends string,
  TMsg extends string
> = `[ERROR: ${TInfo}]: ${TMsg}`;

/**
 * PrintNumber
 * - PrintNumber<100> => "100"
 */
export type PrintNumber<T extends number> = `${T}`;

/**
 * PrintBigInt
 * - PrintBigInt<100n> => "100n"
 */
export type PrintBigInt<T extends bigint> = `${T}n`;

/**
 * PrintVoid
 * - PrintVoid<void> => "void"
 * - PrintVoid<undefined> => never
 *
 */
export type PrintVoid<T extends void> = T extends undefined
  ? never
  : T extends void
  ? "void"
  : never;

/**
 * PrintUndefinied
 * - PrintUndefinied<undefined> => "undefined"
 */
export type PrintUndefinied<T extends undefined> = `undefined`;

/**
 * PrintVoidOrUndefinied
 * - PrintVoidOrUndefinied<void> => "void"
 * - PrintVoidOrUndefinied<undefined> => "undefined"
 * - PrintVoidOrUndefinied<never> => never
 */
export type PrintVoidOrUndefinied<T extends void | undefined> =
  T extends undefined ? "undefined" : T extends void ? "void" : never;

/**
 * PrintBoolean
 * - PrintBoolean<boolean> => "boolean"
 * - PrintBoolean<true> => "true"
 * - PrintBoolean<false> => "false"
 * - PrintBoolean<never> => never
 * - PrintBoolean<unknown> => never Type 'unknown' does not satisfy the constraint 'boolean'.
 */
export type PrintBoolean<T extends boolean> = boolean extends T
  ? "boolean"
  : T extends true
  ? "true"
  : T extends false
  ? "false"
  : never;

/**
 * PrintAny
 * - PrintAny<any> => "any"
 * - PrintAny<unknown> => never
 * - PrintAny<never> => never
 */
export type PrintAny<T> = unknown extends T
  ? [keyof T] extends [never]
    ? never
    : "any"
  : never;

/**
 * PrintUnknown
 * - PrintUnknown<unknown> => "unknown"
 * - PrintUnknown<any> => never
 * - PrintUnknown<never> => never
 */
export type PrintUnknown<T> = unknown extends T
  ? [keyof T] extends [never]
    ? "unknown"
    : never
  : never;

/**
 * PrintAnyOrUnknown
 * - PrintAnyOrUnknown<any> => "any"
 * - PrintAnyOrUnknown<unknown> => "unknown"
 * - PrintAnyOrUnknown<never> => never
 * - PrintAnyOrUnknown<unknown | any> => "any"
 */
export type PrintAnyOrUnknown<T> = PrintUnknown<T> | PrintAny<T>;

/**
 * PrintFunction
 * - PrintFunction<(n: number, x: number) => number> => `(...args:[${number}, ${number}]) => ${number}`
 * - PrintFunction<(n: number, x: any) => number> => `(...args:[${number}, any]) => ${number}`
 */
export type PrintFunction<T extends AnyFn> = T extends (
  ...args: infer Args extends any[]
) => infer Return
  ? `(...args:${PrintArray<Args>}) => ${Print<Return>}`
  : never;

/**
 * PrintArray
 *  - PrintArray<[1, 2, 3]> => "[1, 2, 3]"
 *  - PrintArray<[1, 2, 3, [4, 5]]> => "[1, 2, 3, [4, 5]]"
 */
export type PrintArray<
  Array extends any[],
  TAgg extends string = "["
> = Array extends [infer Head, ...infer Tail]
  ? PrintArray<Tail, `${TAgg extends "[" ? TAgg : `${TAgg}, `}${Print<Head>}`>
  : `${TAgg}]`;

export type Print<T> = [T] extends [never]
  ? "never"
  : [PrintAnyOrUnknown<T>] extends [never]
  ? T extends string
    ? T
    : T extends symbol
    ? `[symbol]`
    : T extends null
    ? "null"
    : T extends undefined | void
    ? PrintVoidOrUndefinied<T>
    : T extends bigint
    ? PrintBigInt<T>
    : T extends number
    ? PrintNumber<T>
    : T extends boolean
    ? PrintBoolean<T>
    : T extends any[]
    ? PrintArray<T>
    : T extends AnyFn
    ? PrintFunction<T>
    : T extends object
    ? "[object object]"
    : PrintError<"UNPRINTABLE", "Can't print type">
  : PrintAnyOrUnknown<T>;

export type PrintObjectTypes<T> = Print<T> extends "[object object]"
  ? { [K in keyof T]: PrintObjectTypes<T[K]> }
  : Print<T>;
