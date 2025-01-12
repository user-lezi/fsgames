"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const forgescript_1 = require("@tryforge/forgescript");
exports.default = new forgescript_1.NativeFunction({
    name: "$set2048GameEmbed",
    aliases: ["$set2048Embed"],
    version: "1.0.0",
    description: "Sets the 2048 game options for embeds property",
    unwrap: true,
    args: [
        forgescript_1.Arg.requiredString("property", "The embed property to set as"),
        forgescript_1.Arg.optionalString("value", "The value to set as. (Leave Blank for the defualt one)"),
    ],
    brackets: true,
    async execute(ctx, [prop, val]) {
        let opts = ctx.getEnvironmentKey("__2048__game__options__");
        if (typeof opts !== "object")
            return this.customError("Not Allowed. Try to use in $start2048");
        switch (prop.toLowerCase()) {
            case "title":
            case "color":
                break;
            default:
                return this.customError("Invalid property: " + prop);
        }
        if (!opts.embed)
            opts.embed = {};
        if (val)
            opts.embed[prop.toLowerCase()] = val;
        else
            delete opts.embed[prop.toLowerCase()];
        ctx.setEnvironmentKey("__2048__game__options__", opts);
        return this.success();
    },
});
//# sourceMappingURL=set2048GameEmbed.js.map