const getScraper = require("./scrapers/scraperSelector");

async function test(url) {
  try {
    console.log("Scraping...");
    const scraper = getScraper(url);
    const price = await scraper.scrapePrice(url);
    console.log(price);
  } catch (err) {
    console.error("Error scraping price: ", err.message);
  }
}

const testURL = new URL(
  "https://www.macys.com/shop/product/dkny-mens-modern-fit-stretch-suit-jacket?ID=11889424&tdp=cm_app~zMCOM-NAVAPP~xcm_zone~zPDP_ZONE_A~xcm_choiceId~zcidM05RWT-d146ad22-cbf9-443e-870c-33799a087aad%40HDI%40Others%2Byou%2Bmay%2Blike%2417788%2411889424~xcm_pos~zPos2~xcm_srcCatID~z17788",
);
test(testURL);
