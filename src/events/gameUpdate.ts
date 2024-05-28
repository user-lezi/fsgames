import { GamesEventHandler, GameEvents } from "../EventHandler";
import { BaseGame } from "../games/BaseGame";
import { Interpreter } from "@tryforge/forgescript";
import { FSGames } from "..";

export default new GamesEventHandler({
  name: "gameUpdate",
  description: "Fires when a game updates.",
  version: "1.0.0",
  listener: async function (game: BaseGame) {
    let commands = this.getExtension(FSGames, true).commands!.get("gameUpdate");
    for (let command of commands) {
      Interpreter.run({
        ...game.ctx.runtime,
        command,
        data: command.compiled.code,
        extras: game,
      });
    }
  },
});
