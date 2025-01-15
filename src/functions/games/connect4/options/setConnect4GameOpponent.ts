import { Arg, NativeFunction } from "@tryforge/forgescript";
import { IConnect4GameOptions } from "../../../../typings";

// type PROPS = keyof IConnect4GameOptions["emojis"];
export default new NativeFunction({
  name: "$setConnect4GameOpponent",
  aliases: ["$setConnect4Opponent"],
  version: "1.0.0",
  description: "Sets the Connect 4 game options for opponent property",
  unwrap: true,
  args: [Arg.requiredUser("opponent", "The id of the opponent")],
  brackets: true,
  async execute(ctx, [opp]) {
    let opts = ctx.getEnvironmentKey(
      "__c4__game__options__",
    ) as IConnect4GameOptions;
    if (typeof opts !== "object")
      return this.customError("Not Allowed. Try to use in $startConnect4");

    opts.opponent = opp.id;
    ctx.setEnvironmentKey("__c4__game__options__", opts);
    return this.success();
  },
});
