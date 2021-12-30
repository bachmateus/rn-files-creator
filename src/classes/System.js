import Listr from 'listr';
import fs, { access, constants } from 'fs';
import ncp from 'ncp';
import { promisify } from 'util';

const jsonConfigFileUrl = process.cwd()+'\\rn-creator1.json';
const packageJsonUrl = process.cwd()+'\\package.json';

export default class System {

  static async createDirectory(targetDirectory, componentName, task, command, callback) {
    if (!fs.existsSync(targetDirectory)){
      fs.mkdir(targetDirectory, { recursive: true }, () => { callback(); });
    } else {
      task.skip(`Directory is not empty: ${command}s\\${componentName}\\`)
    }
  }

  static async copyTemplateFiles(templateDir, targetDirectory, item, language, callback){
    const copy = promisify(ncp);

    try {
      await copy( templateDir, targetDirectory,  {clobber: false, } );
      callback(item,targetDirectory,language)
    } catch (e) {
      console.error(e)
    }
  }

  static async runCommand(tasksData) {
    const tasks = new Listr(tasksData);
    await tasks.run();
  }

  static getJsonConfigFileToObject() { 
    return System.convertJsonFileToObject(jsonConfigFileUrl);
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