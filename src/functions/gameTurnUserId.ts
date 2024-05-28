import { ArgType, NativeFunction } from "@tryforge/forgescript";

export default new NativeFunction({
  name: "$gameTurnUserId",
  version: "1.0.0",
  description: "Get the user id of the current player from a game event.",
  unwrap: false,
  async execute(ctx) {
    return this.success((ctx.runtime.extras as any)?.turnUser?.id);
  },
});
