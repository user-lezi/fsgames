"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const forgescript_1 = require("@tryforge/forgescript");
const constants_1 = require("@tryforge/forgescript/dist/constants");
exports.default = new forgescript_1.NativeFunction({
    name: "$set2048GameTimeout",
    aliases: ["$set2048Timeout"],
    version: "1.0.0",
    description: "Sets the 2048 game options for timeout property",
    unwrap: true,
    args: [forgescript_1.Arg.optionalString("duration", "The timeout duration")],
    brackets: true,
    async execute(ctx, [dur]) {
        let opts = ctx.getEnvironmentKey("__2048__game__options__");
        if (typeof opts !== "object")
            return this.customError("Not Allowed. Try to use in $start2048");
        if (dur)
            try {
                opts.timeoutTime = constants_1.TimeParser.parseToMS(dur);
            }
            catch {
                return this.customError("Invalid durataion");
            }
        else
            opts.timeoutTime = 60000;
        if (opts.timeoutTime < 1)
            opts.timeoutTime = 60000;
        ctx.setEnvironmentKey("__2048__game__options__", opts);
        return this.success();
    },
});
//# sourceMappingURL=set2048GameTimeout.js.map