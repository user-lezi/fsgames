"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const forgescript_1 = require("@tryforge/forgescript");
const __1 = require("..");
const RockPaperScissor_1 = require("../games/RockPaperScissor");
exports.default = new forgescript_1.NativeFunction({
    name: "$startRockPaperScissor",
    version: "1.0.0",
    description: "Start a Rock Paper Scissor game.",
    unwrap: true,
    args: [
        {
            name: "user1",
            description: "The user to play with.",
            type: forgescript_1.ArgType.User,
            rest: false,
            required: true,
        },
        {
            name: "user2",
            description: "The user to play with.",
            type: forgescript_1.ArgType.User,
            rest: false,
            required: true,
        },
    ],
    brackets: true,
    async execute(ctx, [user1, user2]) {
        if (!user1)
            return this.customError("Couldn't find user1.");
        if (!user2)
            return this.customError("Couldn't find user2.");
        let game = new RockPaperScissor_1.RockPaperScissorGame(ctx, { user1, user2 });
        __1.FSGames.New(game);
        return this.success(game.id);
    },
});
//# sourceMappingURL=startRockPaperScissor.js.map