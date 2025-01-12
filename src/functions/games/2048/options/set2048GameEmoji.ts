import { Arg, NativeFunction } from "@tryforge/forgescript";
import { I2048GameOptions } from "../../../../typings";

type PROPS = keyof I2048GameOptions["emojis"];
export default new NativeFunction({
  name: "$set2048GameEmoji",
  aliases: ["$set2048Emoji"],
  version: "1.0.0",
  description: "Sets the 2048 game options for emojis property",
  unwrap: true,
  args: [
    Arg.requiredString("property", "The emojis property to set as"),
    Arg.optionalString(
      "value",
      "The value to set as. (Leave Blank for the default one)",
    ),
  ],
  brackets: true,
  async execute(ctx, [prop, val]) {
    let opts = ctx.getEnvironmentKey(
      "__2048__game__options__",
    ) as I2048GameOptions;
    if (typeof opts !== "object")
      return this.customError("Not Allowed. Try to use in $start2048");
    switch (prop.toLowerCase() as PROPS) {
      case "up":
      case "down":
      case "left":
      case "right":
        break;
      default:
        return this.customError("Invalid property: " + prop);
    }
    if (!opts.emojis) opts.emojis = {} as I2048GameOptions["emojis"];
    if (val) opts.emojis[prop.toLowerCase() as PROPS] = val;
    else delete opts.emojis[prop.toLowerCase() as PROPS];
    ctx.setEnvironmentKey("__2048__game__options__", opts);
    return this.success();
  },
});
