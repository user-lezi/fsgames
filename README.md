# FSGames
Play games through you ForgeBot.

## Installation 
```shell
npm install FSGames
```
then in your main file (`index.js/index.ts`)
```ts
const { FSGames } = require("FSGames");
//or
import { FSGames } from "FSGames";
```

## Initialising The Extension To Your Bot
```ts
/* Configuring FSGames */
const games = new FSGames({
  events: ["gameStart", "gameEnd", "gameUpdate"] // array of events
});

const client = new ForgeClient({
  // ...your forgeclient options
  extensions: [
    games
  ]
});

/* Initialise Events */
games.commands.add({
  type: "gameStart",
  code: `
  $log[$userTag[$gameAuthorId] has started $gameName]
  `
})
```

### Available Games
#### TicTacToe
> Available from `v1.0.0+`

Example Code:
```ts
client.commands.add({
  type: "messageCreate",
  name: "ttt",
  code: `
  $let[player1;$authorID]
  $let[player2;$mentioned[0]]
  $!startTicTacToe[$get[player1];$get[player2]]
  `
})
```

### Rock Paper Scissor
> Available from `v1.0.0`

Example Code:
```ts
client.commands.add({
  type: "messageCreate",
  name: "rps",
  code: `
  $let[player1;$authorID]
  $let[player2;$mentioned[0]]
  $!startRockPaperScissors[$get[player1];$get[player2]]
  `
})
```