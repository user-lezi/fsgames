"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RockPaperScissor = exports.RPSMove = exports.RockPaperScissorGame = void 0;
const BaseGame_1 = require("./BaseGame");
const discord_js_1 = require("discord.js");
const __1 = require("..");
const util_1 = require("../util");
class RockPaperScissorGame extends BaseGame_1.BaseGame {
    options;
    game = new RockPaperScissor();
    constructor(ctx, options) {
        super(ctx, BaseGame_1.GameType.RockPaperScissor);
        this.options = options;
        this.makeEmbed(`> **<@${options.user1.id}> vs <@${options.user2.id}>**\n${this.parseText(this.config.message.turn, {
            username: this.turnUser.username,
            id: this.turnUser.id,
        })}`);
        this.ctx.container.components = this.buttons();
        this.init();
    }
    async init() {
        this.gameMessage = await this.send();
        let game = this.game;
        let that = this;
        let collector = this.gameMessage.createMessageComponentCollector({
            componentType: discord_js_1.ComponentType.Button,
            time: this.config.timeout,
            filter: (i) => i.user.id === this.turnUser.id,
        });
        collector.on("collect", async (i) => {
            i.deferUpdate().catch(() => { });
            let customId = i.customId;
            let move = customId.split("_")[1];
            game.play(move, game.data.player);
            that.lastMove = {
                move,
                user: i.user,
                state: game.checkWin() ? "win" : game.checkTie() ? "tie" : "ongoing",
                played: move,
            };
            that.emitGameUpdate();
            if (game.checkWin() !== null) {
                let winner = game.checkWin() ? that.options.user2 : that.options.user1;
                that.makeEmbed(that.parseText(that.config.message.win, {
                    username: winner.username,
                    id: winner.id,
                    emoji: that.emojis[move],
                }));
                that.ctx.container.components = that.buttons(true);
                collector.stop("win");
            }
            if (game.checkTie()) {
                that.makeEmbed(that.parseText(that.config.message.tie));
                that.ctx.container.components = that.buttons(true);
                collector.stop("tie");
            }
            else {
                that.makeEmbed(`> **<@${that.options.user1.id}> vs <@${that.options.user2.id}>**\n${that.parseText(that.config.message.turn, {
                    username: that.turnUser.username,
                    id: that.turnUser.id,
                })}`);
                that.ctx.container.components = that.buttons();
            }
            await that.send(true, that.gameMessage);
        });
        collector.on("end", async (_, reason = "timeout") => {
            __1.FSGames.Delete(that.id);
            that.gameMessage = await (0, util_1.disableAllButtons)(that.gameMessage, true);
            that.emitGameEnd(reason);
        });
        this.emitGameStart();
    }
    buttons(disabled = false) {
        let row = new discord_js_1.ActionRowBuilder();
        for (let move in this.emojis) {
            let button = new discord_js_1.ButtonBuilder()
                .setCustomId("rps_" + move)
                .setEmoji(this.emojis[move])
                .setStyle(discord_js_1.ButtonStyle.Secondary)
                .setDisabled(disabled);
            row.addComponents(button);
        }
        return [row];
    }
    get turnUser() {
        return this.game.data.player === 0
            ? this.options.user1
            : this.options.user2;
    }
    toJSON() {
        return {
            ...super.toJSON(),
            game: this.game.toJSON(),
            players: [this.options.user1.id, this.options.user2.id],
        };
    }
}
exports.RockPaperScissorGame = RockPaperScissorGame;
var RPSMove;
(function (RPSMove) {
    RPSMove["Rock"] = "rock";
    RPSMove["Paper"] = "paper";
    RPSMove["Scissor"] = "scissor";
    RPSMove["Empty"] = "empty";
})(RPSMove || (exports.RPSMove = RPSMove = {}));
class RockPaperScissor {
    data;
    constructor() {
        this.data = {
            player: 0,
            game: [RPSMove.Empty, RPSMove.Empty],
        };
    }
    changeTurn() {
        this.data.player = this.data.player === 0 ? 1 : 0;
        return this;
    }
    play(move, player) {
        if (this.data.game[player] !== RPSMove.Empty) {
            throw new Error("Invalid move: Player already played.");
        }
        this.data.game[player] = move;
        this.changeTurn();
        return this;
    }
    checkWin() {
        if (this.data.game[0] === RPSMove.Empty ||
            this.data.game[1] == RPSMove.Empty ||
            this.data.game[0] == this.data.game[1])
            return null;
        let user1 = [
            [RPSMove.Rock, RPSMove.Scissor],
            [RPSMove.Paper, RPSMove.Rock],
            [RPSMove.Scissor, RPSMove.Paper],
        ].includes(this.data.game);
        return user1 ? 0 : 1;
    }
    checkTie() {
        return (this.data.game[0] !== RPSMove.Empty &&
            this.data.game[0] === this.data.game[1]);
    }
    toJSON() {
        return {
            player: this.data.player,
            game: this.data.game,
        };
    }
}
exports.RockPaperScissor = RockPaperScissor;
//# sourceMappingURL=RockPaperScissor.js.map