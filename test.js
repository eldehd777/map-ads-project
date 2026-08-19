const puppeteer = require('puppeteer');

(async () => {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  
  page.on('console', msg => console.log('PAGE LOG:', msg.text()));
  page.on('pageerror', error => console.log('PAGE ERROR:', error.message));
  
  await page.goto('http://localhost:3000');
  
  // Wait for the page to load and map/list to be ready
  await page.waitForTimeout(3000);
  
  // Try to find a CampaignCard and click it
  const cards = await page.('.group'); // CampaignCard has 'group' class
  if (cards.length > 0) {
    console.log('Clicking CampaignCard...');
    await cards[0].click();
    await page.waitForTimeout(2000);
  } else {
    console.log('No CampaignCards found. Are there any campaigns in the store?');
  }

  await browser.close();
})();
