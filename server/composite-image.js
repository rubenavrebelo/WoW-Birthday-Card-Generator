const Jimp = require('jimp');

module.exports = compositeImages = function compositeImage(bg, imgAvatar) {
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
            achievementEdit(image, false);
        })

    })
}

function writeStatus(image) {
    Jimp.loadFont('./static/fonts/font-36.fnt').then(font => {
        image.print(font, 775, 650, "Your responsabilities increased!")
        .writeAsync(`test/leveltest.png`);

    })
}

function achievementEdit(image, hasFeats) {
    Jimp.loadFont('./static/fonts/font-24-white.fnt').then(font => {
        Jimp.read('./static/images/achievement/template.png', (err, img) => {
            Jimp.read('./static/images/achievement/cloth.jpg', (err, avatar) => {
                Jimp.read('./static/images/achievement/feats-of-strength-2x.png', (err, feats) => {
                    let achievement = img.composite(avatar.scale(1.65), 35, 45)
                    .print(font, 0, 3, {text: "Choli XBOX XCX", alignmentX: Jimp.HORIZONTAL_ALIGN_CENTER, alignmentY: Jimp.VERTICAL_ALIGN_MIDDLE}, 640, 180);
                    if(hasFeats) {
                        achievement = achievement.composite(feats, 505, 50)
                    }

                    image.composite(achievement, 775, 900)
                    .writeAsync(`test/achievtest.png`);
                });
            });
        });

    })
}