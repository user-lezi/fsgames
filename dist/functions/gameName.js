"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const forgescript_1 = require("@tryforge/forgescript");
exports.default = new forgescript_1.NativeFunction({
    name: "$gameName",
    version: "1.0.0",
    description: "Get the game name from a game event.",
    unwrap: false,
    async execute(ctx) {
        return this.success(ctx.runtime.extras?.config?.name);
    },
});
//# sourceMappingURL=gameName.js.map