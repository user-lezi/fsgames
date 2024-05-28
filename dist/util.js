"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getButtons = exports.removeButton = exports.disableAllButtons = void 0;
const discord_js_1 = require("discord.js");
async function disableAllButtons(msg, edit = false) {
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
exports.disableAllButtons = disableAllButtons;
async function removeButton(msg, id, edit = false) {
    let components = getButtons(msg);
    let newComponents = components
        .map((row) => {
        return new discord_js_1.ActionRowBuilder().setComponents(row.components.filter((button) => {
            return (button.data.custom_id !== id);
        }));
    })
        .filter((row) => row.components.length > 0);
    return edit
        ? await msg.edit({ components: newComponents })
        : (Reflect.set(msg, "components", newComponents), msg);
}
exports.removeButton = removeButton;
function getButtons(msg) {
    let rows = msg.components;
    let newRows = [];
    for (let row of rows) {
        let newRow = new discord_js_1.ActionRowBuilder();
        for (let i = 0; i < row.components.length; i++) {
            let button = row.components[i];
            let newButton = discord_js_1.ButtonBuilder.from(button);
            newRow.addComponents(newButton);
        }
        newRows.push(newRow);
    }
    return newRows;
}
exports.getButtons = getButtons;
//# sourceMappingURL=util.js.map