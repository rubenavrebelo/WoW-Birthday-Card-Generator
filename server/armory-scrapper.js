const puppeteer = require('puppeteer');

module.exports = scrapper = function scrapArmory(character, realm, callback) {
  (async () => {
    const browser = await puppeteer.launch({ headless: true,
      args: [
        '--proxy-server="direct://"',
        '--proxy-bypass-list=*'
      ]});
    const page = await browser.newPage();
    await page.setRequestInterception(true);

    page.on('request', (req) => {
        if(req.resourceType() === 'image'){
            req.abort();
        }
        else {
            req.continue();
        }
      });
    await page.goto(`https://worldofwarcraft.com/en-gb/character/eu/${realm}/${character}`);
    const avatarUrl = await page.evaluate((el) => window.getComputedStyle(el).backgroundImage, await page.$('.CharacterProfile-image > .Art-image'));
    const backgroundImageUrl = await page.evaluate((el) => window.getComputedStyle(el).backgroundImage, await page.$('.Art-image'));
    const backgroundImageCleaned = backgroundImageUrl.match(/url\("(.*)"/)[1] 
    const avatarUrlCleaned = avatarUrl.match(/url\("(.*)"/)[1] 
    await browser.close();
    callback([backgroundImageCleaned, avatarUrlCleaned])
  })();
}



