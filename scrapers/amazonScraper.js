const cheerio = require("cheerio");
const axios = require("axios");

async function scrapePrice(url) {
  try {
    //Get page html and extract price element
    const html = await axios.get(url);
    const $ = cheerio.load(html.data);
    const dollars = $(".a-price-whole")
      .first()
      .text()
      .slice(0, -1)
      .replace(/,/g, "");
    //Parse price
    const cents = $(".a-price-fraction").first().text();
    const price = Number(dollars) + Number(cents) / 100;
    //Return parsed price value
    return price;
  } catch (error) {
    console.error(`Error scraping Amazon:`, error.message);
  }
}

module.exports = { scrapePrice };
