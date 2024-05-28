import {
  ForgeClient,
  ForgeExtension,
  EventManager,
} from "@tryforge/forgescript";
import { TypedEmitter } from "tiny-typed-emitter";
import { BaseGame } from "./games/BaseGame";

export * from "./games";
export * from "./GameConfigs";

import { GameEvents, HandlerName } from "./EventHandler";
import { GamesCommandManager } from "./CommandManager";

export interface Games {
  [key: string]: BaseGame;
}

export interface IFSGamesOption {
  events: (keyof GameEvents)[];
}

export type TransformEvents<T> = {
  [P in keyof T]: T[P] extends any[] ? (...args: T[P]) => any : never;
};

export class FSGames extends ForgeExtension {
  public static games: Games = {};
  public static Client: ForgeClient | null = null;
  public name: string = "FSGames";
  public description: string = "Play games through your  ForgeScript bot.";
  public version: string = "1.0.0";

  public commands: GamesCommandManager | null = null;
  public emitter = new TypedEmitter<TransformEvents<GameEvents>>();

  public constructor(public options: Partial<IFSGamesOption> = {}) {
    super();
  }

  public init(client: ForgeClient): void {
    this.commands = new GamesCommandManager(client);
    FSGames.games = {} as Games;
    FSGames.Client = client;
    EventManager.load(HandlerName, __dirname + "/events");
    this.load(__dirname + "/functions");

    if (this.options.events?.length) {
      client.events.load(HandlerName, this.options.events);
    }
  }

  public static New(game: BaseGame) {
    return (FSGames.games[game.id] = game);
  }

  public static Get(id: string) {
    return FSGames.games[id];
  }

  public static Delete(id: string) {
    delete FSGames.games[id];
  }

  public static createGameID(game: BaseGame) {
    return `${game.type}-${(Math.floor(Date.now() / 1000) - Math.floor(Math.random() * 1_000_00)).toString(16)}`;
  }
}
