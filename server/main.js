const express = require("express");
const app = express()
const scrapper = require("./armory-scrapper");
const compositeImages = require("./composite-image");


const port = 8080
var images = [];
var baseImage;

function imageSetCallback(imgs) {
 images = images.push(imgs);
 compositeImages(imgs[0], imgs[1]);
}

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`)
    if(images.length == 0) scrapper('Boubers', 'outland', imageSetCallback);
})