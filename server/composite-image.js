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
                });
            callback(image);
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
                callback(null, image.composite(status,650, 650)
                    .print(font, 780, 660, text)
                    .print(yellowFont, 780, 710, "New Bills & Taxes Available"));
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
    }
}



