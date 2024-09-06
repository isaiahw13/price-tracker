const getScraper = require("./scrapers/scraperSelector");

async function test(url) {
  try {
    const scraper = getScraper(url);
    const price = await scraper.scrapePrice(url);
    console.log(price);
  } catch (err) {
    console.error("Error scraping price: ", err.message);
  }
}

const testURLs = [
  "https://www.bestbuy.com/site/nordictrack-t-series-8-5-s-treadmill-black/6545964.p?skuId=6545964",
];
testURLs.forEach((url) => {
  test(new URL(url));
});
