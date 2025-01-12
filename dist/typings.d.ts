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
//# sourceMappingURL=typings.d.ts.map