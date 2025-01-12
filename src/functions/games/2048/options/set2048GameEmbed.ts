import { Arg, NativeFunction } from "@tryforge/forgescript";
import { I2048GameOptions } from "../../../../typings";

type PROPS = keyof I2048GameOptions["embed"];
export default new NativeFunction({
  name: "$set2048GameEmbed",
  aliases: ["$set2048Embed"],
  version: "1.0.0",
  description: "Sets the 2048 game options for embeds property",
  unwrap: true,
  args: [
    Arg.requiredString("property", "The embed property to set as"),
    Arg.optionalString(
      "value",
      "The value to set as. (Leave Blank for the defualt one)",
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
      case "title":
      case "color":
        break;
      default:
        return this.customError("Invalid property: " + prop);
    }
    if (!opts.embed) opts.embed = {} as I2048GameOptions["embed"];
    if (val) opts.embed[prop.toLowerCase() as PROPS] = val;
    else delete opts.embed[prop.toLowerCase() as PROPS];
    ctx.setEnvironmentKey("__2048__game__options__", opts);
    return this.success();
  },
});
