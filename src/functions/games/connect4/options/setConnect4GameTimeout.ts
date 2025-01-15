import { Arg, NativeFunction } from "@tryforge/forgescript";
import { IConnect4GameOptions } from "../../../../typings";
import { TimeParser } from "@tryforge/forgescript/dist/constants";

// type PROPS = keyof IConnect4GameOptions["emojis"];
export default new NativeFunction({
  name: "$setConnect4GameTimeout",
  aliases: ["$setConnect4Timeout"],
  version: "1.0.0",
  description: "Sets the Connect 4 game options for timeout property",
  unwrap: true,
  args: [Arg.optionalString("duration", "The timeout duration")],
  brackets: true,
  async execute(ctx, [dur]) {
    let opts = ctx.getEnvironmentKey(
      "__c4__game__options__",
    ) as IConnect4GameOptions;
    if (typeof opts !== "object")
      return this.customError("Not Allowed. Try to use in $startConnect4");

    if (dur)
      try {
        opts.timeoutTime = TimeParser.parseToMS(dur);
      } catch {
        return this.customError("Invalid durataion");
      }
    else opts.timeoutTime = 60000;
    if (opts.timeoutTime < 1) opts.timeoutTime = 60000;
    ctx.setEnvironmentKey("__c4__game__options__", opts);
    return this.success();
  },
});
