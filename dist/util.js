"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getGameOptionFunctionNames = getGameOptionFunctionNames;
const fs_1 = require("fs");
const path_1 = require("path");
function getGameOptionFunctionNames(gameName) {
    let optionFunctionNames = [];
    let dir = (0, path_1.join)(__dirname, "functions/games", gameName, "options");
    let files = (0, fs_1.readdirSync)(dir);
    for (let i = 0; i < files.length; i++) {
        const file = files[i];
        if (!file.endsWith(".js"))
            continue;
        let fileName = file.split(".")[0];
        optionFunctionNames.push(`$${fileName}`, `$${fileName.replace("Game", "")}`);
    }
    return optionFunctionNames;
}
//# sourceMappingURL=util.js.map