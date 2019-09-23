const fs = require("fs");
const DirectoryBuilder = require("./directoryBuilder.js");

class FileWriter {
  constructor() {
    this.directoryBuilder = new DirectoryBuilder();
  }

  writeFile(url, content) {
    var sizeKb = Buffer.byteLength(content) / 1024;
    const data = new Uint8Array(Buffer.from(content));

    //Ensure folder is in the file system for the URL
    this.directoryBuilder.create(url);

    let fileName = `${this.directoryBuilder.filePath(url)}${this.directoryBuilder.pageName(url)}`;

    fs.writeFile(fileName, data, err => {
      if (err) {
        console.log(`The file for ${url} has failed to download`);
      } else {
        console.log(`${url} has been downloaded and created Size ${sizeKb}KB`);
      }
    });
  }
}

module.exports = FileWriter;
