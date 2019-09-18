const fs = require("fs");

class DirectoryBuilder {
  create(url) {
    //split the url to get the file name and directory

    try {
      url = new URL(DecodeURI(url));
      let pathname = url.pathname.substring(1, url.pathname.length - 1);

      let paths = pathname.split("/");
      let page = paths[paths.length - 1];
      console.log(`Page name = ${page}`);

      //last part of the path is the f
      var dir = "out";

      if (!fs.existsSync(dir)) {
        fs.mkdirSync(dir);
      }

      console.log("Directory Created");
    } catch (ex) {
      console.log(ex);
      process.exit(1);
    }
  }
}

module.exports = DirectoryBuilder;
