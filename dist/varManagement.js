import { char, letters, sequenceOf, digits, fail } from 'arcsecond';
const lettersThenSpace = sequenceOf([
    letters,
    char(' ')
]).map(x => x[0]);
const newParser = lettersThenSpace.chain(matchedValue => {
    switch (matchedValue) {
        case 'number': return digits;
        case 'string': return letters;
        case 'bracketed': return sequenceOf([
            char('('),
            letters,
            char(')')
        ]).map(values => values[1]);
        default: return fail('Unrecognised input type');
    }
});
//# sourceMappingURL=varManagement.js.map