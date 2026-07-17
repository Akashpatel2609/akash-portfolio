const puppeteer = require('puppeteer');

(async () => {
  console.log("Starting browser check...");
  try {
    const browser = await puppeteer.launch({ headless: "new" });
    const page = await browser.newPage();
    
    page.on('console', msg => console.log('BROWSER LOG:', msg.text()));
    page.on('pageerror', err => console.error('BROWSER ERROR:', err.message));
    
    // Log failed requests
    page.on('requestfailed', request => {
      console.log('REQUEST FAILED:', request.url(), request.failure().errorText);
    });

    await page.goto('http://localhost:3000', { waitUntil: 'networkidle2' });
    console.log("Page loaded successfully.");
    
    const opacity = await page.evaluate(() => {
      const el = document.querySelector('#top > div > div');
      return el ? window.getComputedStyle(el).opacity : 'not found';
    });
    console.log("Hero container opacity:", opacity);

    await browser.close();
  } catch (e) {
    console.error("Puppeteer error:", e.message);
  }
})();
