const cheerio = require("cheerio");
const axios = require("axios");

async function scrapePrice(url) {
  try {
    //Get page html and extract price element
    const html = await axios.get(url);
    const $ = cheerio.load(html.data);
    const price = $(".discount_final_price, .game_purchase_price.price")
      .first()
      .text()
      .replace(/[^\d\.]+/g, "");
    //Return parsed price value
    return Number(price);
  } catch (error) {
    console.error(`Error scraping Steam:`, error.message);
  }
}

module.exports = { scrapePrice };
