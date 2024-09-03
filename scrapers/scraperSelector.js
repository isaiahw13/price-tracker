const fs = require("fs");
const path = require("path");

const scrapers = {};

//load all price scrapers from folder
fs.readdirSync(__dirname).forEach((scraper) => {
  if (scraper !== path.basename(__filename)) {
    //get scraper name without file extension
    const scraperName = path.basename(scraper, ".js");
    //import scraper module and add it to the scrapers object
    scrapers[scraperName] = require(path.join(__dirname, scraper));
  }
});

//match scraper with domain name
module.exports = function getScraper(url) {
  let domain = url.hostname.split(".")[1];
  const scraper = scrapers[`${domain}Scraper`];
  if (!scraper) {
    throw new Error(`No scraper found for site: ${domain}`);
  }
  return scraper;
};
