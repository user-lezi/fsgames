import { GamesEventHandler, GameEvents } from "../EventHandler";
import { BaseGame } from "../games/BaseGame";
import { Interpreter } from "@tryforge/forgescript";
import { FSGames } from "..";

export default new GamesEventHandler({
  name: "gameEnd",
  description: "Fires when a game ends.",
  version: "1.0.0",
  listener: async function (game: BaseGame, reason: string) {
    let commands = this.getExtension(FSGames, true).commands!.get("gameEnd");
    Reflect.set(game, "_endReason", reason);
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
