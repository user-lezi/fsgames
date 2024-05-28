import {
  ArgType,
  NativeFunction,
  EnumLike,
  GetEnum,
} from "@tryforge/forgescript";
import { Message, MessageType } from "discord.js";
import { BaseGame } from "../games/BaseGame";

export type Properties<Enum extends EnumLike, Type> = {
  [P in keyof Enum]: (
    v?: Type | null,
    sep?: string | null,
    index?: number | null,
  ) => null | undefined | string | number | boolean;
};

function defineProperties<Enum extends EnumLike, Type>(
  props: Properties<Enum, Type>,
) {
  return props;
}

enum MessageProperty {
  id = "id",
  content = "content",
  flags = "flags",
  username = "username",
  type = "type",
  channelID = "channelID",
  guildID = "guildID",
  authorID = "authorID",
  timestamp = "timestamp",
}

const MessageProperties = defineProperties<typeof MessageProperty, Message>({
  content: (m) => m?.content,
  id: (m) => m?.id,
  flags: (m, sep) => m?.flags.toArray().join(sep || ", "),
  channelID: (m) => m?.channelId,
  guildID: (m) => m?.guildId,
  type: (m) => (m ? MessageType[m.type] : undefined),
  username: (m) => m?.author?.username,
  authorID: (m) => m?.author?.id,
  timestamp: (m) => m?.createdTimestamp,
});

export default new NativeFunction({
  name: "$getGameMessage",
  version: "1.0.0",
  description: "Get the data from the game message in a game event.",
  unwrap: true,
  brackets: true,
  args: [
    {
      name: "property",
      description: "The property to pull",
      rest: false,
      type: ArgType.Enum,
      enum: MessageProperty,
      required: true,
    },
    {
      name: "separator",
      description: "Separator to use in case of array",
      rest: false,
      type: ArgType.String,
    },
  ],
  async execute(ctx, [prop, sep]) {
    return this.success(
      MessageProperties[prop](
        (ctx.runtime.extras as BaseGame)?.gameMessage,
        sep || ", ",
      ),
    );
  },
});
