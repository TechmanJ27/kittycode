import { Parser } from 'arcsecond';
export class KittyError extends Error {
    index;
    constructor(message, index) {
        super(message);
        this.index = index;
    }
}
export const expect = (p, msg) => p.errorMap(({ index }) => { throw new KittyError(msg, index); });
export function formatError(err, source, file) {
    const before = source.slice(0, err.index);
    const line = before.split('\n').length;
    const col = err.index - (before.lastIndexOf('\n') + 1) + 1;
    return `${file}:${line}:${col} - ${err.message}`;
}
//# sourceMappingURL=errors.js.map