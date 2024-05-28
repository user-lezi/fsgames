"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const forgescript_1 = require("@tryforge/forgescript");
exports.default = new forgescript_1.NativeFunction({
    name: "$gameStartTime",
    version: "1.0.0",
    description: "Get the timestamp when the game started (in ms) from a game event.",
    unwrap: false,
    async execute(ctx) {
        return this.success(ctx.runtime.extras?.timestamp);
    },
});
//# sourceMappingURL=gameStartTime.js.map