"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TicTacToe = exports.TicTacToeGame = void 0;
const BaseGame_1 = require("./BaseGame");
const discord_js_1 = require("discord.js");
const __1 = require("..");
const util_1 = require("../util");
class TicTacToeGame extends BaseGame_1.BaseGame {
    options;
    game = new TicTacToe();
    constructor(ctx, options) {
        super(ctx, BaseGame_1.GameType.TicTacToe);
        this.options = options;
        this.makeEmbed(`> **ℹ️ Click on the buttons to play TicTacToe.**\n${this.parseText(this.config.message.turn, { username: this.turnUser.username, id: this.turnUser.id })}`);
        this.ctx.container.components = this.boardButtons();
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
            if (customId == "ttt_forfeit") {
                __1.FSGames.Delete(that.id);
                collector.stop("forfeit");
                that.gameMessage = await (0, util_1.removeButton)(that.gameMessage, customId);
                that.gameMessage = await (0, util_1.disableAllButtons)(that.gameMessage);
                that.makeEmbed(that.parseText(that.config.message.forfeit, { id: i.user.id }));
            }
            else {
                let index = parseInt(customId.split("_")[1]);
                let state = game.play(index);
                that.lastMove = {
                    played: game.data.player == TTTPlayer.X ? "O" : "X",
                    move: index,
                    state,
                    user: i.user,
                };
                if (state.tie) {
                    that.gameMessage = await (0, util_1.removeButton)(that.gameMessage, "ttt_forfeit");
                    that.gameMessage = await (0, util_1.disableAllButtons)(that.gameMessage);
                    that.makeEmbed(that.parseText(that.config.message.tie));
                    that.ctx.container.components = that.boardButtons(false, false);
                }
                else if (state.win) {
                    that.gameMessage = await (0, util_1.removeButton)(that.gameMessage, "ttt_forfeit");
                    that.game.changeTurn();
                    that.makeEmbed(that.parseText(that.config.message.win, {
                        username: that.turnUser.username,
                        id: that.turnUser.id,
                        emoji: that.game.data.player == TTTPlayer.X
                            ? that.config.emojis.x
                            : that.config.emojis.o,
                    }));
                    that.ctx.container.components = that.boardButtons(true);
                }
                else {
                    that.makeEmbed(that.parseText(that.config.message.turn, {
                        username: that.turnUser.username,
                        id: that.turnUser.id,
                    }));
                    that.ctx.container.components = that.boardButtons();
                }
                that.emitGameUpdate();
                if (state.win || state.tie) {
                    collector.stop(state.win ? "win" : "tie");
                }
                else {
                    collector.resetTimer();
                }
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
    get turnUser() {
        return this.game.data.player == TTTPlayer.X
            ? this.options.user1
            : this.options.user2;
    }
    boardButtons(disabled = false, hasForfeit = true) {
        let rows = [];
        for (let y = 0; y < 3; y++) {
            let row = new discord_js_1.ActionRowBuilder();
            let componentArgs = [];
            for (let x = 0; x < 3; x++) {
                let index = y * 3 + x;
                let sq = this.game.data.board[index];
                let button = new discord_js_1.ButtonBuilder()
                    .setCustomId(`ttt_${index}`)
                    .setStyle(discord_js_1.ButtonStyle.Secondary);
                if (sq === TTTPlayer.Empty) {
                    button.setEmoji(this.config.emojis.empty);
                    if (disabled)
                        button.setDisabled(true);
                }
                else {
                    button
                        .setEmoji(sq === TTTPlayer.X ? this.config.emojis.x : this.config.emojis.o)
                        .setDisabled(true);
                }
                componentArgs.push(button);
            }
            row.addComponents(...componentArgs);
            rows.push(row);
        }
        let win = this.game.checkWin();
        if (win) {
            for (let index of win) {
                let rowIndex = Math.floor(index / 3);
                let colIndex = index % 3;
                rows[rowIndex].components[colIndex].setStyle(discord_js_1.ButtonStyle.Success);
            }
        }
        else if (hasForfeit) {
            rows.push(new discord_js_1.ActionRowBuilder().addComponents(new discord_js_1.ButtonBuilder()
                .setLabel(this.parseText(this.config.button.forfeit))
                .setCustomId(`ttt_forfeit`)
                .setStyle(discord_js_1.ButtonStyle.Danger)));
        }
        return rows;
    }
    toJSON() {
        return {
            ...super.toJSON(),
            game: this.game.toJSON(),
            players: [this.options.user1.id, this.options.user2.id],
        };
    }
}
exports.TicTacToeGame = TicTacToeGame;
var TTTPlayer;
(function (TTTPlayer) {
    TTTPlayer[TTTPlayer["X"] = 0] = "X";
    TTTPlayer[TTTPlayer["O"] = 1] = "O";
    TTTPlayer[TTTPlayer["Empty"] = 2] = "Empty";
})(TTTPlayer || (TTTPlayer = {}));
class TicTacToe {
    data;
    constructor() {
        this.data = {
            board: Array(9).fill(TTTPlayer.Empty),
            player: TTTPlayer.X,
        };
    }
    changeTurn() {
        this.data.player =
            this.data.player === TTTPlayer.X ? TTTPlayer.O : TTTPlayer.X;
        return this;
    }
    play(index) {
        if (this.data.board[index] !== TTTPlayer.Empty) {
            throw new Error("Invalid move: square is already taken.");
        }
        if (this.checkWin() || this.checkTie()) {
            throw new Error("Invalid move: game is already over.");
        }
        this.set(index, this.data.player);
        this.changeTurn();
        return {
            win: !!this.checkWin(),
            tie: this.checkTie(),
        };
    }
    set(index, value) {
        if ("number" !== typeof index)
            throw new Error("Index must be a number.");
        if (index < 0 || index > 8)
            throw new Error("Index must be between 0 and 8.");
        this.data.board[index] = value;
        return this;
    }
    get(index) {
        if ("number" !== typeof index)
            throw new Error("Index must be a number.");
        if (index < 0 || index > 8)
            throw new Error("Index must be between 0 and 8.");
        return this.data.board[index];
    }
    checkWin() {
        const { board } = this.data;
        const winningCombinations = [
            [0, 1, 2],
            [3, 4, 5],
            [6, 7, 8],
            [0, 3, 6],
            [1, 4, 7],
            [2, 5, 8],
            [0, 4, 8],
            [2, 4, 6],
        ];
        for (const combination of winningCombinations) {
            const [a, b, c] = combination;
            if (board[a] !== TTTPlayer.Empty &&
                board[a] === board[b] &&
                board[a] === board[c]) {
                return combination;
            }
        }
        return null;
    }
    checkTie() {
        return (!this.checkWin() && this.data.board.every((v) => v !== TTTPlayer.Empty));
    }
    toJSON() {
        return {
            board: this.data.board,
            player: this.data.player,
        };
    }
}
exports.TicTacToe = TicTacToe;
//# sourceMappingURL=TicTacToe.js.map