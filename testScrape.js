const getScraper = require("./scrapers/scraperSelector");

async function test(url) {
  try {
    console.log("Scraping...");
    const scraper = getScraper(url);
    const price = await scraper.scrapePrice(url);
    console.log(price);
  } catch (err) {
    console.error("Error scraping price: ", err.message);
  }
}

const testURL = new URL(
  "https://store.steampowered.com/app/1809540/Nine_Sols/",
);
test(testURL);
