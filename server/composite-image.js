const Jimp = require('jimp');

module.exports = {
    compositeImages: function compositeImage(bg, imgAvatar, callback) {
    Jimp.read(bg, (err, img) => {
        if(err) throw err
        img.scale(1.1875)
        .crop(2370, 546, 305, 1200);
        Jimp.read(imgAvatar, (err, avatar) => {
            avatar.scale(1.1875)
            .crop(600, 0, 1295, 1200);
            const image = new Jimp(1600, 1200, function (err, image) {
                    image.composite(avatar,0, 0)
                    .composite(img, 1295, 0);
                    callback(image);
                });
        })

    })
    },
    writeStatus: async function writeStatus(image, text, callback) {
        const mask = await Jimp.read('./static/images/status/border-mask.png');
        const border = await Jimp.read('./static/images/status/border-transparent.png');
        const status = await (await Jimp.read('./static/images/icons/Abilities/01.png')).scale(2);
        status.mask(mask, 0, 0);
        status.composite(border, 0, 0);
        Jimp.loadFont('./static/fonts/font-60-yellow.fnt').then(yellowFont => {
            Jimp.loadFont('./static/fonts/font-36.fnt').then(font => {
                callback(null, image.composite(status,650, 550)
                    .print(font, 780, 560, text)
                    .print(yellowFont, 780, 610, "New Bills & Taxes Available"));
            });
        });
    },

    writeSkill: async function writeSkills(image, text, callback) {
        const mask = await Jimp.read('./static/images/status/border-mask.png');
        const border = await Jimp.read('./static/images/status/border-transparent.png');
        const status = await (await Jimp.read('./static/images/icons/Abilities/02_2.png')).scale(2);
        status.mask(mask, 0, 0);
        status.composite(border, 0, 0);
        Jimp.loadFont('./static/fonts/font-60-yellow.fnt').then(yellowFont => {
            Jimp.loadFont('./static/fonts/font-36.fnt').then(font => {
                callback(null, image.composite(status,650, 750)
                    .print(font, 780, 760, text)
                    .print(yellowFont, 780, 810, "Midlife Crisis"));
            });
        });
    },
    writeAchievement: function achievementEdit(image, hasFeats, callback) {
        Jimp.loadFont('./static/fonts/font-24-white.fnt').then(font => {
            Jimp.read('./static/images/achievement/template.png', (err, img) => {
                Jimp.read('./static/images/achievement/cloth.jpg', (err, avatar) => {
                    Jimp.read('./static/images/achievement/feats-of-strength-2x.png', (err, feats) => {
                        let achievement = img.composite(avatar.scale(1.65), 35, 45)
                        .print(font, 0, 3, {text: "Choli XBOX XCX", alignmentX: Jimp.HORIZONTAL_ALIGN_CENTER, alignmentY: Jimp.VERTICAL_ALIGN_MIDDLE}, 640, 180);
                        if(hasFeats) {
                            achievement = achievement.composite(feats, 505, 50)
                        }
                        callback(null, image.composite(achievement, 775, 900))
                    });
                });
            });
    
        })
    },
    levelUp: async function levelUp(image, text, callback) {
        const levelbase = await Jimp.read('./static/images/level-up/base.png');
        Jimp.loadFont('./static/fonts/font-84-white.fnt').then(white84Font => {
            Jimp.loadFont('./static/fonts/font-106-yellow.fnt').then(yellowFont => {
                levelbase.print(yellowFont, 0, 0, {text: "Level 84", alignmentX: Jimp.HORIZONTAL_ALIGN_CENTER, alignmentY: Jimp.VERTICAL_ALIGN_BOTTOM}, 942, 249)
                .print(white84Font, 0, 25, {text: "Testing text test ting", alignmentX: Jimp.HORIZONTAL_ALIGN_CENTER, alignmentY: Jimp.VERTICAL_ALIGN_TOP}, 942, 249);
                callback(null, image.composite(levelbase,650, 250));
            });
                    
        });
    },
}



