const puppeteer = require('puppeteer');
async function main() {
    const browser = await puppeteer.launch({args: ['--no-sandbox', '--disable-setuid-sandbox']});
    const page = await browser.newPage();
    console.log("Opening page");
    await page.goto('https://<your-instance-id>.service-now.com/', {waitUntil: 'networkidle0', timeout:0}); // wait until page load
    console.log("Page opened");

    console.log("Inputting username");
    const frame = await page.frames().find(f => f.name() === 'gsft_main');
    await (await frame.$('#user_name')).type('<your-user-name>>');
    await (await frame.$('#user_password')).type('<your-pass-word>>');
    const login = await frame.$('#sysverb_login')


    await Promise.all([
        login.click(),
        await page.waitForNavigation({ waitUntil: 'networkidle0'}),
    ]);

    const page2 = await browser.newPage();
    await page2.goto('<your dummy business rule url>', { waitUntil: 'networkidle0' }); // wait until page load
    const frame2 = await page2.frames().find(f => f.name() === 'gsft_main')
    const name = await frame2.$('input[id="sys_script.name"]')
    let d = new Date()
    let input_value = d.toGMTString().split(",").join()
    await name.click({clickCount: 3});
    await name.type(input_value, {delay: 20});

    console.log("click update");
    const update = await frame2.$('#sysverb_update')
    await update.click()
    pages = await browser.pages();
    pages.forEach((page) => page.close());
    await browser.close();
}

main();