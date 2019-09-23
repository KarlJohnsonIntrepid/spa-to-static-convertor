var CrawlerPackage = require("crawler");

class Crawler {

    async downloadPage(url) {

        const browser = await puppeteer.launch();
        const page = await browser.newPage();
        await page.goto(url, {waitUntil: 'load'});
        
        //This gets the HTML
        const html = await page.content();
        
         // way 1
         const links = await page.evaluate(
          () => Array.from(
            document.querySelectorAll('a[href]'),
            a => a.getAttribute('href')
          )
        );
    
        await browser.close();
       
        console.log(`${url} downloaded`);
     
        return links;
      }
}


module.exports = Crawler;