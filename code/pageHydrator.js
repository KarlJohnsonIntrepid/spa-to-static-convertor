var fs = require('fs');
const cheerio = require('cheerio');
const fetch = require('node-fetch');

class PageHydrator {

    constructor () {

    }

    async hydratePage (path, host) {
        try {
            await this.downloadStyles(path, host);
            await this.downloadScripts(path, host);
        } catch(ex) {           
            console.log(ex);
        }     
    }

    async downloadStyles (path, host) {

         await fs.readFile(path, 'utf8', function(err, contents) {  
                        
            let $ = cheerio.load(contents);   
            let styles = $('link[rel="stylesheet"]');
        
            Array.from(styles).forEach(async element => {
               
                let href = element.attribs.href;
                if(href.startsWith('http')){
                    return;
                }

               console.log(`Downloading ${href}`);

               let response =  await fetch(host + href)
               let text = await response.text();

                $(element).replaceWith(`<style type="text/css"> ${text}</style>`)
                await fs.writeFile(path, $.html(), function(err) {
                    if(err) {
                        return console.log(err);
                    } else {
                        console.log("The file was saved!");
                    }                                
                }); 
            });
        });
    }

    async downloadScripts (path, host) {

        await fs.readFile(path, 'utf8', function(err, contents) {  
                       
           let $ = cheerio.load(contents);   
       
           let scripts = $('script[src]');
           Array.from(scripts).forEach(async element => {
              
               let src = element.attribs.src;
               if(src.startsWith('http') || src.startsWith('//')){
                   return;
               }

              console.log(`Downloading ${src}`);

              let response =  await fetch(host + src)
              let text = await response.text();
             
                $(element).replaceWith(`<script>${text}</script>`)
                   await fs.writeFile(path, $.html(), function(err) {
                       if(err) {
                           return console.log(err);
                       } else {
                           console.log("The file was saved!");
                       }                                
                }); 
           });
       });
   }
}

module.exports = PageHydrator;