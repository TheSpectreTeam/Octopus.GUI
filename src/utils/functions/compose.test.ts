import { compose } from "./compose";

const sum = (a: number, b: number): number => a + b;

const sumRestArgs = (...rest: any) =>
    rest.reduce((acc: number, item: number) => acc + item, 0);

const mul = (a: number, b: number): number => a * b;

jest.spyOn(global.console, "warn").mockImplementation();

describe("Compose function", () => {
    it("should execute all passed arguments into compose function", () => {
        const addWithMul = compose(mul, sum, 4);
        expect(addWithMul(1, 2)).toBe(6);
        expect(console.warn).toBeCalledWith(
            "Some arguments was deleted, because this is not function"
        );
    });
    it("should execite if passed rest function into compose", () => {
        const restArgsFn = compose(sumRestArgs);
        expect(restArgsFn(1, 3, 5)).toBe(9);
    });
    it("should throw Error if not passed arguments into compose", () => {
        expect(compose()).toThrowError(/No functions passed!/i);
    });
});
