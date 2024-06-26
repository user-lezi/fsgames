export interface EmbedData {
    color: number;
    footer: string;
    timestamp: boolean;
    title: string;
}
export interface MessageData {
    turn: string;
    tie: string;
    win: string;
    forfeit: string;
}
export interface ButtonData {
    forfeit: string;
    end: string;
}
export declare const GameConfigs: {
    0: {
        name: string;
        description: string;
        emojis: {
            x: string;
            o: string;
            empty: string;
        };
        timeout: number;
        embed: EmbedData;
        message: MessageData;
        button: ButtonData;
    };
    1: {
        name: string;
        description: string;
        emojis: {
            rock: string;
            paper: string;
            scissor: string;
        };
        timeout: number;
        embed: EmbedData;
        message: MessageData;
        button: ButtonData;
    };
};
//# sourceMappingURL=GameConfigs.d.ts.map