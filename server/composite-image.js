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
                    writeLevel(image);
                });
        })

    })
}

function writeLevel(image) {
    Jimp.loadFont('./static/fonts/font.fnt').then(font => {
        image.print(font, 250, 250, "Level up")
        .writeAsync(`test/leveltest.png`);

    })
}