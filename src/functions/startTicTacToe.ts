import { ArgType, NativeFunction } from "@tryforge/forgescript";
import { FSGames } from "..";
import { TicTacToeGame } from "../games/TicTacToe";

export default new NativeFunction({
  name: "$startTicTacToe",
  version: "1.0.0",
  description: "Start a TicTacToe game.",
  unwrap: true,
  args: [
    {
      name: "user1",
      description: "The user to play with.",
      type: ArgType.User,
      rest: false,
      required: true,
    },
    {
      name: "user2",
      description: "The user to play with.",
      type: ArgType.User,
      rest: false,
      required: true,
    },
  ],
  brackets: true,
  async execute(ctx, [user1, user2]) {
    if (!user1) return this.customError("Couldn't find user1.");
    if (!user2) return this.customError("Couldn't find user2.");
    let game = new TicTacToeGame(ctx, { user1, user2 });
    FSGames.New(game);
    return this.success(game.id);
  },
});
