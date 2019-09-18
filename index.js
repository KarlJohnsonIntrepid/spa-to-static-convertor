const Crawler = require("./code/crawler.js");

let crawler = new Crawler("http://intrepidnomads.com", "intrepidnomads.com");
crawler.downloadSite();
