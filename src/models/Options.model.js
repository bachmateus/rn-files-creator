import path from 'path';

export default class Options {
  command = "";
  args = [];
  language = "JavaScript";

  fullPathName = new URL(import.meta.url).pathname; 
  templateDir = "";
  targetDirectory = "";
  useStyledComponent = false;

  constructor(options){
    this.command = options.command;
    this.args = options.args;
    this.language = options.language;

    this.templateDir = path.resolve(
      this.fullPathName.substr(this.fullPathName.indexOf('/') + 1),
      '../../../templates/' + this.language,
      options.command
    );
    
    this.targetDirectory = options.targetDirectory || process.cwd();

    this.useStyledComponent = options.useStyledComponent;
  }
}