"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const forgescript_1 = require("@tryforge/forgescript");
exports.default = new forgescript_1.NativeFunction({
    name: "$set2048GameEmoji",
    aliases: ["$set2048Emoji"],
    version: "1.0.0",
    description: "Sets the 2048 game options for emojis property",
    unwrap: true,
    args: [
        forgescript_1.Arg.requiredString("property", "The emojis property to set as"),
        forgescript_1.Arg.optionalString("value", "The value to set as. (Leave Blank for the default one)"),
    ],
    brackets: true,
    async execute(ctx, [prop, val]) {
        let opts = ctx.getEnvironmentKey("__2048__game__options__");
        if (typeof opts !== "object")
            return this.customError("Not Allowed. Try to use in $start2048");
        switch (prop.toLowerCase()) {
            case "up":
            case "down":
            case "left":
            case "right":
                break;
            default:
                return this.customError("Invalid property: " + prop);
        }
        if (!opts.emojis)
            opts.emojis = {};
        if (val)
            opts.emojis[prop.toLowerCase()] = val;
        else
            delete opts.emojis[prop.toLowerCase()];
        ctx.setEnvironmentKey("__2048__game__options__", opts);
        return this.success();
    },
});
//# sourceMappingURL=set2048GameEmoji.js.map