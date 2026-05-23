const puppeteer = require("puppeteer");
const path = require("path");

(async () => {
  const browser = await puppeteer.launch({ headless: "new" });
  const page = await browser.newPage();

  const filePath = path.resolve(__dirname, "release/about-mockup.html");
  await page.goto("file://" + filePath, { waitUntil: "networkidle0", timeout: 15000 });

  await page.setViewport({ width: 560, height: 900, deviceScaleFactor: 2 });

  // Wait for Ionicons to load
  await new Promise(r => setTimeout(r, 3000));

  await page.screenshot({
    path: path.resolve(__dirname, "release/about-mockup.jpeg"),
    type: "jpeg",
    quality: 95,
    fullPage: false,
  });

  await browser.close();
  console.log("Done: release/about-mockup.jpeg");
})();
