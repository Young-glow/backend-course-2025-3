import fs from "fs";
import { Command } from "commander";

const program = new Command();

program
  .configureOutput({
    writeOut: (str) => process.stdout.write(str),
    writeErr: () => {},
  })
  .exitOverride();

program
  .requiredOption("-i, --input <path>", "input file")
  .option("-o, --output <path>", "output file")
  .option("-d, --display", "display result")
  .option("-c, --cylinders", "display cylinders")
  .option("-m, --mpg <number>", "filter mpg");

try {
  program.parse(process.argv);
} catch (err) {
  console.error("Please, specify input file");
  process.exit(1);
}

const options = program.opts();

if (!fs.existsSync(options.input)) {
  console.error("Cannot find input file");
  process.exit(1);
}

const raw = fs.readFileSync(options.input, "utf8");
let data = JSON.parse(raw);

if (options.mpg) {
  const mpgValue = Number(options.mpg);
  data = data.filter(car => car.mpg < mpgValue);
}

const result = data.map(car => {
  let line = `${car.model}`;

  if (options.cylinders) {
    line += ` ${car.cyl}`;
  }

  line += ` ${car.mpg}`;

  return line;
}).join("\n");

if (options.output) {
  fs.writeFileSync(options.output, result);
}

if (options.display) {
  console.log(result);
}