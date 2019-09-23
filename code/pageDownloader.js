const puppeteer = require('puppeteer');
const FileWriter = require('./fileWriter');

class PageDownloader {

  constructor () {
    this.fileWriter = new FileWriter();
  }

  async downloadPage(url) {

    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    await page.goto(url, {waitUntil: 'load'});
    
    //This gets the HTML
    const content = await page.content();

    this.fileWriter.writeFile(url, content);
    await browser.close();
   
    console.log(`${url} downloaded`);
  }
}

module.exports = PageDownloader;
