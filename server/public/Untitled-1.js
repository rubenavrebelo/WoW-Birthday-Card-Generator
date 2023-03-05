const fs = require("fs/promises");
const fsNormal = require("fs");
const path = require("path");
var util = require("util");

async function walkDir(dir, result = {}) {
  let list = await fs.readdir(dir);
  for (let item of list) {
    const itemPath = path.join(dir, item);
    let stats = await fs.stat(itemPath);
    if (await stats.isDirectory()) {
      result[item] = {};
      await walkDir(itemPath, result[item]);
    } else {
      const fileName = path.basename(item, path.extname(item));
      const key = fileName
        .replaceAll(/Ability_/gi, "")
        .replaceAll(/Pet_/gi, "")
        .replaceAll(/Achievement_/gi, "")
        .replaceAll(/Racial_/gi, "")
        .replaceAll(/INV_/gi, "")
        .replaceAll(/inv_/gi, "")
        .replaceAll(/ITEM_/gi, "")
        .replaceAll("_", " - ")
        .replaceAll(".png", "")
        .replaceAll(/([a-z0-9])([A-Z])/g, "$1 $2")
        .replaceAll(/(_[0-9]{2}_)/g, "");
      result[fileName] = key;
    }
  }
  return result;
}

async function testWalkDir() {
  let result = await walkDir("./icons");
  fsNormal.writeFileSync("icons.ts", util.inspect(result), "utf-8");
  console.log("Result:", JSON.stringify(result, null, 2));
}

testWalkDir();
