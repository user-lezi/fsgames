"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const forgescript_1 = require("@tryforge/forgescript");
const typings_1 = require("../../../../typings");
exports.default = new forgescript_1.NativeFunction({
    name: "$setConnect4GameButtonStyle",
    aliases: ["$setConnect4ButtonStyle"],
    version: "1.0.0",
    description: "Sets the Connect 4 game options for buttonStyle property",
    unwrap: true,
    args: [
        forgescript_1.Arg.optionalEnum(typings_1.ButtonColors, "Button Color", "The color of the button."),
    ],
    brackets: true,
    async execute(ctx, [btn]) {
        let opts = ctx.getEnvironmentKey("__c4__game__options__");
        if (typeof opts !== "object")
            return this.customError("Not Allowed. Try to use in $startConnect4");
        if (btn)
            opts.buttonStyle = btn;
        else
            opts.buttonStyle = typings_1.ButtonColors.Blurple;
        ctx.setEnvironmentKey("__c4__game__options__", opts);
        return this.success();
    },
});
//# sourceMappingURL=setConnect4GameButtonStyle.js.map