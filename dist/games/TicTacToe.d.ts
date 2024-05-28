import { BaseGame, GameType } from "./BaseGame";
import { Context } from "@tryforge/forgescript";
import { User } from "discord.js";
export interface ITicTacToeOptions {
    user1: User;
    user2: User;
}
export declare class TicTacToeGame extends BaseGame {
    options: ITicTacToeOptions;
    game: TicTacToe;
    constructor(ctx: Context, options: ITicTacToeOptions);
    init(): Promise<void>;
    get turnUser(): User;
    private boardButtons;
    toJSON(): {
        game: {
            board: TTTPlayer[];
            player: TTTPlayer;
        };
        players: string[];
        id: string;
        type: GameType;
        timestamp: number;
        gameMessage: string | undefined;
    };
}
declare enum TTTPlayer {
    X = 0,
    O = 1,
    Empty = 2
}
export interface ITicTacToe {
    board: TTTPlayer[];
    player: TTTPlayer;
}
export declare class TicTacToe {
    data: ITicTacToe;
    constructor();
    changeTurn(): this;
    play(index: number): {
        win: boolean;
        tie: boolean;
    };
    set(index: number, value: TTTPlayer): this;
    get(index: number): TTTPlayer;
    checkWin(): number[] | null;
    checkTie(): boolean;
    toJSON(): {
        board: TTTPlayer[];
        player: TTTPlayer;
    };
}
export {};
//# sourceMappingURL=TicTacToe.d.ts.map