"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const forgescript_1 = require("@tryforge/forgescript");
const discord_gamecord_1 = require("discord-gamecord");
const util_1 = require("../../../util");
exports.default = new forgescript_1.NativeFunction({
    name: "$startConnect4Game",
    aliases: ["$startConnect4"],
    version: "1.0.0",
    description: "Play Connect 4 game!",
    unwrap: false,
    args: [
        forgescript_1.Arg.requiredString("options", "The game options."),
        forgescript_1.Arg.optionalString("result", "The env variable name to load results of the game. (Default: result)"),
    ],
    brackets: true,
    async execute(ctx) {
        let env = this.data.fields[1];
        ctx.setEnvironmentKey("__c4__game__options__", {});
        let optionFunctions = [];
        (0, util_1.getGameOptionFunctionNames)("connect4").forEach((name) => {
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
        let opts = ctx.getEnvironmentKey("__c4__game__options__");
        ctx.deleteEnvironmentKey("__c4__game__options__");
        const gameResult = await new Promise((resolve, reject) => {
            try {
                let opponent = ctx.client.users.cache.get(opts.opponent);
                if (!opponent)
                    return resolve(this.customError(`No Opponent found. [${opts.opponent}]`));
                let game = new discord_gamecord_1.Connect4({
                    ...opts,
                    opponent,
                    isSlashCommand: !!ctx.interaction,
                    message: ctx.interaction ?? ctx.message,
                });
                game.startGame();
                game.on("gameOver", (result) => {
                    resolve({
                        options: game.opts,
                        winner: result.winner,
                        result: result.result,
                        player: result.player,
                        opponent: result.opponent,
                    });
                });
            }
            catch (error) {
                reject({});
            }
        });
        if (gameResult instanceof forgescript_1.Return)
            return gameResult;
        let envKey = await this["resolveCode"](ctx, env ?? "result");
        if (!this["isValidReturnType"](envKey))
            return envKey;
        ctx.setEnvironmentKey(envKey.value, gameResult);
        return this.successJSON(gameResult);
    },
});
//# sourceMappingURL=startConnect4.js.map