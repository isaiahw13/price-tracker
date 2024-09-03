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
    const price = $(".lowest-sale-price")
      .first()
      .text()
      .replace(/[^\d\.]+/g, "");
    //Return parsed price value
    return Number(price);
  } catch (error) {
    console.error(`Error scraping macy's:`, error.message);
  }
}

module.exports = { scrapePrice };
