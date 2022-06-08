import fs from 'fs';
import path from 'path';

export default class Help {
  static showTxtHelpFile (fullPathName) {
    const helpDir = path.resolve(
      fullPathName.substr(fullPathName.indexOf('/') + 1),
      '../../assets/help.txt'
    );

    fs.readFile(helpDir, "utf8", async function(err, contents) {
      console.log(contents) 
    });
  }
}