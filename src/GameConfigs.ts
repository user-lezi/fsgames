import { GameType } from "./games/BaseGame";

export interface EmbedData {
  color: number;
  footer: string;
  timestamp: boolean;
  title: string;
}

const CommonEmbedData: EmbedData = {
  color: 0xb3e2ff,
  footer: "Command Ran By {authorName}",
  timestamp: true,
  title: "{gameName}",
};

export interface MessageData {
  turn: string;
  tie: string;
  win: string;
  forfeit: string;
}

const CommonMessageData: MessageData = {
  turn: "> <@{id}>'s turn to play.",
  tie: "It's a tie!",
  win: "> {emoji} <@{id}> won.",
  forfeit: "> <@{id}> forfeited.",
};

export interface ButtonData {
  forfeit: string;
  end: string;
}

const CommonButtonData: ButtonData = {
  forfeit: "Forfeit",
  end: "End",
};

export const GameConfigs = {
  [GameType.TicTacToe]: {
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
  [GameType.RockPaperScissor]: {
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
