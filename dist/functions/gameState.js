"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GameStateProperties = exports.GameStateProperty = void 0;
const forgescript_1 = require("@tryforge/forgescript");
const BaseGame_1 = require("../games/BaseGame");
function defineProperties(props) {
    return props;
}
var GameStateProperty;
(function (GameStateProperty) {
    GameStateProperty["user"] = "user";
    GameStateProperty["move"] = "move";
    GameStateProperty["state"] = "state";
})(GameStateProperty || (exports.GameStateProperty = GameStateProperty = {}));
exports.GameStateProperties = defineProperties({
    user: (g) => g?.lastMove?.user?.id,
    move: (g) => g?.lastMove?.move,
    state: (g) => g?.lastMove?.state,
});
exports.default = new forgescript_1.NativeFunction({
    name: "$gameState",
    version: "1.0.0",
    description: "Get the game state from a game event.",
    unwrap: true,
    brackets: true,
    args: [
        {
            name: "property",
            description: "The property to get from the game state.",
            type: forgescript_1.ArgType.Enum,
            required: true,
            rest: false,
            enum: GameStateProperty,
        },
    ],
    async execute(ctx, [prop]) {
        let game = ctx.runtime.extras;
        let allAvailableProperties = {
            [BaseGame_1.GameType.TicTacToe]: [
                GameStateProperty.user,
                GameStateProperty.move,
                GameStateProperty.state,
            ],
            [BaseGame_1.GameType.RockPaperScissor]: [
                GameStateProperty.user,
                GameStateProperty.move,
                GameStateProperty.state,
            ],
        };
        let gameType = game.type;
        let availableProperties = allAvailableProperties[gameType];
        if (!availableProperties.includes(prop)) {
            return this.customError(`Invalid property \`${prop}\` for game type \`${gameType}\`! Available: \`${availableProperties.join(", ")}\``);
        }
        let returnValue;
        if (BaseGame_1.GameType.TicTacToe === gameType) {
            let value = exports.GameStateProperties[prop](game);
            if (prop == "move") {
                let row = Math.floor(value / 3) + 1;
                let col = (value % 3) + 1;
                value = game.lastMove?.played + row + col;
            }
            else if (prop == "state") {
                value = value?.win ? "win" : value?.tie ? "tie" : "ongoing";
            }
            returnValue = value;
        }
        else if (BaseGame_1.GameType.RockPaperScissor === gameType) {
            let value = exports.GameStateProperties[prop](game);
            returnValue = value;
        }
        return this.success(returnValue);
    },
});
//# sourceMappingURL=gameState.js.map