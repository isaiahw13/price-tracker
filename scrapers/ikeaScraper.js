const cheerio = require("cheerio");
const axios = require("axios");

const SITE = "IKEA";

async function scrapePrice(url) {
  try {
    //Get page html and extract price element
    const html = await axios.get(url);
    const $ = cheerio.load(html.data);
    const dollars = $(".pip-temp-price__integer")
      .first()
      .text()
      .replace(/,/g, "");
    //Parse price
    const cents = $(".pip-temp-price__decimal").first().text().slice(1);
    const price = Number(dollars) + Number(cents) / 100;
    //Return parsed price value
    return { price: price, site: SITE };
  } catch (error) {
    console.error(`Error scraping ${SITE}:`, error.message);
  }
}

module.exports = { scrapePrice };
