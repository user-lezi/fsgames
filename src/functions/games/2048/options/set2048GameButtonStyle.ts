import { Arg, NativeFunction } from "@tryforge/forgescript";
import { I2048GameOptions, ButtonColors } from "../../../../typings";

// type PROPS = keyof I2048GameOptions["emojis"];
export default new NativeFunction({
  name: "$set2048GameButtonStyle",
  aliases: ["$set2048ButtonStyle"],
  version: "1.0.0",
  description: "Sets the 2048 game options for buttonStyle property",
  unwrap: true,
  args: [
    Arg.optionalEnum(ButtonColors, "Button Color", "The color of the button."),
  ],
  brackets: true,
  async execute(ctx, [btn]) {
    let opts = ctx.getEnvironmentKey(
      "__2048__game__options__",
    ) as I2048GameOptions;
    if (typeof opts !== "object")
      return this.customError("Not Allowed. Try to use in $start2048");

    if (btn) opts.buttonStyle = btn;
    else opts.buttonStyle = ButtonColors.Blurple;
    ctx.setEnvironmentKey("__2048__game__options__", opts);
    return this.success();
  },
});
