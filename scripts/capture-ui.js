const { chromium } = require('playwright');
const path = require('path');
const fs = require('fs');

(async () => {
  const browser = await chromium.launch({ headless: true });
  const page = await browser.newPage({ viewport: { width: 1440, height: 1100 } });
  const url = 'file://' + path.resolve(__dirname, '..', 'index.html');
  const outDir = path.resolve(__dirname, '..', 'screenshots');

  if (!fs.existsSync(outDir)) {
    fs.mkdirSync(outDir, { recursive: true });
  }

  await page.goto(url, { waitUntil: 'networkidle' });
  await page.screenshot({ path: path.join(outDir, '1-initial-load.png'), fullPage: true });

  await page.click('button#refreshBtn');
  await page.waitForTimeout(1500);
  await page.screenshot({ path: path.join(outDir, '2-after-get.png'), fullPage: true });

  await page.click('button#deleteBtn');
  await page.waitForTimeout(1500);
  await page.screenshot({ path: path.join(outDir, '3-after-delete.png'), fullPage: true });

  await browser.close();
  console.log('UI screenshots saved to ' + outDir);
})();
