import { ArgType, NativeFunction, EnumLike } from "@tryforge/forgescript";
import { BaseGame, GameType } from "../games/BaseGame";

export type Properties<Enum extends EnumLike, Type> = {
  [P in keyof Enum]: (
    v?: Type | null,
    sep?: string | null,
    index?: number | null,
  ) => any;
};

function defineProperties<Enum extends EnumLike, Type>(
  props: Properties<Enum, Type>,
) {
  return props;
}

export enum GameStateProperty {
  user = "user",
  move = "move",
  state = "state",
}

export const GameStateProperties = defineProperties<
  typeof GameStateProperty,
  BaseGame
>({
  user: (g) => g?.lastMove?.user?.id,
  move: (g) => g?.lastMove?.move,
  state: (g) => g?.lastMove?.state,
});

export default new NativeFunction({
  name: "$gameState",
  version: "1.0.0",
  description: "Get the game state from a game event.",
  unwrap: true,
  brackets: true,
  args: [
    {
      name: "property",
      description: "The property to get from the game state.",
      type: ArgType.Enum,
      required: true,
      rest: false,
      enum: GameStateProperty,
    },
  ],
  async execute(ctx, [prop]) {
    let game = ctx.runtime.extras as BaseGame;

    let allAvailableProperties: {
      [key in GameType]: Array<GameStateProperty>;
    } = {
      [GameType.TicTacToe]: [
        GameStateProperty.user,
        GameStateProperty.move,
        GameStateProperty.state,
      ],
    };

    let gameType = game.type;
    let availableProperties = allAvailableProperties[gameType];
    if (!availableProperties.includes(prop)) {
      return this.customError(
        `Invalid property \`${prop}\` for game type \`${gameType}\`! Available: \`${availableProperties.join(", ")}\``,
      );
    }

    let returnValue: any;

    if (GameType.TicTacToe === gameType) {
      let value = GameStateProperties[prop](game);
      if (prop == "move") {
        let row = Math.floor((value as number) / 3) + 1;
        let col = ((value as number) % 3) + 1;
        value = game.lastMove?.played + row + col;
      } else if (prop == "state") {
        value = value?.win ? "win" : value?.tie ? "tie" : "ongoing";
      }
      returnValue = value;
    }

    return this.success(returnValue);
  },
});
