import { Arg, ArgType, NativeFunction } from "@tryforge/forgescript";

export default new NativeFunction({
  name: "$gamecordVersion",
  version: "1.0.0",
  description: "Returns the discord-gamecord version.",
  output: ArgType.String,
  unwrap: false,
  execute() {
    return this.success(require("discord-gamecord").version);
  },
});
