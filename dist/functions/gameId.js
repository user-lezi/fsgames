"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const forgescript_1 = require("@tryforge/forgescript");
exports.default = new forgescript_1.NativeFunction({
    name: "$gameId",
    version: "1.0.0",
    description: "Get the game id from a game event.",
    unwrap: false,
    async execute(ctx) {
        return this.success(ctx.runtime.extras?.id);
    },
});
//# sourceMappingURL=gameId.js.map