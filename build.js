import { readFile, writeFile } from "fs/promises";
import util from "util";
import { exec as execCb } from "child_process";
import ejs from "ejs";

const exec = util.promisify(execCb);

await exec("dot src/summary.dot -T svg -K neato -o build/summary.neato.svg");
await exec("dot src/summary.dot -T svg -o build/summary.dot.svg");
const [template, neato, dot] = await Promise.all([
  readFile("src/index.html.ejs", "utf8"),
  readFile("build/summary.neato.svg", "utf8"),
  readFile("build/summary.dot.svg", "utf8"),
]);
const config = { svgs: { neato, dot } };
const output = ejs.render(template, config);
await writeFile("public/index.html", output);
