import { readdirSync } from "fs";
import { join } from "path";

export function getGameOptionFunctionNames(gameName: string) {
  let optionFunctionNames: string[] = [];
  let dir = join(__dirname, "functions/games", gameName, "options");
  let files = readdirSync(dir);
  for (let i = 0; i < files.length; i++) {
    const file = files[i];
    if (!file.endsWith(".js")) continue;
    let fileName = file.split(".")[0];
    optionFunctionNames.push(
      `$${fileName}`,
      `$${fileName.replace("Game", "")}`,
    );
  }
  return optionFunctionNames;
}
