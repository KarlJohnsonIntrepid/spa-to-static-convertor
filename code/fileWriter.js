const fs = require("fs");
const DirectoryBuilder = require("./directoryBuilder.js");

class FileWriter {
  constructor() {
    this.directoryBuilder = new DirectoryBuilder();
  }

  writeFile(context) {
    var sizeKb = Buffer.byteLength(context.body) / 1024;
    const data = new Uint8Array(Buffer.from(context.body));

    //Ensure folder is in the file system for the URL
    this.directoryBuilder.create(context.url);

    fs.writeFile("out/out/test.html", data, err => {
      if (err) {
        console.log(`The file for ${context.url} has failed to download`);
      } else {
        console.log("Downloaded", context.url, "Size=", sizeKb, "KB");
      }
    });
  }
}

module.exports = FileWriter;
