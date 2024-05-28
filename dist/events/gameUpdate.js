"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const EventHandler_1 = require("../EventHandler");
const forgescript_1 = require("@tryforge/forgescript");
const __1 = require("..");
exports.default = new EventHandler_1.GamesEventHandler({
    name: "gameUpdate",
    description: "Fires when a game updates.",
    version: "1.0.0",
    listener: async function (game) {
        let commands = this.getExtension(__1.FSGames, true).commands.get("gameUpdate");
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
//# sourceMappingURL=gameUpdate.js.map