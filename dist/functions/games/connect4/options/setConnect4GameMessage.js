"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const forgescript_1 = require("@tryforge/forgescript");
exports.default = new forgescript_1.NativeFunction({
    name: "$setConnect4GameMessage",
    aliases: ["$setConnect4Message"],
    version: "1.0.0",
    description: "Sets the Connect 4 game options for message property",
    unwrap: true,
    args: [
        forgescript_1.Arg.requiredString("property", "The message property to set as"),
        forgescript_1.Arg.optionalString("value", "The value to set as. (Leave Blank for the default one)"),
    ],
    brackets: true,
    async execute(ctx, [prop, val]) {
        let opts = ctx.getEnvironmentKey("__c4__game__options__");
        if (typeof opts !== "object")
            return this.customError("Not Allowed. Try to use in $startConnect4");
        switch (prop.toLowerCase()) {
            case "turnMessage":
            case "winMessage":
            case "tieMessage":
            case "timeoutMessage":
            case "requestMessage":
            case "rejectMessage":
                break;
            default:
                return this.customError("Invalid property: " + prop);
        }
        if (val)
            opts[prop.toLowerCase()] = val;
        else
            delete opts[prop.toLowerCase()];
        ctx.setEnvironmentKey("__c4__game__options__", opts);
        return this.success();
    },
});
//# sourceMappingURL=setConnect4GameMessage.js.map