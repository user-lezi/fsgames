"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GameConfigs = void 0;
const BaseGame_1 = require("./games/BaseGame");
const CommonEmbedData = {
    color: 0xb3e2ff,
    footer: "Command Ran By {authorName}",
    timestamp: true,
    title: "{gameName}",
};
const CommonMessageData = {
    turn: "> <@{id}>'s turn to play.",
    tie: "It's a tie!",
    win: "> {emoji} <@{id}> won.",
    forfeit: "> <@{id}> forfeited.",
};
const CommonButtonData = {
    forfeit: "Forfeit",
    end: "End",
};
exports.GameConfigs = {
    [BaseGame_1.GameType.TicTacToe]: {
        name: "TicTacToe",
        description: "Play TicTacToe with your friends.",
        emojis: {
            x: "❌",
            o: "⭕",
            empty: "⬛",
        },
        timeout: 60 * 1000,
        embed: CommonEmbedData,
        message: CommonMessageData,
        button: CommonButtonData,
    },
    [BaseGame_1.GameType.RockPaperScissor]: {
        name: "Rock Paper Scissor",
        description: "Play Rock Paper Scissor with your friends.",
        emojis: {
            rock: "🪨",
            paper: "📄",
            scissor: "✂️",
        },
        timeout: 30 * 1000,
        embed: CommonEmbedData,
        message: CommonMessageData,
        button: CommonButtonData,
    },
};
//# sourceMappingURL=GameConfigs.js.map