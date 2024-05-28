import { ArgType, NativeFunction } from "@tryforge/forgescript";
import { BaseGame } from "../games/BaseGame";

export default new NativeFunction({
  name: "$gameMessageId",
  version: "1.0.0",
  description: "Get the game message id from a game event.",
  unwrap: false,
  async execute(ctx) {
    return this.success((ctx.runtime.extras as BaseGame)?.gameMessage?.id);
  },
});
