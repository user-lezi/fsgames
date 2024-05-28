import { Message, ActionRowBuilder, ButtonBuilder } from "discord.js";
export declare function disableAllButtons(msg: Message<boolean>, edit?: boolean): Promise<Message<boolean>>;
export declare function removeButton(msg: Message<boolean>, id: string, edit?: boolean): Promise<Message<boolean>>;
export declare function getButtons(msg: Message<boolean>): ActionRowBuilder<ButtonBuilder>[];
//# sourceMappingURL=util.d.ts.map