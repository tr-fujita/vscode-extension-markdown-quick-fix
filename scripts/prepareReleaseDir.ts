import fs from "node:fs";
import path from "node:path";

const outPath = path.join(import.meta.dirname, '../release');

if (!fs.existsSync(outPath)) {
    fs.mkdirSync(outPath);
    console.info(`${outPath.split("/").at(-1)}ディレクトリを作成しました`);
}
