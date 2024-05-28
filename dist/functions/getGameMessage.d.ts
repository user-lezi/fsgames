import { ArgType, NativeFunction, EnumLike } from "@tryforge/forgescript";
export type Properties<Enum extends EnumLike, Type> = {
    [P in keyof Enum]: (v?: Type | null, sep?: string | null, index?: number | null) => null | undefined | string | number | boolean;
};
declare enum MessageProperty {
    id = "id",
    content = "content",
    flags = "flags",
    username = "username",
    type = "type",
    channelID = "channelID",
    guildID = "guildID",
    authorID = "authorID",
    timestamp = "timestamp"
}
declare const _default: NativeFunction<[{
    name: string;
    description: string;
    rest: false;
    type: ArgType.Enum;
    enum: typeof MessageProperty;
    required: true;
}, {
    name: string;
    description: string;
    rest: false;
    type: ArgType.String;
}], true>;
export default _default;
//# sourceMappingURL=getGameMessage.d.ts.map