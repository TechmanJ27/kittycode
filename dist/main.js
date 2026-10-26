import fs from 'fs';
import path from 'path';
export function* readAllFiles(dir) {
    const files = fs.readdirSync(dir, { withFileTypes: true });
    for (const file of files) {
        if (file.isDirectory()) {
            yield* readAllFiles(path.join(dir, file.name));
        }
        else {
            yield path.join(dir, file.name);
        }
    }
}
for (const file of readAllFiles('./kittycode')) {
    if (path.extname(file) === '.meow')
        console.log(file);
}
//# sourceMappingURL=main.js.map