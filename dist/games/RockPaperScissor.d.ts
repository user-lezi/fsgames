import { BaseGame, GameType } from "./BaseGame";
import { Context } from "@tryforge/forgescript";
import { User } from "discord.js";
export interface IRPSOptions {
    user1: User;
    user2: User;
}
export declare class RockPaperScissorGame extends BaseGame {
    options: IRPSOptions;
    game: RockPaperScissor;
    constructor(ctx: Context, options: IRPSOptions);
    init(): Promise<void>;
    private buttons;
    get turnUser(): User;
    toJSON(): {
        game: {
            player: 0 | 1;
            game: RPSMove[];
        };
        players: string[];
        id: string;
        type: GameType;
        timestamp: number;
        gameMessage: string | undefined;
    };
}
export declare enum RPSMove {
    Rock = "rock",
    Paper = "paper",
    Scissor = "scissor",
    Empty = "empty"
}
export interface IRPS {
    player: 0 | 1;
    game: RPSMove[];
}
export declare class RockPaperScissor {
    data: IRPS;
    constructor();
    changeTurn(): this;
    play(move: RPSMove, player: IRPS["player"]): this;
    checkWin(): 0 | 1 | null;
    checkTie(): boolean;
    toJSON(): {
        player: 0 | 1;
        game: RPSMove[];
    };
}
//# sourceMappingURL=RockPaperScissor.d.ts.map