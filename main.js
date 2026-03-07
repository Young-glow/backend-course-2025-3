import fs from "fs";
import { Command } from "commander";

const program = new Command();

program
  .option("-i, --input <path>", "input file")
  .option("-o, --output <path>", "output file")
  .option("-d, --display", "display result");

program.parse(process.argv);

const options = program.opts();

if (!options.input) {
  console.error("Please, specify input file");
  process.exit(1);
}

if (!fs.existsSync(options.input)) {
  console.error("Cannot find input file");
  process.exit(1);
}

const data = JSON.parse(fs.readFileSync(options.input, "utf8"));
const result = JSON.stringify(data, null, 2);

if (options.output) {
  fs.writeFileSync(options.output, result);
}

if (options.display) {
  console.log(result);
}