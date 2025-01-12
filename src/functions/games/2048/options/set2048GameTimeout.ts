import { Arg, NativeFunction } from "@tryforge/forgescript";
import { I2048GameOptions } from "../../../../typings";
import { TimeParser } from "@tryforge/forgescript/dist/constants";

// type PROPS = keyof I2048GameOptions["emojis"];
export default new NativeFunction({
  name: "$set2048GameTimeout",
  aliases: ["$set2048Timeout"],
  version: "1.0.0",
  description: "Sets the 2048 game options for timeout property",
  unwrap: true,
  args: [Arg.optionalString("duration", "The timeout duration")],
  brackets: true,
  async execute(ctx, [dur]) {
    let opts = ctx.getEnvironmentKey(
      "__2048__game__options__",
    ) as I2048GameOptions;
    if (typeof opts !== "object")
      return this.customError("Not Allowed. Try to use in $start2048");

    if (dur)
      try {
        opts.timeoutTime = TimeParser.parseToMS(dur);
      } catch {
        return this.customError("Invalid durataion");
      }
    else opts.timeoutTime = 60000;
    if (opts.timeoutTime < 1) opts.timeoutTime = 60000;
    ctx.setEnvironmentKey("__2048__game__options__", opts);
    return this.success();
  },
});
