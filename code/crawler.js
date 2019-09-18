const fs = require("fs");
const supercrawler = require("supercrawler");
const FileWriter = require("./fileWriter.js");

class Crawler {
  constructor(url, hostname) {
    this.url = url;
    this.hostname = hostname;

    console.log("Initializing crawler");

    this.crawler = new supercrawler.Crawler({
      interval: 1000,
      concurrentRequestsLimit: 5,
      robotsCacheTime: 3600000,
      userAgent: "Mozilla/5.0 (compatible; supercrawler/1.0; +https://github.com/brendonboshell/supercrawler)"
    });

    //Restrict to this host name
    this.crawler.addHandler(
      "text/html",
      supercrawler.handlers.htmlLinkParser({
        hostnames: [this.hostname]
      })
    );

    this.crawler.addHandler("text/html", function(context) {
      let writer = new FileWriter();
      writer.writeFile(context);
    });
  }

  downloadSite() {
    console.log(`Starting to download pages from ${this.url}`);

    this.crawler
      .getUrlList()
      .insertIfNotExists(new supercrawler.Url(this.url))
      .then(() => {
        return this.crawler.start();
      });
  }
}

module.exports = Crawler;
