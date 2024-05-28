import { BaseEventHandler, ForgeClient } from "@tryforge/forgescript";
import { BaseGame } from "./games/BaseGame";
import { FSGames } from "./";

export interface GameEvents {
  gameStart: [BaseGame];
  gameEnd: [BaseGame, ...any[]];
  gameUpdate: [BaseGame];
}

export class GamesEventHandler<
  T extends keyof GameEvents,
> extends BaseEventHandler<GameEvents, T> {
  public register(client: ForgeClient) {
    client
      .getExtension(FSGames, true)
      .emitter.on(this.name, this.listener.bind(client) as any);
  }
}

export const HandlerName: string = "FSGamesHandler";
