import { Arg, NativeFunction } from "@tryforge/forgescript";
import { IConnect4GameOptions, ButtonColors } from "../../../../typings";

// type PROPS = keyof IConnect4GameOptions["emojis"];
export default new NativeFunction({
  name: "$setConnect4GameButtonStyle",
  aliases: ["$setConnect4ButtonStyle"],
  version: "1.0.0",
  description: "Sets the Connect 4 game options for buttonStyle property",
  unwrap: true,
  args: [
    Arg.optionalEnum(ButtonColors, "Button Color", "The color of the button."),
  ],
  brackets: true,
  async execute(ctx, [btn]) {
    let opts = ctx.getEnvironmentKey(
      "__c4__game__options__",
    ) as IConnect4GameOptions;
    if (typeof opts !== "object")
      return this.customError("Not Allowed. Try to use in $startConnect4");

    if (btn) opts.buttonStyle = btn;
    else opts.buttonStyle = ButtonColors.Blurple;
    ctx.setEnvironmentKey("__c4__game__options__", opts);
    return this.success();
  },
});
