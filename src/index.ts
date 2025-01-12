import { ForgeClient, ForgeExtension } from "@tryforge/forgescript";

export class FSGames extends ForgeExtension {
  name: string = "FSGames";
  description: string = "A game extension for ForgeScript.";
  version: string = require("../package.json").version;

  init(client: ForgeClient): void {
    this.load(__dirname + "/functions");
  }
}

export * from "./typings";
