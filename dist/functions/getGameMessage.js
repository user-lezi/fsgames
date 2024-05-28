"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const forgescript_1 = require("@tryforge/forgescript");
const discord_js_1 = require("discord.js");
function defineProperties(props) {
    return props;
}
var MessageProperty;
(function (MessageProperty) {
    MessageProperty["id"] = "id";
    MessageProperty["content"] = "content";
    MessageProperty["flags"] = "flags";
    MessageProperty["username"] = "username";
    MessageProperty["type"] = "type";
    MessageProperty["channelID"] = "channelID";
    MessageProperty["guildID"] = "guildID";
    MessageProperty["authorID"] = "authorID";
    MessageProperty["timestamp"] = "timestamp";
})(MessageProperty || (MessageProperty = {}));
const MessageProperties = defineProperties({
    content: (m) => m?.content,
    id: (m) => m?.id,
    flags: (m, sep) => m?.flags.toArray().join(sep || ", "),
    channelID: (m) => m?.channelId,
    guildID: (m) => m?.guildId,
    type: (m) => (m ? discord_js_1.MessageType[m.type] : undefined),
    username: (m) => m?.author?.username,
    authorID: (m) => m?.author?.id,
    timestamp: (m) => m?.createdTimestamp,
});
exports.default = new forgescript_1.NativeFunction({
    name: "$getGameMessage",
    version: "1.0.0",
    description: "Get the data from the game message in a game event.",
    unwrap: true,
    brackets: true,
    args: [
        {
            name: "property",
            description: "The property to pull",
            rest: false,
            type: forgescript_1.ArgType.Enum,
            enum: MessageProperty,
            required: true,
        },
        {
            name: "separator",
            description: "Separator to use in case of array",
            rest: false,
            type: forgescript_1.ArgType.String,
        },
    ],
    async execute(ctx, [prop, sep]) {
        return this.success(MessageProperties[prop](ctx.runtime.extras?.gameMessage, sep || ", "));
    },
});
//# sourceMappingURL=getGameMessage.js.map