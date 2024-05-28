"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GamesCommandManager = void 0;
const forgescript_1 = require("@tryforge/forgescript");
const EventHandler_1 = require("./EventHandler");
class GamesCommandManager extends forgescript_1.BaseCommandManager {
    handlerName = EventHandler_1.HandlerName;
}
exports.GamesCommandManager = GamesCommandManager;
//# sourceMappingURL=CommandManager.js.map