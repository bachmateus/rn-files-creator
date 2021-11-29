class System {

  async createDirectory(targetDirectory, componentName, task, command, callback) {
    if (!fs.existsSync(targetDirectory)){
      fs.mkdir(targetDirectory, { recursive: true }, () => { callback(); });
    } else {
      task.skip(`Directory is not empty: ${this.command}s\\${componentName}\\`)
    }
  }  


  async copyTemplateFiles(templateDir, targetDirectory, item, language, callback){
    try {
      await copy( templateDir, targetDirectory,  {clobber: false, } );
      callback(item,targetDirectory,language)
    } catch (e) {
      console.log(e)
    }
  }

  async runCommand(tasksData) {
    const tasks = new Listr(tasksData);
    await tasks.run();
  }

}