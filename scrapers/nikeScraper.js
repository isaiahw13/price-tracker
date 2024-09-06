const cheerio = require("cheerio");
const axios = require("axios");

const SITE = "Nike";

async function scrapePrice(url) {
  try {
    //Get page html and extract price element
    const html = await axios.get(url);
    const $ = cheerio.load(html.data);
    const price = $(`[data-testid="currentPrice-container"]`)
      .first()
      .text()
      .replace(/[^\d\.]+/g, "");
    //Return parsed price value
    return { price: Number(price), site: SITE };
  } catch (error) {
    console.error(`Error scraping ${SITE}:`, error.message);
  }
}

module.exports = { scrapePrice };
