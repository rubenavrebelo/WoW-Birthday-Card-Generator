const Jimp = require("jimp");

module.exports = {
  compositeImages: function compositeImage(bg, imgAvatar, callback, hash) {
    Jimp.read(bg, (err, img) => {
      if (err) throw err;
      img.scale(1.15).crop(2300, 452, 305, 1200);
      Jimp.read(imgAvatar, (err, avatar) => {
        avatar.scale(1.4).crop(1000, 450, 1295, 1200);
        new Jimp(1600, 1200, function (err, image) {
          image.composite(avatar, 0, 0).composite(img, 1295, 0);
          callback(image, hash);
        });
      });
    });
  },
  writeStatus: async function writeStatus(image, unlock, text, shouldWrite, callback) {
    if (shouldWrite) {
      const mask = await Jimp.read("./static/images/status/border-mask.png");

      const status = await (await Jimp.read("./public/icons/classes/Ability_Parry.PNG")).scale(1.9);
      status.mask(mask, 0, 0);
      Jimp.loadFont("./static/fonts/font-60-yellow.fnt").then((yellowFont) => {
        Jimp.loadFont("./static/fonts/font-36.fnt").then((font) => {
          callback(
            null,
            image.composite(status, 650, 550).print(font, 780, 560, unlock).print(yellowFont, 780, 610, text)
          );
        });
      });
    } else {
      callback(null, image);
    }
  },

  writeSkill: async function writeSkills(image, unlock, skill, shouldWrite, callback) {
    if (shouldWrite) {
      const mask = await Jimp.read("./static/images/status/border-mask.png");
      const status = await (
        await Jimp.read("./public/icons/classes/evoker/Ability_Evoker_ChargedBlast.PNG")
      ).scale(1.9);
      status.mask(mask, 0, 0);
      Jimp.loadFont("./static/fonts/font-60-yellow.fnt").then((yellowFont) => {
        Jimp.loadFont("./static/fonts/font-36.fnt").then((font) => {
          callback(
            null,
            image.composite(status, 650, 750).print(font, 780, 760, unlock).print(yellowFont, 780, 810, skill)
          );
        });
      });
    } else {
      callback(null, image);
    }
  },
  writeAchievement: function achievementEdit(image, text, hasFeats, shouldWrite, callback) {
    if (shouldWrite) {
      Jimp.loadFont("./static/fonts/font-24-white.fnt").then((font) => {
        Jimp.read("./static/images/achievement/template.png", (err, img) => {
          Jimp.read("./static/images/achievement/cloth.png", (err, avatar) => {
            Jimp.read("./static/images/achievement/feats-of-strength-2x.png", (err, feats) => {
              let achievement = img.composite(avatar.scale(1.63), 29, 38).print(
                font,
                0,
                3,
                {
                  text,
                  alignmentX: Jimp.HORIZONTAL_ALIGN_CENTER,
                  alignmentY: Jimp.VERTICAL_ALIGN_MIDDLE,
                },
                640,
                180
              );
              if (hasFeats) {
                achievement = achievement.composite(feats, 505, 50);
              }
              callback(null, image.composite(achievement, 775, 900));
            });
          });
        });
      });
    } else {
      callback(null, image);
    }
  },
  levelUp: async function levelUp(image, firstText, levelUp, callback) {
    const levelbase = await Jimp.read("./static/images/level-up/base.png");
    Jimp.loadFont("./static/fonts/font-84-white.fnt").then((white84Font) => {
      Jimp.loadFont("./static/fonts/font-106-yellow.fnt").then((yellowFont) => {
        levelbase
          .print(
            yellowFont,
            0,
            0,
            {
              text: levelUp,
              alignmentX: Jimp.HORIZONTAL_ALIGN_CENTER,
              alignmentY: Jimp.VERTICAL_ALIGN_BOTTOM,
            },
            942,
            249
          )
          .print(
            white84Font,
            0,
            25,
            {
              text: firstText,
              alignmentX: Jimp.HORIZONTAL_ALIGN_CENTER,
              alignmentY: Jimp.VERTICAL_ALIGN_TOP,
            },
            942,
            249
          );
        callback(null, image.composite(levelbase, 650, 250));
      });
    });
  },
};
