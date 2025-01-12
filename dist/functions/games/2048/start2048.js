"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const forgescript_1 = require("@tryforge/forgescript");
const discord_gamecord_1 = require("discord-gamecord");
const util_1 = require("../../../util");
exports.default = new forgescript_1.NativeFunction({
    name: "$start2048Game",
    aliases: ["$start2048"],
    version: "1.0.0",
    description: "Play 2048 game!",
    unwrap: false,
    args: [
        forgescript_1.Arg.requiredString("options", "The game options."),
        forgescript_1.Arg.optionalString("result", "The env variable name to load results of the game. (Default: result)"),
    ],
    brackets: true,
    async execute(ctx) {
        let env = this.data.fields[1];
        ctx.setEnvironmentKey("__2048__game__options__", {});
        let optionFunctions = [];
        (0, util_1.getGameOptionFunctionNames)("2048").forEach((name) => {
            let opts = this.getFunctions(0, {
                name,
            });
            optionFunctions.push(...opts);
        });
        for (let i = 0; i < optionFunctions.length; i++) {
            const option = optionFunctions[i];
            let rt = await option.execute(ctx);
            if (!this["isValidReturnType"](rt))
                return rt;
        }
        let opts = ctx.getEnvironmentKey("__2048__game__options__");
        ctx.deleteEnvironmentKey("__2048__game__options__");
        const gameResult = await new Promise((resolve, reject) => {
            try {
                let game = new discord_gamecord_1.TwoZeroFourEight({
                    ...opts,
                    isSlashCommand: !!ctx.interaction,
                    message: ctx.interaction ?? ctx.message,
                });
                game.startGame();
                game.on("gameOver", (result) => {
                    resolve({
                        result: result.result,
                        score: result.score,
                        player: result.player.id,
                        options: opts,
                        gameBoard: game.gameBoard,
                    });
                });
            }
            catch (error) {
                reject({});
            }
        });
        let envKey = await this["resolveCode"](ctx, env ?? "result");
        if (!this["isValidReturnType"](envKey))
            return envKey;
        ctx.setEnvironmentKey(envKey.value, gameResult);
        return this.successJSON(gameResult);
    },
});
//# sourceMappingURL=start2048.js.map