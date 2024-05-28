import { ArgType, NativeFunction } from "@tryforge/forgescript";
import { BaseGame } from "../games/BaseGame";

export default new NativeFunction({
  name: "$gameStartTime",
  version: "1.0.0",
  description:
    "Get the timestamp when the game started (in ms) from a game event.",
  unwrap: false,
  async execute(ctx) {
    return this.success((ctx.runtime.extras as BaseGame)?.timestamp);
  },
});
