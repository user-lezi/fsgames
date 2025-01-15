"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const forgescript_1 = require("@tryforge/forgescript");
exports.default = new forgescript_1.NativeFunction({
    name: "$setConnect4GameEmbed",
    aliases: ["$setConnect4Embed"],
    version: "1.0.0",
    description: "Sets the Connect 4 game options for embed property",
    unwrap: true,
    args: [
        forgescript_1.Arg.requiredString("property", "The embed property to set as"),
        forgescript_1.Arg.optionalString("value", "The value to set as. (Leave Blank for the default one)"),
    ],
    brackets: true,
    async execute(ctx, [prop, val]) {
        let opts = ctx.getEnvironmentKey("__c4__game__options__");
        if (typeof opts !== "object")
            return this.customError("Not Allowed. Try to use in $startConnect4");
        switch (prop.toLowerCase()) {
            case "title":
            case "statusTitle":
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
        ctx.setEnvironmentKey("__c4__game__options__", opts);
        return this.success();
    },
});
//# sourceMappingURL=setConnect4GameEmbed.js.map