class Component {
  
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

}