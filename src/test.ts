import { FSGames } from "./";
import { ForgeClient } from "@tryforge/forgescript";

console.clear();

let games = new FSGames({
  events: ["gameStart", "gameEnd", "gameUpdate"],
});

const client = new ForgeClient({
  intents: ["Guilds", "GuildMessages", "MessageContent", "GuildMembers"],
  events: ["messageCreate"],
  prefixes: ["!"],
  extensions: [games],
});

client.commands.add({
  type: "messageCreate",
  name: "ttt",
  code: `
  $!startTicTacToe[$authorID;$mentioned[0]]
  `,
});

client.commands.add({
  type: "messageCreate",
  name: "rps",
  code: `
  $startRockPaperScissor[$authorID;$mentioned[0]]
  `,
});

client.commands.add({
  type: "messageCreate",
  name: "games",
  code: `
  $codeBlock[$djsEval[ctx.client.getExtension("FSGames", true).constructor.games];js]
  `,
});

games.commands?.add({
  type: "gameStart",
  code: `
  $sendMessage[$channelID;
**[GameStart\\]:** <@$gameAuthorID> has started a new game of **$gameName**! Go to $hyperlink[message;$messageLink[$channelID;$gameMessageID]]]
  `,
});

games.commands?.add({
  type: "gameEnd",
  code: `
  $sendMessage[$channelID;
**[GameEnd\\]:** <@$gameTurnUserID> has ended the game of **$gameName** with reason **$gameEndReason**! Go to $hyperlink[message;$messageLink[$channelID;$gameMessageID]]]
  `,
});

games.commands?.add({
  type: "gameUpdate",
  code: `
  $sendMessage[$channelID;
**[GameUpdate\\]:** <@$gameState[user]> has updated the game state of **$gameName** to \`$gameState[state]\`!  by playing move \`$gameState[move]\`. Go to $hyperlink[message;$messageLink[$channelID;$gameMessageID]]]
  `,
});

client.commands.add({
  type: "messageCreate",
  name: "e",
  code: `$codeBlock[$djsEval[
  const games = ctx.client.getExtension("FSGames", true).constructor.games;
  $message];js]`,
});

client.login(process.env.BotToken);
