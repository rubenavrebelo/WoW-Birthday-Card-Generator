const express = require("express");
const app = express();
const scrapper = require("./armory-scrapper");
const { writeAchievement, writeStatus, writeSkill, levelUp } = require("./composite-image");
const cors = require("cors");
const crypto = require("crypto");
const fs = require("fs");
const findRemoveSync = require("find-remove");
const cron = require("node-cron");
const Jimp = require("jimp");
const path = require("path");

app.use(express.json());
app.use(cors());
app.use(express.static(path.join(__dirname, "public")));
const port = 8080;

// Task Schedule for deleting folders every 24h
cron.schedule("0 0 * * *", () => {
  console.log("Deleting old folders....");
  var result = findRemoveSync("/public/tmp", { age: { seconds: 86400 }, dir: "*" });
});

function setBaseImage(image, hash) {
  image.writeAsync(`public/tmp/${hash}/${hash}-base.jpg`);
  console.log(`Wrote image in: public/tmp/${hash}/${hash}-base.jpg`);
}

app.listen(port, () => {
  console.log("Server started");
});

app.get("/:realm/:character/base", async (req, res) => {
  var hash = crypto
    .createHash("sha256")
    .update(req.params.character.toLowerCase() + "-" + req.params.realm.toLowerCase())
    .digest("base64");
  if (hash.includes("/")) hash = hash.replace("/", "$");
  if (!fs.existsSync("public/tmp/")) fs.mkdirSync("public/tmp/");
  if (!fs.existsSync("public/tmp/" + hash)) {
    fs.mkdirSync("public/tmp/" + hash);
  }
  if (!fs.existsSync("public/tmp/" + hash + "/" + hash + "-base.jpg")) {
    scrapper(req.params.character, req.params.realm, setBaseImage, hash);
  }
  res.send(hash);
});

app.get("/:realm/:character/final", async (req, res) => {
  console.log(req.body);
  var hash = crypto
    .createHash("sha256")
    .update(req.params.character.toLowerCase() + "-" + req.params.realm.toLowerCase())
    .digest("base64");
  if (hash.includes("/")) hash = hash.replace("/", "$");
  if (fs.existsSync("public/tmp/" + hash) && fs.existsSync(`public/tmp/${hash}/${hash}-base.jpg`)) {
    let baseImage = await Jimp.read(`public/tmp/${hash}/${hash}-base.jpg`);
    const {
      spell2Title,
      spell2Text,
      spell2Icon,
      spellText,
      spellIcon,
      spellTitle,
      mainTitle,
      mainLevel,
      achievementText,
    } = req.body.values;
    const { spell, spell2, achievement } = req.body.config;
    writeSkill(baseImage, spell2Title, spell2Text, spell2, function (err, image) {
      writeStatus(image, spellTitle, spellText, spell, function (err, imageSkills) {
        writeAchievement(imageSkills, achievementText, true, achievement, function (err, imageAchiev) {
          levelUp(imageAchiev, mainTitle, mainLevel, function (err, final) {
            final.writeAsync(`public/tmp/${hash}/${hash}-final.jpg`);
            res.sendFile(__dirname + `/public/tmp/${hash}/${hash}-final.jpg`);
          });
        });
      });
    });
  } else {
    res.sendStatus(404);
  }
});
