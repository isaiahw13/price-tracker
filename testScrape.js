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
  "https://www.homedepot.com/p/Milwaukee-M18-18-Volt-Lithium-Ion-XC-Extended-Capacity-5-0-Ah-Battery-Pack-2-Pack-48-11-1852/205783065",
  "https://www.homedepot.com/p/Traeger-Pro-575-Wifi-Pellet-Grill-and-Smoker-in-Black-TFB57GLE/307301426",
];
testURLs.forEach((url) => {
  test(new URL(url));
});
