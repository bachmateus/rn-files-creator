import Listr from 'listr';
import fs from 'fs';
import ncp from 'ncp';
import { promisify } from 'util';

export default class System {

  static async createDirectory(targetDirectory, componentName, task, command, callback) {
    console.log(targetDirectory)
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
      console.log(e)
    }
  }

  static async runCommand(tasksData) {
    const tasks = new Listr(tasksData);
    await tasks.run();
  }

}