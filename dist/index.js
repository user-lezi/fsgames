"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __exportStar = (this && this.__exportStar) || function(m, exports) {
    for (var p in m) if (p !== "default" && !Object.prototype.hasOwnProperty.call(exports, p)) __createBinding(exports, m, p);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.FSGames = void 0;
const forgescript_1 = require("@tryforge/forgescript");
const tiny_typed_emitter_1 = require("tiny-typed-emitter");
__exportStar(require("./games"), exports);
__exportStar(require("./GameConfigs"), exports);
const EventHandler_1 = require("./EventHandler");
const CommandManager_1 = require("./CommandManager");
class FSGames extends forgescript_1.ForgeExtension {
    options;
    static games = {};
    static Client = null;
    name = "FSGames";
    description = "Play games through your  ForgeScript bot.";
    version = "1.0.0";
    commands = null;
    emitter = new tiny_typed_emitter_1.TypedEmitter();
    constructor(options = {}) {
        super();
        this.options = options;
    }
    init(client) {
        this.commands = new CommandManager_1.GamesCommandManager(client);
        FSGames.games = {};
        FSGames.Client = client;
        forgescript_1.EventManager.load(EventHandler_1.HandlerName, __dirname + "/events");
        this.load(__dirname + "/functions");
        if (this.options.events?.length) {
            client.events.load(EventHandler_1.HandlerName, this.options.events);
        }
    }
    static New(game) {
        return (FSGames.games[game.id] = game);
    }
    static Get(id) {
        return FSGames.games[id];
    }
    static Delete(id) {
        delete FSGames.games[id];
    }
    static createGameID(game) {
        return `${game.type}-${(Math.floor(Date.now() / 1000) - Math.floor(Math.random() * 1_000_00)).toString(16)}`;
    }
}
exports.FSGames = FSGames;
//# sourceMappingURL=index.js.map