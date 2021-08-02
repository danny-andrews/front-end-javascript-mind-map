import { readFile, writeFile } from "fs/promises";
import util from "util";
import { exec as execCb } from "child_process";
import ejs from "ejs";

const exec = util.promisify(execCb);

await exec("dot src/summary.dot -Tsvg -o build/summary.svg");
const [template, svg] = await Promise.all([
  readFile("src/index.html.ejs", "utf8"),
  readFile("build/summary.svg", "utf8"),
]);
const output = ejs.render(template, { svg });
await writeFile("public/index.html", output);
