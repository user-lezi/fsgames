"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.HandlerName = exports.GamesEventHandler = void 0;
const forgescript_1 = require("@tryforge/forgescript");
const _1 = require("./");
class GamesEventHandler extends forgescript_1.BaseEventHandler {
    register(client) {
        client
            .getExtension(_1.FSGames, true)
            .emitter.on(this.name, this.listener.bind(client));
    }
}
exports.GamesEventHandler = GamesEventHandler;
exports.HandlerName = "FSGamesHandler";
//# sourceMappingURL=EventHandler.js.map