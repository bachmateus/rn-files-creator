import fs from 'fs';

const jsonConfigFileUrl = process.cwd()+'\\rn-creator1.json';

export default class JsonConfigFile {
  static getJsonConfigFileToObject() { 
    return JsonConfigFile.convertJsonFileToObject(jsonConfigFileUrl);
  }
  
  static convertJsonFileToObject(fileUrl) {
    try {
      const fileContent = fs.readFileSync(fileUrl, "utf8");
      const json = JSON.parse(fileContent);
      
      return json;
    } catch {
      return {};
    }
  }

  static writeJsonConfigFile(fileContent){
    fs.writeFile( jsonConfigFileUrl, JSON.stringify(fileContent), e => {})  
  }
}