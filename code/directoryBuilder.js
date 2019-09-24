const fs = require("fs");

//NOte - URL requuired to end in /
class DirectoryBuilder {
  create(url) {
    try {
      let page = this.pageName(url);
      let dir = this.filePath(url);

      let files = dir.split("/");

      console.log(files);

      let currDir = files[0];
      for (let index = 1; index < files.length; index++) {
        if (!fs.existsSync(currDir)) {
          fs.mkdirSync(currDir);
          console.log(`Directory Created for ${page} : Directory = ${currDir}`);
        }

        currDir += "/" + files[index];
      }
    } catch (ex) {
      console.log(ex);
      process.exit(1);
    }
  }

  pageName(url) {
    url = new URL(decodeURI(url));
    let paths = url.pathname.split("/");
    paths.shift();
    let page = paths[paths.length - 1];

    if (paths.length === 1) {
      page = "index";
    }

    return `${page}.html`;
  }

  filePath(url) {
    url = new URL(decodeURI(url));
    let paths = url.pathname.split("/");
    paths.shift();
    paths.pop();
    return `out/${paths.join("/")}`;
  }
}

module.exports = DirectoryBuilder;
