const puppeteer = require('puppeteer');

async function initializeCDP(page) {
  const client = await page.target().createCDPSession();

}

(async function main(){
  const browser = await puppeteer.launch({
    headless:false, 
    defaultViewport:null,
    devtools: true,
  });

  const page = (await browser.pages())[0];

  await initializeCDP(page);

  browser.on('targetcreated', async (target) => {
    const page = await target.page();
    await initializeCDP(page);
  })

})()
