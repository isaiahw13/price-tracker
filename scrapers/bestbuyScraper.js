const cheerio = require("cheerio");
const axios = require("axios");

const SITE = "BestBuy";

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
    return { price: Number(price), site: SITE };
  } catch (error) {
    console.error(`Error scraping ${SITE}:`, error.message);
  }
}

module.exports = { scrapePrice };
