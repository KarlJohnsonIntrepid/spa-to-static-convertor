const PageDownloader = require("./code/pageDownloader.js");
const PageHydrator = require("./code/pageHydrator");

let download = new PageDownloader();
let pageHydrator = new PageHydrator();
(async () => {
  //await download.downloadPage("http://www.intrepidnomads.com/blog/1/");
  await pageHydrator.hydratePage("./out/blog/1.html", "http://intrepidnomads.com");
})();
