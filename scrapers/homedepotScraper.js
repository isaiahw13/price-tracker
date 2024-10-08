const cheerio = require("cheerio");
const axios = require("axios");

const SITE = "The Home Depot";

async function scrapePrice(url) {
  try {
    //Get page html and extract price element
    const html = await axios.get(url);
    const $ = cheerio.load(html.data);
    let dollars = $(
      ".price-format__large-currency-symbols + span, .price-format__bulk-price-currency-symbols + span",
    )
      .first()
      .text()
      .replace(/,/g, "");
    let cents = $(
      ".sui-sr-only + .price-format__large-currency-symbols, .sui-sr-only + span",
    )
      .first()
      .text();
    const price = Number(dollars) + Number(cents) / 100;
    //Return parsed price value
    return { price: price, site: SITE };
  } catch (error) {
    console.error(`Error scraping ${SITE}:`, error.message);
  }
}

module.exports = { scrapePrice };
