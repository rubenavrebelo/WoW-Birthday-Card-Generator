const puppeteer = require("puppeteer");
const { compositeImages } = require("./composite-image");

module.exports = scrapper = async function scrapArmory(character, realm, callback, hash) {
  (async () => {
    const browser = await puppeteer.launch({
      headless: true,
      args: ['--proxy-server="direct://"', "--proxy-bypass-list=*"],
    });
    const page = await browser.newPage();
    await page.setRequestInterception(true);

    page.on("request", (req) => {
      req.continue();
    });
    await page.goto(`https://worldofwarcraft.com/en-gb/character/eu/${realm}/${character}`, { timeout: 0 });
    await page.waitForFunction('document.querySelector(".SummaryCharacter-render > img").src.length > 0');
    const avatarUrl = await page.evaluate(() => {
      return document.querySelector(".SummaryCharacter-render > img").getAttribute("src");
    });
    const backgroundImageUrl = await page.evaluate(
      (el) => window.getComputedStyle(el).backgroundImage,
      await page.$(".ProfilePage > .Pane-bg")
    );
    const backgroundImageCleaned = Buffer.from(
      backgroundImageUrl.match(/url\("(.*)"/)[1].replace(/^data:image\/png;base64,/, ""),
      "base64"
    );
    const avatarUrlCleaned = Buffer.from(avatarUrl.replace(/^data:image\/png;base64,/, ""), "base64");
    await browser.close();
    compositeImages(backgroundImageCleaned, avatarUrlCleaned, callback, hash);
  })();
};
