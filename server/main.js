const express = require("express");
const app = express()
const scrapper = require("./armory-scrapper");
const {writeAchievement, writeStatus, writeSkill, levelUp} = require("./composite-image");
var crypto = require('crypto');
var fs = require('fs');
const findRemoveSync = require('find-remove')
const cron = require('node-cron')


const port = 8080
let baseImage;
let currentImage;

cron.schedule('0 0 * * *', () => {
    console.log('Deleting old folders....');
    var result = findRemoveSync('/tmp', {age: {seconds: 86400}, dir: '*'})
});

function setBaseImage(image) {
    baseImage = image;
    image.writeAsync("tmp/base.jpg")
    console.timeEnd("dbsave")
}

function setCurrentImage(image) {
    currentImage = image;
    console.log('here');
    image.writeAsync(`test/final.png`);
}

app.listen(port, () => {
    console.log("Server started");
    var result = findRemoveSync('/tmp', {age: {seconds: 86400}, dir: '*'})
});

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

app.get('/base/:realm/:character', async (req, res) => {
    console.time("dbsave");
    var hash = crypto.createHash('sha256').update(req.params.character+"-"+req.params.realm).digest('base64');
    if (!fs.existsSync("tmp/"+hash)){
        fs.mkdirSync("tmp/"+hash);
    }
    scrapper(req.params.character, req.params.realm, setBaseImage);
    res.sendStatus(200);
})