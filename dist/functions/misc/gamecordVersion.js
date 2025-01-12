"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const forgescript_1 = require("@tryforge/forgescript");
exports.default = new forgescript_1.NativeFunction({
    name: "$gamecordVersion",
    version: "1.0.0",
    description: "Returns the discord-gamecord version.",
    output: forgescript_1.ArgType.String,
    unwrap: false,
    execute() {
        return this.success(require("discord-gamecord").version);
    },
});
//# sourceMappingURL=gamecordVersion.js.map