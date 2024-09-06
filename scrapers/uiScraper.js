const cheerio = require("cheerio");
const axios = require("axios");

const SITE = "Ubiquiti";

async function scrapePrice(url) {
  try {
    //Get page html and extract price element
    const html = await axios.get(url);
    const $ = cheerio.load(html.data);
    const price = $(".sc-14cjdti-8.eZLBSq")
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
