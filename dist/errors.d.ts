import { Parser } from 'arcsecond';
export declare class KittyError extends Error {
    index: number;
    constructor(message: string, index: number);
}
export declare const expect: <T>(p: Parser<T>, msg: string) => Parser<T, string, any>;
export declare function formatError(err: KittyError, source: string, file: string): string;
//# sourceMappingURL=errors.d.ts.map