"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BaseGame = exports.GameType = void 0;
var GameType;
(function (GameType) {
    GameType[GameType["TicTacToe"] = 0] = "TicTacToe";
    GameType[GameType["RockPaperScissor"] = 1] = "RockPaperScissor";
})(GameType || (exports.GameType = GameType = {}));
const GameConfigs_1 = require("../GameConfigs");
const __1 = require("..");
class BaseGame {
    ctx;
    type;
    id;
    timestamp;
    gameMessage = null;
    lastMove = null;
    constructor(ctx, type) {
        this.ctx = ctx;
        this.type = type;
        this.id = __1.FSGames.createGameID(this);
        this.timestamp = Date.now();
    }
    emitGameStart() {
        this.ctx.client.getExtension(__1.FSGames, true).emitter.emit("gameStart", this);
    }
    emitGameEnd(...args) {
        this.ctx.client
            .getExtension(__1.FSGames, true)
            .emitter.emit("gameEnd", this, ...args);
    }
    emitGameUpdate() {
        this.ctx.client
            .getExtension(__1.FSGames, true)
            .emitter.emit("gameUpdate", this);
    }
    get user() {
        return this.ctx.user;
    }
    get interaction() {
        return this.ctx.interaction;
    }
    get message() {
        return this.ctx.message;
    }
    get config() {
        return GameConfigs_1.GameConfigs[this.type];
    }
    get emojis() {
        return this.config.emojis;
    }
    isInteraction() {
        return !!this.ctx.interaction;
    }
    isTicTacToe() {
        return this.type === GameType.TicTacToe;
    }
    isRockPaperScissor() {
        return this.type === GameType.RockPaperScissor;
    }
    parseText(text, moreOpts = {}) {
        let opts = {
            authorName: this.user?.username,
            gameName: this.config.name,
            gameId: this.id,
            ...moreOpts,
        };
        return text.replace(/{\w+}/g, (match) => opts[match.slice(1, -1)] ?? match);
    }
    makeEmbed(content) {
        this.ctx.container.reset();
        this.ctx.container
            .embed(0)
            .setTitle(this.parseText(this.config.embed.title))
            .setColor(this.config.embed.color)
            .setDescription(content)
            .setFooter({
            text: this.parseText(this.config.embed.footer),
        });
        if (this.config.embed.timestamp)
            this.ctx.container.embed(0).setTimestamp();
        return this.ctx.container.embed(0);
    }
    send(edit = false, editMessage = null, reset = true) {
        let promise;
        this.ctx.container.edit = edit;
        if (this.isInteraction()) {
            promise = this.ctx.container.send(this.interaction);
        }
        else {
            promise = this.ctx.container.send(edit && editMessage
                ? editMessage
                : this.message);
        }
        if (reset)
            this.ctx.container.reset();
        return promise;
    }
    toJSON(properties = {}) {
        return {
            id: this.id,
            type: this.type,
            timestamp: this.timestamp,
            gameMessage: this.gameMessage?.id,
            ...properties,
        };
    }
}
exports.BaseGame = BaseGame;
//# sourceMappingURL=BaseGame.js.map