import {
  Print,
  PrintArray,
  PrintBoolean,
  PrintFunction,
  PrintObjectTypes,
  PrintVoid,
  PrintVoidOrUndefinied,
} from "..";

function test<T>(i: T) {
  return i;
}
type VoidFn = () => void;
type PrintVoidTest = PrintVoid<ReturnType<VoidFn>>;
test<PrintVoidTest>("void");
type PrintVoidTest2 = PrintVoid<undefined>;
test<PrintVoidTest2>(null as never);

type PrintVoidOrUndefiniedTest0 = PrintVoidOrUndefinied<void>;
test<PrintVoidOrUndefiniedTest0>("void");

type PrintVoidOrUndefiniedTest1 = PrintVoidOrUndefinied<undefined>;
test<PrintVoidOrUndefiniedTest1>("undefined");

type PrintFunctionTest = PrintFunction<(n: number, x: number) => number>;
test<PrintFunctionTest>(
  `(...args:[${0 as number}, ${0 as number}]) => ${0 as number}`
);

type PrintFunctionTest2 = PrintFunction<(n: number, x: any) => number>;
test<PrintFunctionTest2>(`(...args:[${0 as number}, any]) => ${0 as number}`);

type PrintBooleanTest = PrintBoolean<boolean>;
test<PrintBooleanTest>("boolean");

type PrintTrueTest = PrintBoolean<true>;
test<PrintTrueTest>("true");

type PrintFalseTest = PrintBoolean<false>;
test<PrintFalseTest>("false");

type PrintArrayTest = PrintArray<[y: 4, x: number]>;
test<PrintArrayTest>(`[4, ${0 as number}]`);

type PrintNeverTest = Print<never>;
test<PrintNeverTest>("never");

type PrintBigIntTest = Print<100n>;
test<PrintBigIntTest>("100n");
type PrintNumberTest = Print<1>;
test<PrintNumberTest>("1");

type PrintAnyTest = Print<any>;
test<PrintAnyTest>("any");

type PrintUnkownTest = Print<unknown>;
test<PrintUnkownTest>("unknown");

type PrintObjectTest = PrintObjectTypes<{
  a: { b: string; c: number };
  f: { c: boolean; e: true };
}>;

test<PrintObjectTest>({
  a: {
    b: "" as string,
    c: `${0 as number}`,
  },
  f: {
    c: "true" as "true" | "false",
    e: "true",
  },
});
