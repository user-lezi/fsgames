"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const forgescript_1 = require("@tryforge/forgescript");
exports.default = new forgescript_1.NativeFunction({
    name: "$gameEndReason",
    version: "1.0.0",
    description: "Get the game end reason from a game event.",
    unwrap: false,
    async execute(ctx) {
        return this.success(ctx.runtime.extras?._endReason || "null");
    },
});
//# sourceMappingURL=gameEndReason.js.map