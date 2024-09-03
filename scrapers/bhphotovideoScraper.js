const cheerio = require("cheerio");
const axios = require("axios");

async function scrapePrice(url) {
  try {
    //Get page html and extract price element
    const html = await axios.get(url, {
      headers: {
        "User-Agent": "Mozilla/5.0",
        Referer: "https://www.google.com",
        "Accept-Language": "en-US, en;q=0.9",
        Accept:
          "text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8",
      },
    });
    const $ = cheerio.load(html.data);
    const price = $(`[data-selenium="pricingPrice"]`)
      .first()
      .text()
      .replace(/[^\d\.]+/g, "");
    //Return parsed price value
    return Number(price);
  } catch (error) {
    console.error(`Error scraping B&H:`, error.message);
  }
}

module.exports = { scrapePrice };
