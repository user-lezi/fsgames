import {
  Message,
  MessageActionRowComponent,
  ActionRowBuilder,
  ButtonBuilder,
  ButtonComponent,
  APIButtonComponentWithCustomId,
} from "discord.js";

export async function disableAllButtons(
  msg: Message<boolean>,
  edit: boolean = false,
) {
  let components = getButtons(msg);
  for (let row of components) {
    for (let button of row.components) {
      button.setDisabled(true);
    }
  }
  return edit
    ? await msg.edit({ components })
    : (Reflect.set(msg, "components", components), msg);
}

export async function removeButton(
  msg: Message<boolean>,
  id: string,
  edit: boolean = false,
) {
  let components = getButtons(msg);
  let newComponents = components
    .map((row) => {
      return new ActionRowBuilder().setComponents(
        row.components.filter((button) => {
          return (
            (button.data as APIButtonComponentWithCustomId).custom_id !== id
          );
        }),
      );
    })
    .filter(
      (row) => row.components.length > 0,
    ) as ActionRowBuilder<ButtonBuilder>[];
  return edit
    ? await msg.edit({ components: newComponents })
    : (Reflect.set(msg, "components", newComponents), msg);
}

export function getButtons(msg: Message<boolean>) {
  let rows = msg.components;
  let newRows: ActionRowBuilder<ButtonBuilder>[] = [];
  for (let row of rows) {
    let newRow = new ActionRowBuilder<ButtonBuilder>();

    for (let i = 0; i < row.components.length; i++) {
      let button = row.components[i] as ButtonComponent;
      let newButton = ButtonBuilder.from(button);
      newRow.addComponents(newButton);
    }
    newRows.push(newRow);
  }
  return newRows;
}
