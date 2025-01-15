import { Arg, NativeFunction } from "@tryforge/forgescript";
import { IConnect4GameOptions } from "../../../../typings";

type PROPS = keyof IConnect4GameOptions["emojis"];
export default new NativeFunction({
  name: "$setConnect4GameEmoji",
  aliases: ["$setConnect4Emoji"],
  version: "1.0.0",
  description: "Sets the Connect 4 game options for emojis property",
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
      "__c4__game__options__",
    ) as IConnect4GameOptions;
    if (typeof opts !== "object")
      return this.customError("Not Allowed. Try to use in $startConnect4");
    switch (prop.toLowerCase() as PROPS) {
      case "board":
      case "player1":
      case "player2":
        break;
      default:
        return this.customError("Invalid property: " + prop);
    }
    if (!opts.emojis) opts.emojis = {} as IConnect4GameOptions["emojis"];
    if (val) opts.emojis[prop.toLowerCase() as PROPS] = val;
    else delete opts.emojis[prop.toLowerCase() as PROPS];
    ctx.setEnvironmentKey("__c4__game__options__", opts);
    return this.success();
  },
});
