var fs = require("fs");
const cheerio = require("cheerio");
const fetch = require("node-fetch");

class PageHydrator {
  constructor() {}

  async hydratePage(path, host) {
    try {
      //   if (!fs.existsSync("./out/content")) {
      //     fs.mkdirSync("./out/content");
      //     console.log(`Content directory created;`);
      //   }

      //   if (!fs.existsSync("./out/bundles")) {
      //     fs.mkdirSync("./out/bundles");
      //     console.log(`Content directory created;`);
      //   }

      await this.downloadStyles(path, host);
      await this.downloadScripts(path, host);
    } catch (ex) {
      console.log(ex);
    }
  }

  async downloadStyles(path, host) {
    await fs.readFile(path, "utf8", (err, contents) => {
      let $ = cheerio.load(contents);
      let styles = $('link[rel="stylesheet"]');

      Array.from(styles).forEach(async element => {
        let href = element.attribs.href;
        if (href.startsWith("http")) {
          return;
        }

        console.log(`Downloading ${href}`);

        let response = await fetch(host + href);
        let text = await response.text();

        //Create directory if not exists
        let path = this.getPath(href);
        this.buildDirectoryStructure(path);
        let fileName = path + ".css";

        fs.writeFile(fileName, text, err => {
          if (err) {
            console.log(`The file for ${fileName} has failed to download`);
          } else {
            console.log(`${fileName} has been downloaded and created`);
          }
        });
      });
    });
  }

  async downloadScripts(path, host) {
    await fs.readFile(path, "utf8", (err, contents) => {
      let $ = cheerio.load(contents);

      let scripts = $("script[src]");
      Array.from(scripts).forEach(async element => {
        let src = element.attribs.src;
        if (src.startsWith("http") || src.startsWith("//")) {
          return;
        }

        console.log(`Downloading ${src}`);

        let response = await fetch(host + src);
        let text = await response.text();

        //Create directory if not exists
        let path = this.getPath(src);
        this.buildDirectoryStructure(path);

        let fileName = path + ".js";

        fs.writeFile(fileName, text, err => {
          if (err) {
            console.log(`The file for ${fileName} has failed to download`);
          } else {
            console.log(`${fileName} has been downloaded and created`);
          }
        });
      });
    });
  }

  getPath(src) {
    let paths = src.split("?");
    paths.pop();
    paths.pop();
    return `out${paths.join("/")}`;
  }

  getFileName(dir) {
    let files = dir.split("/");
    return files[files.length - 1];
  }

  buildDirectoryStructure(dir) {
    let files = dir.split("/");

    console.log(files);

    let currDir = files[0];
    for (let index = 1; index < files.length; index++) {
      if (!fs.existsSync(currDir)) {
        fs.mkdirSync(currDir);
        console.log(`Directory Created for ${currDir}`);
      }

      currDir += "/" + files[index];
    }
  }
}

module.exports = PageHydrator;
