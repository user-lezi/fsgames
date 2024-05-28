import { Context } from "@tryforge/forgescript";
import { BaseInteraction, Message } from "discord.js";
export enum GameType {
  TicTacToe,
}
import { GameConfigs } from "../GameConfigs";
import { FSGames } from "..";

export class BaseGame {
  public id: string;
  public timestamp: number;
  public gameMessage: Message | null = null;
  public lastMove: any = null;
  constructor(
    public readonly ctx: Context,
    public readonly type: GameType,
  ) {
    this.id = FSGames.createGameID(this);
    this.timestamp = Date.now();
  }

  emitGameStart() {
    this.ctx.client.getExtension(FSGames, true).emitter.emit("gameStart", this);
  }
  emitGameEnd<T = any>(...args: T[]) {
    this.ctx.client
      .getExtension(FSGames, true)
      .emitter.emit("gameEnd", this, ...args);
  }
  emitGameUpdate() {
    this.ctx.client
      .getExtension(FSGames, true)
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
    return GameConfigs[this.type];
  }

  isInteraction() {
    return !!this.ctx.interaction;
  }

  isTicTacToe() {
    return this.type === GameType.TicTacToe;
  }

  parseText(text: string, moreOpts: { [key: string]: any } = {}) {
    let opts = {
      authorName: this.user?.username,

      gameName: this.config.name,
      gameId: this.id,
      ...moreOpts,
    };

    return text.replace(
      /{\w+}/g,
      (match: string) =>
        (opts[match.slice(1, -1) as keyof typeof opts] as string) ?? match,
    );
  }

  makeEmbed(content: string) {
    this.ctx.container.reset();
    this.ctx.container
      .embed(0)
      .setTitle(this.parseText(this.config.embed.title))
      .setColor(this.config.embed.color)
      .setDescription(content)
      .setFooter({
        text: this.parseText(this.config.embed.footer),
      });
    if (this.config.embed.timestamp) this.ctx.container.embed(0).setTimestamp();
    return this.ctx.container.embed(0);
  }

  send<T = unknown>(
    edit: boolean = false,
    editMessage: Message | null = null,
    reset: boolean = true,
  ): Promise<T> {
    let promise: any;
    this.ctx.container.edit = edit;
    if (this.isInteraction()) {
      promise = this.ctx.container.send(this.interaction as BaseInteraction);
    } else {
      promise = this.ctx.container.send(
        edit && editMessage
          ? (editMessage as Message)
          : (this.message as Message),
      );
    }
    if (reset) this.ctx.container.reset();
    return promise;
  }

  toJSON(properties: object = {}) {
    return {
      id: this.id,
      type: this.type,
      timestamp: this.timestamp,
      gameMessage: this.gameMessage?.id,
      ...properties,
    };
  }
}
