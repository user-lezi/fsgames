import { BaseGame, GameType } from "./BaseGame";
import { Context } from "@tryforge/forgescript";
import {
  User,
  ActionRowBuilder,
  ButtonBuilder,
  ButtonStyle,
  Message,
  ComponentType,
} from "discord.js";
import { FSGames } from "..";
import { disableAllButtons, removeButton } from "../util";

export interface ITicTacToeOptions {
  user1: User;
  user2: User;
}

export class TicTacToeGame extends BaseGame {
  public game = new TicTacToe();
  public constructor(
    ctx: Context,
    public options: ITicTacToeOptions,
  ) {
    super(ctx, GameType.TicTacToe);

    this.makeEmbed(
      `> **ℹ️ Click on the buttons to play TicTacToe.**\n${this.parseText(this.config.message.turn, { username: this.turnUser.username, id: this.turnUser.id })}`,
    );
    this.ctx.container.components = this.boardButtons();
    this.init();
  }

  async init() {
    this.gameMessage = await this.send<Message>();
    let game = this.game;
    let that = this;
    let collector = this.gameMessage.createMessageComponentCollector({
      componentType: ComponentType.Button,
      time: this.config.timeout,
      filter: (i) => i.user.id === this.turnUser.id,
    });

    collector.on("collect", async (i) => {
      i.deferUpdate().catch(() => {});
      let customId = i.customId;
      if (customId == "ttt_forfeit") {
        FSGames.Delete(that.id as string);
        collector.stop("forfeit");
        that.gameMessage = await removeButton(that.gameMessage!, customId);
        that.gameMessage = await disableAllButtons(that.gameMessage!);
        that.makeEmbed(
          that.parseText(that.config.message.forfeit, { id: i.user.id }),
        );
      } else {
        let index = parseInt(customId.split("_")[1]);
        let state = game.play(index);
        that.lastMove = {
          played: game.data.player == TTTPlayer.X ? "O" : "X",
          move: index,
          state,
          user: i.user,
        };
        if (state.tie) {
          that.gameMessage = await removeButton(
            that.gameMessage!,
            "ttt_forfeit",
          );
          that.gameMessage = await disableAllButtons(that.gameMessage!);
          that.makeEmbed(that.parseText(that.config.message.tie));
          that.ctx.container.components = that.boardButtons(false, false);
        } else if (state.win) {
          that.gameMessage = await removeButton(
            that.gameMessage!,
            "ttt_forfeit",
          );
          that.game.changeTurn();
          that.makeEmbed(
            that.parseText(that.config.message.win, {
              username: that.turnUser.username,
              id: that.turnUser.id,
              emoji:
                that.game.data.player == TTTPlayer.X
                  ? that.emojis.x
                  : that.emojis.o,
            }),
          );
          that.ctx.container.components = that.boardButtons(true);
        } else {
          that.makeEmbed(
            that.parseText(that.config.message.turn, {
              username: that.turnUser.username,
              id: that.turnUser.id,
            }),
          );
          that.ctx.container.components = that.boardButtons();
        }
        that.emitGameUpdate();
        if (state.win || state.tie) {
          collector.stop(state.win ? "win" : "tie");
        } else {
          collector.resetTimer();
        }
      }
      await that.send(true, that.gameMessage!);
    });

    collector.on("end", async (_: any, reason: string = "timeout") => {
      FSGames.Delete(that.id as string);
      that.gameMessage = await disableAllButtons(that.gameMessage!, true);
      that.emitGameEnd<string>(reason);
    });

    this.emitGameStart();
  }

  get turnUser() {
    return this.game.data.player == TTTPlayer.X
      ? this.options.user1
      : this.options.user2;
  }

  private boardButtons(disabled = false, hasForfeit = true) {
    let rows: ActionRowBuilder[] = [];
    for (let y = 0; y < 3; y++) {
      let row = new ActionRowBuilder<ButtonBuilder>();
      let componentArgs: ButtonBuilder[] = [];
      for (let x = 0; x < 3; x++) {
        let index = y * 3 + x;
        let sq = this.game.data.board[index];
        let button = new ButtonBuilder()
          .setCustomId(`ttt_${index}`)
          .setStyle(ButtonStyle.Secondary);
        if (sq === TTTPlayer.Empty) {
          button.setEmoji(this.emojis.empty);
          if (disabled) button.setDisabled(true);
        } else {
          button
            .setEmoji(sq === TTTPlayer.X ? this.emojis.x : this.emojis.o)
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
        (rows[rowIndex].components[colIndex] as ButtonBuilder).setStyle(
          ButtonStyle.Success,
        );
      }
    } else if (hasForfeit) {
      rows.push(
        new ActionRowBuilder<ButtonBuilder>().addComponents(
          new ButtonBuilder()
            .setLabel(this.parseText(this.config.button.forfeit))
            .setCustomId(`ttt_forfeit`)
            .setStyle(ButtonStyle.Danger),
        ),
      );
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

enum TTTPlayer {
  X,
  O,
  Empty,
}
export interface ITicTacToe {
  board: TTTPlayer[];
  player: TTTPlayer;
}

export class TicTacToe {
  public data: ITicTacToe;
  constructor() {
    this.data = {
      board: Array<TTTPlayer>(9).fill(TTTPlayer.Empty),
      player: TTTPlayer.X,
    };
  }

  public changeTurn() {
    this.data.player =
      this.data.player === TTTPlayer.X ? TTTPlayer.O : TTTPlayer.X;
    return this;
  }

  public play(index: number) {
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

  public set(index: number, value: TTTPlayer) {
    if ("number" !== typeof index) throw new Error("Index must be a number.");
    if (index < 0 || index > 8)
      throw new Error("Index must be between 0 and 8.");
    this.data.board[index] = value;
    return this;
  }

  public get(index: number) {
    if ("number" !== typeof index) throw new Error("Index must be a number.");
    if (index < 0 || index > 8)
      throw new Error("Index must be between 0 and 8.");
    return this.data.board[index];
  }

  public checkWin() {
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
      if (
        board[a] !== TTTPlayer.Empty &&
        board[a] === board[b] &&
        board[a] === board[c]
      ) {
        return combination;
      }
    }

    return null;
  }

  public checkTie() {
    return (
      !this.checkWin() && this.data.board.every((v) => v !== TTTPlayer.Empty)
    );
  }

  public toJSON() {
    return {
      board: this.data.board,
      player: this.data.player,
    };
  }
}
