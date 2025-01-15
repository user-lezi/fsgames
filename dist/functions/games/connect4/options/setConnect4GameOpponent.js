"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const forgescript_1 = require("@tryforge/forgescript");
exports.default = new forgescript_1.NativeFunction({
    name: "$setConnect4GameOpponent",
    aliases: ["$setConnect4Opponent"],
    version: "1.0.0",
    description: "Sets the Connect 4 game options for opponent property",
    unwrap: true,
    args: [forgescript_1.Arg.requiredUser("opponent", "The id of the opponent")],
    brackets: true,
    async execute(ctx, [opp]) {
        let opts = ctx.getEnvironmentKey("__c4__game__options__");
        if (typeof opts !== "object")
            return this.customError("Not Allowed. Try to use in $startConnect4");
        opts.opponent = opp.id;
        ctx.setEnvironmentKey("__c4__game__options__", opts);
        return this.success();
    },
});
//# sourceMappingURL=setConnect4GameOpponent.js.map