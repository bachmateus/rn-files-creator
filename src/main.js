import chalk from 'chalk';
import fs from 'fs';
import Listr from 'listr';
import ncp from 'ncp';
import path from 'path';
import { promisify } from 'util';

const access = promisify(fs.access);
const copy = promisify(ncp);

export default class Main {
  command = "";
  args = [];
  language = "JavaScript";

  fullPathName = new URL(import.meta.url).pathname; 
  templateDir = "";
  targetDirectory = "";

  constructor(options){
    this.command = options.command;
    this.args = options.args;
    this.language = options.language;

    this.templateDir = path.resolve(
      this.fullPathName.substr(this.fullPathName.indexOf('/') + 1),
      '../../templates/' + this.language,
      options.command
    );
    
    this.targetDirectory = options.targetDirectory || process.cwd();
  }

  showHelp() {
    const helpDir = path.resolve(
      this.fullPathName.substr(this.fullPathName.indexOf('/') + 1),
      '../config/help.txt'
    );

    fs.readFile(helpDir, "utf8", async function(err, contents) {
      console.log(contents) 
    });
  }

  async createDirectory(targetDirectory, componentName, task, command, callback) {
    if (!fs.existsSync(targetDirectory)){
      fs.mkdir(targetDirectory, { recursive: true }, () => { callback(); });
    } else {
      task.skip(`Directory is not empty: ${this.command}s\\${componentName}\\`)
    }
  }  

  async changeIndexComponentFiles(componentName, targetDirectory, language){
    const file = language === 'JavaScript' ? 'index.js' : 'index.tsx';
    const targetEditableFile = targetDirectory+file;

    // setTimeout(async function() {
      fs.readFile(targetEditableFile, "utf8", async function(err, contents) {
        const newContentData = contents.replaceAll('MyComponent', componentName);
        fs.writeFile(targetEditableFile, newContentData, e => {})  
      });
    // }, 1000);
  }

  async copyTemplateFiles(templateDir, targetDirectory, item, language, callback){
    try {
      await copy( templateDir, targetDirectory,  {clobber: false, } );
      callback(item,targetDirectory,language)
    } catch (e) {
      console.log(e)
    }
  }

  async createComponent() {
    try {
      await access(this.templateDir, fs.constants.R_OK);
    } catch (err) {
      console.error('%s Invalid template name', chalk.red.bold('ERROR'));
      process.exit(1);
    }

    const tasksData = [];

    this.args.forEach( item => {
      tasksData.push({
        title: `Create ${item} ${this.command} files`,
        task: async (ctx, task) => {
          const targetDirectory = `${this.targetDirectory}\\src\\${this.command}s\\${item}\\`;

          const callbackCreateDirectory = async () => {
            this.copyTemplateFiles(this.templateDir, targetDirectory, item, this.language,this.changeIndexComponentFiles)
          }

          this.createDirectory(targetDirectory, item, task, this.command, callbackCreateDirectory);         
        },
      })
    })

    this.runCommand(tasksData)
  }

  async runCommand(tasksData) {
    const tasks = new Listr(tasksData);
    await tasks.run();
  }

  async commandExec() {
    switch (this.command) {
      case 'help': this.showHelp(); break;
      case 'component': case 'screen': this.createComponent(); break;
      default: break;
    }
  }
}