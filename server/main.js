const express = require("express");
const app = express();
const scrapper = require("./armory-scrapper");
const {
  writeAchievement,
  writeStatus,
  writeSkill,
  levelUp,
} = require("./composite-image");
var crypto = require("crypto");
var fs = require("fs");
const findRemoveSync = require("find-remove");
const cron = require("node-cron");
const Jimp = require("jimp");
app.use(express.json());

const port = 8080;

// Task Schedule for deletinng folders every 24h
cron.schedule("0 0 * * *", () => {
  console.log("Deleting old folders....");
  var result = findRemoveSync("/tmp", { age: { seconds: 86400 }, dir: "*" });
});

function setBaseImage(image, hash) {
  image.writeAsync(`tmp/${hash}/${hash}-base.jpg`);
  console.log(`Wrote image in: tmp/${hash}/${hash}-base.jpg`);
}

app.listen(port, () => {
  console.log("Server started");
});

app.get("/:realm/:character/base", async (req, res) => {
  var hash = crypto
    .createHash("sha256")
    .update(
      req.params.character.toLowerCase() + "-" + req.params.realm.toLowerCase()
    )
    .digest("base64");
  if (hash.includes("/")) hash = hash.replace("/", "$");
  if (!fs.existsSync("tmp")) fs.mkdirSync("tmp");
  if (!fs.existsSync("tmp/" + hash)) {
    fs.mkdirSync("tmp/" + hash);
  }
  scrapper(req.params.character, req.params.realm, setBaseImage, hash);
  res.sendStatus(200);
});

app.get("/:realm/:character/final", async (req, res) => {
  console.log(req.body);
  var hash = crypto
    .createHash("sha256")
    .update(
      req.params.character.toLowerCase() + "-" + req.params.realm.toLowerCase()
    )
    .digest("base64");
  if (hash.includes("/")) hash = hash.replace("/", "$");
  if (
    fs.existsSync("tmp/" + hash) &&
    fs.existsSync(`tmp/${hash}/${hash}-base.jpg`)
  ) {
    let baseImage = await Jimp.read(`tmp/${hash}/${hash}-base.jpg`);
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
    writeSkill(
      baseImage,
      spell2Title,
      spell2Text,
      spell2,
      function (err, image) {
        writeStatus(
          image,
          spellTitle,
          spellText,
          spell,
          function (err, imageSkills) {
            writeAchievement(
              imageSkills,
              achievementText,
              true,
              achievement,
              function (err, imageAchiev) {
                levelUp(
                  imageAchiev,
                  mainTitle,
                  mainLevel,
                  function (err, final) {
                    final.writeAsync(`tmp/${hash}/${hash}-final.jpg`);
                    res.sendFile(__dirname + `/tmp/${hash}/${hash}-final.jpg`);
                  }
                );
              }
            );
          }
        );
      }
    );
  } else {
    res.sendStatus(404);
  }
});

/* LEGACY CODE
USED FOR INDIVIDUAL TESTING

app.get('/achievement', async (req, res) => {
    let image = baseImage;
    if(currentImage !== undefined) image = currentImage;
    writeAchievement(image, true, function (err, result){
        if(err) {
            console.log(err)
            res.sendStatus(300);
        } else {
            setCurrentImage(result);
            res.send(200);
        }
    });
})

app.get('/status', async (req, res) => {
    let image = baseImage;
    if(currentImage !== undefined) image = currentImage;
    writeStatus(image, "Your responsabilities increased!", function (err, result){
        if(err) {
            console.log(err)
            res.sendStatus(300);
        } else {
            result.writeAsync('./test/final.png')
            setCurrentImage(result);
            res.send(200);
        }
    });
})

app.get('/skill', async (req, res) => {
    let image = baseImage;
    if(currentImage !== undefined) image = currentImage;
    writeSkill(image, "Your responsabilities increased!", function (err, result){
        if(err) {
            console.log(err)
            res.sendStatus(300);
        } else {
            result.writeAsync('./test/final.png')
            setCurrentImage(result);
            res.send(200);
        }
    });
})

app.get('/levelup', async (req, res) => {
    let image = baseImage;
    if(currentImage !== undefined) image = currentImage;
    levelUp(image, "Your responsabilities increased!", function (err, result){
        if(err) {
            console.log(err)
            res.sendStatus(300);
        } else {
            result.writeAsync('./test/final.png')
            setCurrentImage(result);
            res.send(200);
        }
    });
}) 

function setCurrentImage(image) {
    currentImage = image;
    console.log('here');
    image.writeAsync(`test/final.png`);
}
*/
