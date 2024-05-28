import { ForgeClient, ForgeExtension } from "@tryforge/forgescript";
import { TypedEmitter } from "tiny-typed-emitter";
import { BaseGame } from "./games/BaseGame";
export * from "./games";
export * from "./GameConfigs";
import { GameEvents } from "./EventHandler";
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
export declare class FSGames extends ForgeExtension {
    options: Partial<IFSGamesOption>;
    static games: Games;
    static Client: ForgeClient | null;
    name: string;
    description: string;
    version: string;
    commands: GamesCommandManager | null;
    emitter: TypedEmitter<TransformEvents<GameEvents>>;
    constructor(options?: Partial<IFSGamesOption>);
    init(client: ForgeClient): void;
    static New(game: BaseGame): BaseGame;
    static Get(id: string): BaseGame;
    static Delete(id: string): void;
    static createGameID(game: BaseGame): string;
}
//# sourceMappingURL=index.d.ts.map