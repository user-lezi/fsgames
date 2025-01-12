"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const forgescript_1 = require("@tryforge/forgescript");
const typings_1 = require("../../../../typings");
exports.default = new forgescript_1.NativeFunction({
    name: "$set2048GameButtonStyle",
    aliases: ["$set2048ButtonStyle"],
    version: "1.0.0",
    description: "Sets the 2048 game options for buttonStyle property",
    unwrap: true,
    args: [
        forgescript_1.Arg.optionalEnum(typings_1.ButtonColors, "Button Color", "The color of the button."),
    ],
    brackets: true,
    async execute(ctx, [btn]) {
        let opts = ctx.getEnvironmentKey("__2048__game__options__");
        if (typeof opts !== "object")
            return this.customError("Not Allowed. Try to use in $start2048");
        if (btn)
            opts.buttonStyle = btn;
        else
            opts.buttonStyle = typings_1.ButtonColors.Blurple;
        ctx.setEnvironmentKey("__2048__game__options__", opts);
        return this.success();
    },
});
//# sourceMappingURL=set2048GameButtonStyle.js.map