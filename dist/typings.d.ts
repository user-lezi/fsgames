export declare enum ButtonColors {
    Blurple = "PRIMARY",
    Grey = "SECONDARY",
    Green = "SUCCESS",
    Red = "DANGER"
}
export interface I2048GameOptions {
    embed: {
        title: string;
        color: string;
    };
    emojis: {
        up: string;
        down: string;
        left: string;
        right: string;
    };
    timeoutTime: number;
    buttonStyle: ButtonColors;
}
export interface IConnect4GameOptions {
    opponent: string;
    embed: {
        title: string;
        statusTitle: string;
        color: string;
    };
    emojis: {
        board: string;
        player1: string;
        player2: string;
    };
    timeoutTime: number;
    buttonStyle: ButtonColors;
    turnMessage: string;
    winMessage: string;
    tieMessage: string;
    timeoutMessage: string;
    requestMessage: string;
    rejectMessage: string;
}
//# sourceMappingURL=typings.d.ts.map