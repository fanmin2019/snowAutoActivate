const puppeteer = require('puppeteer');
async function main() {
    const browser = await puppeteer.launch({args: ['--no-sandbox', '--disable-setuid-sandbox']});
    const page = await browser.newPage();
    await page.goto('https://developer.servicenow.com/app.do#!/instance', { waitUntil: 'networkidle0' }); // wait until page load
    await page.waitForNavigation({ waitUntil: 'networkidle0' });
// Input username
    console.log("Inputting username");
    await page.type('#username', '<your-username>');
    await page.type('#password', '<your-password>');
    console.log("Username input completed");

// click and wait for navigation
    await Promise.all([
        await page.click('#submitButton'),
        await page.waitForNavigation({ waitUntil: 'networkidle0' }),
    ]);

    console.log("Open new page");
    const page2 = await browser.newPage();
    await page2.goto('https://developer.servicenow.com/app.do#!/instance', { waitUntil: 'networkidle0' }); // wait until page load
    // await page2.waitForNavigation({ waitUntil: 'networkidle0' });
    await page2.click('#refresh_status');
    console.log("clicked")
    pages = await browser.pages();
    pages.forEach((page) => page.close());
    await browser.close();
}

main();