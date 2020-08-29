const express = require("express");
const app = express()
const scrapper = require("./armory-scrapper");
const {writeAchievement, writeStatus, writeSkill, levelUp} = require("./composite-image");
var crypto = require('crypto');
var fs = require('fs');
const findRemoveSync = require('find-remove');
const cron = require('node-cron');
const Jimp = require('jimp');

const port = 8080

// Task Schedule for deleting folders every 24h
cron.schedule('0 0 * * *', () => {
    console.log('Deleting old folders....');
    var result = findRemoveSync('/tmp', {age: {seconds: 86400}, dir: '*'})
});

function setBaseImage(image, hash) {
    image.writeAsync(`tmp/${hash}/${hash}-base.jpg`)
    console.timeEnd("dbsave")
}

app.listen(port, () => {
    console.log("Server started");
});

app.get('/:realm/:character/base', async (req, res) => {
    console.time("dbsave");
    var hash = crypto.createHash('sha256').update(req.params.character.toLowerCase()+"-"+req.params.realm.toLowerCase()).digest('base64');
    if(hash.includes('/')) hash = hash.replace('/', '$')
    if (!fs.existsSync("tmp/"+hash)){
        fs.mkdirSync("tmp/"+hash);
    }
    scrapper(req.params.character, req.params.realm, setBaseImage, hash);
    res.sendStatus(200);
})

app.get('/:realm/:character/final', async (req, res) => {
    var hash = crypto.createHash('sha256').update(req.params.character.toLowerCase()+"-"+req.params.realm.toLowerCase()).digest('base64');
    if(hash.includes('/')) hash = hash.replace('/', '$')
    if(fs.existsSync("tmp/"+hash) && fs.existsSync(`tmp/${hash}/${hash}-base.jpg`)){
        let baseImage = await Jimp.read(`tmp/${hash}/${hash}-base.jpg`);
        writeSkill(baseImage, "New spell learned", "Toxic Spray", function(err, image){
            writeStatus(image, "Your responsabilities increased!", "Aturar putas", function(err, imageSkills){
                writeAchievement(imageSkills, "Administrator", true, function(err, imageAchiev) {
                    levelUp(imageAchiev, "You've reached", "Level Admin", function(err, final){
                        final.writeAsync(`tmp/${hash}/${hash}-final.jpg`);
                        res.sendFile(__dirname + `/tmp/${hash}/${hash}-final.jpg`);
                    });
                })
            })
        });
    } else {
        res.sendStatus(404);
    }
})

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

