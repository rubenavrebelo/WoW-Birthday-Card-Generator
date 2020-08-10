const express = require("express");
const app = express()
const scrapper = require("./armory-scrapper");
const {compositeImages, writeAchievement, writeStatus} = require("./composite-image");


const port = 8080
var images = [];
let baseImage;
let currentImage;

function imageSetCallback(imgs) {
 images = images.push(imgs);
 compositeImages(imgs[0], imgs[1], setBaseImage);
}

function setBaseImage(image) {
    baseImage = image;
    console.timeEnd("dbsave")
}

function setCurrentImage(image) {
    currentImage = image;
    console.log('here');
    image.writeAsync(`test/final.png`);
}

app.listen(port, () => {
    console.time("dbsave");
    if(baseImage === undefined) scrapper('Novidaddy', 'magtheridon', imageSetCallback);
})

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
            setCurrentImage(result);
            res.send(200);
        }
    });
})