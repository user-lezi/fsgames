import { ArgType, NativeFunction, EnumLike } from "@tryforge/forgescript";
import { BaseGame } from "../games/BaseGame";
export type Properties<Enum extends EnumLike, Type> = {
    [P in keyof Enum]: (v?: Type | null, sep?: string | null, index?: number | null) => any;
};
export declare enum GameStateProperty {
    user = "user",
    move = "move",
    state = "state"
}
export declare const GameStateProperties: Properties<typeof GameStateProperty, BaseGame>;
declare const _default: NativeFunction<[{
    name: string;
    description: string;
    type: ArgType.Enum;
    required: true;
    rest: false;
    enum: typeof GameStateProperty;
}], true>;
export default _default;
//# sourceMappingURL=gameState.d.ts.map