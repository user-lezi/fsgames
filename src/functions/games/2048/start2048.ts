import { Arg, CompiledFunction, NativeFunction } from "@tryforge/forgescript";
// @ts-ignore
import { TwoZeroFourEight } from "discord-gamecord";
import { I2048GameOptions } from "../../../typings";
import { getGameOptionFunctionNames } from "../../../util";

export default new NativeFunction({
  name: "$start2048Game",
  aliases: ["$start2048"],
  version: "1.0.0",
  description: "Play 2048 game!",
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
    ctx.setEnvironmentKey("__2048__game__options__", {});

    /* Compile option functions */
    let optionFunctions: CompiledFunction[] = [];
    getGameOptionFunctionNames("2048").forEach((name) => {
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
      "__2048__game__options__",
    ) as I2048GameOptions;
    ctx.deleteEnvironmentKey("__2048__game__options__");

    const gameResult = await new Promise((resolve, reject) => {
      try {
        let game = new TwoZeroFourEight({
          ...opts,
          isSlashCommand: !!ctx.interaction,
          message: ctx.interaction ?? ctx.message,
        });

        game.startGame();

        game.on("gameOver", (result: any) => {
          resolve({
            result: result.result,
            score: result.score,
            player: result.player.id,
            options: opts,
            gameBoard: game.gameBoard,
          });
        });
      } catch (error) {
        reject({});
      }
    });

    let envKey = await this["resolveCode"](ctx, env ?? "result");
    if (!this["isValidReturnType"](envKey)) return envKey;
    ctx.setEnvironmentKey(envKey.value, gameResult);

    return this.successJSON(gameResult);
  },
});
