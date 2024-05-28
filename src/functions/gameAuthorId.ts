import { ArgType, NativeFunction } from "@tryforge/forgescript";
import { BaseGame } from "../games/BaseGame";

export default new NativeFunction({
  name: "$gameAuthorId",
  version: "1.0.0",
  description: "Get the id of the user who started the game from a game event.",
  unwrap: false,
  async execute(ctx) {
    return this.success((ctx.runtime.extras as BaseGame)?.user?.id);
  },
});
