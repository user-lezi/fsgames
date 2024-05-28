"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const EventHandler_1 = require("../EventHandler");
const forgescript_1 = require("@tryforge/forgescript");
const __1 = require("..");
exports.default = new EventHandler_1.GamesEventHandler({
    name: "gameEnd",
    description: "Fires when a game ends.",
    version: "1.0.0",
    listener: async function (game, reason) {
        let commands = this.getExtension(__1.FSGames, true).commands.get("gameEnd");
        Reflect.set(game, "_endReason", reason);
        for (let command of commands) {
            forgescript_1.Interpreter.run({
                ...game.ctx.runtime,
                command,
                data: command.compiled.code,
                extras: game,
            });
        }
    },
});
//# sourceMappingURL=gameEnd.js.map