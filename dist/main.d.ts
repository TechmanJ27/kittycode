import { Parser } from 'arcsecond';
export declare const identifier: Parser<string, string, any>;
export declare const value: Parser<string, string, any>;
export declare const comparisonOperator: Parser<string, string, any>;
export declare const logicalOperator: Parser<string, string, any>;
export declare const statement: Parser<string, string, any>;
export declare const statements: Parser<any, any, any>;
export declare function getKittyConfig(): any;
export declare const kittyConfig: any;
export declare function readAllFiles(dir: string): Generator<string>;
export default function compileKittyCode(): boolean | undefined;
export type CompileResult = {
    ok: true;
    code: string;
} | {
    ok: false;
    message: string;
};
export declare function kittyCodeParse(raw: string, file?: string): CompileResult;
//# sourceMappingURL=main.d.ts.map