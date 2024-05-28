import { BaseCommandManager } from "@tryforge/forgescript";
import { HandlerName, GameEvents } from "./EventHandler";

export class GamesCommandManager extends BaseCommandManager<keyof GameEvents> {
  handlerName = HandlerName;
}
