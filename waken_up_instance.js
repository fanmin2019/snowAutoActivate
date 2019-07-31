const puppeteer = require('puppeteer');
async function main() {
    //const browser = await puppeteer.launch({args: ['--no-sandbox', '--disable-setuid-sandbox']});
    const browser = await puppeteer.launch({ headless: false });
    const page = await browser.newPage();
    await page.authenticate({
	  username: 'your proxy user name',
	  password: 'your proxy password',
	});
    console.log("Opening page");
    await page.goto('https://signon.service-now.com/ssologin.do?RelayState=%252Fapp%252Ftemplate_saml_2_0%252Fk317zlfESMUHAFZFXMVB%252Fsso%252Fsaml%253FRelayState%253Dhttps%25253A%25252F%25252Fdeveloper.servicenow.com%25252Fsaml_redirector.do%25253Fsysparm_nostack%25253Dtrue%252526sysparm_uri%25253D%2525252Fnav_to.do%2525253Furi%2525253D%252525252Fssologin.do%252525253FrelayState%252525253D%25252525252Fapp.do%252525252523%252521%25252525252Fdashboard&redirectUri=&email=', {waitUntil: 'networkidle0', timeout:0}); // wait until page load
    console.log("Page opened");

    //const login-link = await $('#sysverb_update')
    //await page.click('#dp-hdr-login-link');
    
    console.log("Inputting username");
    //const frame = await page.frames().find(f => f.name() === 'gsft_main');
    await page.type("#username", 'your mail address')
    await page.type("#password", 'your password)
    const login = page.click("#submitButton")
	
	
    await Promise.all([
        //login.click(),
        await page.waitForNavigation({ waitUntil: 'networkidle0'}),
    ]);
    


	
    const page2 = await browser.newPage();
    await page2.goto('https://developer.servicenow.com/app.do#!/instance', { waitUntil: 'networkidle0' }); // wait until page load
    //await page2.click('a[href^="/app.do#!/dashboard"]');
    
    //await page2.click('#instanceWakeUpBtn');
    const wake_btn = page.$('#instanceWakeUpBtn')
	if (await page2.$('#instanceWakeUpBtn') !== null) 
		page2.click('#instanceWakeUpBtn')
	else 
		console.log('not found')

    await browser.close();
}

main();