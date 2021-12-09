import chalk from "chalk";
import fs from 'fs';
import { promisify } from 'util';
import System from "./System";


export default class Component {
  options = {};
  access = promisify(fs.access);
  
  constructor(_options) {
    this.options = _options;
  }

  async changeIndexComponentFiles(componentName, targetDirectory, language){
    const file = language === 'JavaScript' ? 'index.js' : 'index.tsx';
    const targetEditableFile = targetDirectory+file;

    fs.readFile(targetEditableFile, "utf8", async function(err, contents) {
      const newContentData = contents.replaceAll('MyComponent', componentName);
      fs.writeFile(targetEditableFile, newContentData, e => {})  
    });
  }
  
  async createComponent() {
    try {
      await this.access(this.options.templateDir, fs.constants.R_OK);
    } catch (err) {
      console.error('%s Invalid template name', chalk.red.bold('ERROR'));
      process.exit(1);
    }

    const tasksData = [];

    this.options.args.forEach( item => {
      tasksData.push({
        title: `Create ${item} ${this.options.command} files`,
        task: async (ctx, task) => {
          const targetDirectory = `${this.options.targetDirectory}\\src\\${this.options.command}s\\${item}\\`;

          const callbackCreateDirectory = async () => {
            System.copyTemplateFiles(this.options.templateDir, targetDirectory, item, this.options.language,this.changeIndexComponentFiles)
          }

          System.createDirectory(targetDirectory, item, task, this.options.command, callbackCreateDirectory);         
        },
      })
    })

    System.runCommand(tasksData)
  }

}