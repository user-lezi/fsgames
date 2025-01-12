import { generateMetadata, Logger } from "@tryforge/forgescript";

generateMetadata(`${__dirname}/functions`, "functions");

/* fix category */
import * as functions from "../metadata/functions.json";
import { writeFileSync } from "fs";
let newFunctions: typeof functions = [];
// @ts-ignore
for (let func of functions.default) {
  let { name, category } = func;
  if (category == "options") {
    func.category = name.match(/set(\w+)Game/)?.[1]!;
  }
  newFunctions.push(func);
  Logger.info(`${func.category}: ${func.name}`);
}

writeFileSync("metadata/functions.json", JSON.stringify(newFunctions));
