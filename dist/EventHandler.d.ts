import { BaseEventHandler, ForgeClient } from "@tryforge/forgescript";
import { BaseGame } from "./games/BaseGame";
export interface GameEvents {
    gameStart: [BaseGame];
    gameEnd: [BaseGame, ...any[]];
    gameUpdate: [BaseGame];
}
export declare class GamesEventHandler<T extends keyof GameEvents> extends BaseEventHandler<GameEvents, T> {
    register(client: ForgeClient): void;
}
export declare const HandlerName: string;
//# sourceMappingURL=EventHandler.d.ts.map