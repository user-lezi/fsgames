import {
  Arg,
  CompiledFunction,
  NativeFunction,
  Return,
} from "@tryforge/forgescript";
// @ts-ignore
import { Connect4 } from "discord-gamecord";
import { IConnect4GameOptions } from "../../../typings";
import { getGameOptionFunctionNames } from "../../../util";

export default new NativeFunction({
  name: "$startConnect4Game",
  aliases: ["$startConnect4"],
  version: "1.0.0",
  description: "Play Connect 4 game!",
  unwrap: false,
  args: [
    Arg.requiredString("options", "The game options."),
    Arg.optionalString(
      "result",
      "The env variable name to load results of the game. (Default: result)",
    ),
  ],
  brackets: true,
  async execute(ctx) {
    let env = this.data.fields![1];
    ctx.setEnvironmentKey("__c4__game__options__", {});

    /* Compile option functions */
    let optionFunctions: CompiledFunction[] = [];
    getGameOptionFunctionNames("connect4").forEach((name) => {
      let opts = this.getFunctions(0, {
        name,
      } as NativeFunction);
      optionFunctions.push(...opts);
    });
    for (let i = 0; i < optionFunctions.length; i++) {
      const option = optionFunctions[i];
      let rt = await option.execute(ctx);
      if (!this["isValidReturnType"](rt)) return rt;
    }
    /* ----- */

    let opts = ctx.getEnvironmentKey(
      "__c4__game__options__",
    ) as IConnect4GameOptions;
    ctx.deleteEnvironmentKey("__c4__game__options__");

    const gameResult = await new Promise((resolve, reject) => {
      try {
        let opponent = ctx.client.users.cache.get(opts.opponent);
        if (!opponent)
          return resolve(
            this.customError(`No Opponent found. [${opts.opponent}]`),
          );
        let game = new Connect4({
          ...opts,
          opponent,
          isSlashCommand: !!ctx.interaction,
          message: ctx.interaction ?? ctx.message,
        });

        game.startGame();

        game.on("gameOver", (result: any) => {
          resolve({
            options: game.opts,
            winner: result.winner,
            result: result.result,
            player: result.player,
            opponent: result.opponent,
          });
        });
      } catch (error) {
        reject({});
      }
    });
    if (gameResult instanceof Return) return gameResult;

    let envKey = await this["resolveCode"](ctx, env ?? "result");
    if (!this["isValidReturnType"](envKey)) return envKey;
    ctx.setEnvironmentKey(envKey.value, gameResult);

    return this.successJSON(gameResult);
  },
});
