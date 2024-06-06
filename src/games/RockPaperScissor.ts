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

export interface IRPSOptions {
  user1: User;
  user2: User;
}

export class RockPaperScissorGame extends BaseGame {
  public game = new RockPaperScissor();

  constructor(
    ctx: Context,
    public options: IRPSOptions,
  ) {
    super(ctx, GameType.RockPaperScissor);

    this.makeEmbed(
      `> **<@${options.user1.id}> vs <@${options.user2.id}>**\n${this.parseText(
        this.config.message.turn,
        {
          username: this.turnUser.username,
          id: this.turnUser.id,
        },
      )}`,
    );
    this.ctx.container.components = this.buttons();
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
      let move = customId.split("_")[1];
      game.play(move as RPSMove, game.data.player);

      that.lastMove = {
        move,
        user: i.user,
        state: game.checkWin() ? "win" : game.checkTie() ? "tie" : "ongoing",
        played: move,
      };
      that.emitGameUpdate();

      if (game.checkWin() !== null) {
        let winner = game.checkWin() ? that.options.user2 : that.options.user1;

        that.makeEmbed(
          that.parseText(that.config.message.win, {
            username: winner.username,
            id: winner.id,
            emoji: that.emojis[move],
          }),
        );
        that.ctx.container.components = that.buttons(true);
        collector.stop("win");
      }
      if (game.checkTie()) {
        that.makeEmbed(that.parseText(that.config.message.tie));
        that.ctx.container.components = that.buttons(true);
        collector.stop("tie");
      } else {
        that.makeEmbed(
          `> **<@${that.options.user1.id}> vs <@${that.options.user2.id}>**\n${that.parseText(
            that.config.message.turn,
            {
              username: that.turnUser.username,
              id: that.turnUser.id,
            },
          )}`,
        );
        that.ctx.container.components = that.buttons();
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

  private buttons(disabled = false) {
    let row = new ActionRowBuilder<ButtonBuilder>();
    for (let move in this.emojis) {
      let button = new ButtonBuilder()
        .setCustomId("rps_" + move)
        .setEmoji(this.emojis[move])
        .setStyle(ButtonStyle.Secondary)
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
export enum RPSMove {
  Rock = "rock",
  Paper = "paper",
  Scissor = "scissor",
  Empty = "empty",
}

export interface IRPS {
  player: 0 | 1;
  game: RPSMove[];
}
export class RockPaperScissor {
  public data: IRPS;
  constructor() {
    this.data = {
      player: 0,
      game: [RPSMove.Empty, RPSMove.Empty],
    };
  }

  public changeTurn() {
    this.data.player = this.data.player === 0 ? 1 : 0;
    return this;
  }

  public play(move: RPSMove, player: IRPS["player"]) {
    if (this.data.game[player] !== RPSMove.Empty) {
      throw new Error("Invalid move: Player already played.");
    }
    this.data.game[player] = move;
    this.changeTurn();
    return this;
  }

  public checkWin() {
    if (
      this.data.game[0] === RPSMove.Empty ||
      this.data.game[1] == RPSMove.Empty ||
      this.data.game[0] == this.data.game[1]
    )
      return null;
    let user1 = [
      [RPSMove.Rock, RPSMove.Scissor],
      [RPSMove.Paper, RPSMove.Rock],
      [RPSMove.Scissor, RPSMove.Paper],
    ].includes(this.data.game);

    return user1 ? 0 : 1;
  }

  public checkTie() {
    return (
      this.data.game[0] !== RPSMove.Empty &&
      this.data.game[0] === this.data.game[1]
    );
  }

  public toJSON() {
    return {
      player: this.data.player,
      game: this.data.game,
    };
  }
}
