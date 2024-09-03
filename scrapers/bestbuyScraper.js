const cheerio = require("cheerio");
const axios = require("axios");

async function scrapePrice(url) {
  try {
    //Get page html and extract price element
    const html = await axios.get(url, {
      headers: {
        "User-Agent": "Mozilla/5.0",
      },
    });
    const $ = cheerio.load(html.data);
    const price = $(`.priceView-hero-price.priceView-customer-price`)
      .children()
      .first()
      .text()
      .slice(1)
      .replace(/,/g, "");
    //Return parsed price value
    return Number(price);
  } catch (error) {
    console.error(`Error scraping BestBuy:`, error.message);
  }
}

module.exports = { scrapePrice };
