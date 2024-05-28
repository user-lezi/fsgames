import { ArgType, NativeFunction } from "@tryforge/forgescript";

export default new NativeFunction({
  name: "$gameEndReason",
  version: "1.0.0",
  description: "Get the game end reason from a game event.",
  unwrap: false,
  async execute(ctx) {
    return this.success((ctx.runtime.extras as any)?._endReason || "null");
  },
});
