import { Context } from "@tryforge/forgescript";
import { Message } from "discord.js";
export declare enum GameType {
    TicTacToe = 0,
    RockPaperScissor = 1
}
export declare class BaseGame {
    readonly ctx: Context;
    readonly type: GameType;
    id: string;
    timestamp: number;
    gameMessage: Message | null;
    lastMove: any;
    constructor(ctx: Context, type: GameType);
    emitGameStart(): void;
    emitGameEnd<T = any>(...args: T[]): void;
    emitGameUpdate(): void;
    get user(): import("discord.js").User | null;
    get interaction(): import("discord.js").Interaction | null;
    get message(): Message<any> | null;
    get config(): {
        name: string;
        description: string;
        emojis: {
            x: string;
            o: string;
            empty: string;
        };
        timeout: number;
        embed: import("..").EmbedData;
        message: import("..").MessageData;
        button: import("..").ButtonData;
    } | {
        name: string;
        description: string;
        emojis: {
            rock: string;
            paper: string;
            scissor: string;
        };
        timeout: number;
        embed: import("..").EmbedData;
        message: import("..").MessageData;
        button: import("..").ButtonData;
    };
    get emojis(): {
        [key: string]: string;
    };
    isInteraction(): boolean;
    isTicTacToe(): boolean;
    isRockPaperScissor(): boolean;
    parseText(text: string, moreOpts?: {
        [key: string]: any;
    }): string;
    makeEmbed(content: string): import("discord.js").EmbedBuilder;
    send<T = unknown>(edit?: boolean, editMessage?: Message | null, reset?: boolean): Promise<T>;
    toJSON(properties?: object): {
        id: string;
        type: GameType;
        timestamp: number;
        gameMessage: string | undefined;
    };
}
//# sourceMappingURL=BaseGame.d.ts.map