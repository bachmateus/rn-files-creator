import chalk from 'chalk';
import fs from 'fs';
import Listr from 'listr';
import ncp from 'ncp';
import path from 'path';
import { promisify } from 'util';

const access = promisify(fs.access);
const copy = promisify(ncp);


async function copyTemplateFiles(
  templateUrl, 
  targetUrl, 
  commandDirectory, 
  componentName, 
  task
) {

  const targetDirectory = `${targetUrl}\\src\\${commandDirectory}s\\${componentName}\\`;

  if (!fs.existsSync(targetDirectory)){
    await fs.mkdir(targetDirectory,{recursive:true},()=>{});
    
    setTimeout(async function() {
      await copy(
        templateUrl, 
        targetDirectory,  
        {
          clobber: false,
        }
      );
        
      const targetEditableFile = targetDirectory+'index.js';

      await fs.readFile(targetEditableFile, "utf8", async function(err, contents) {
        
        const newContentData = contents.replaceAll('MyComponent', componentName);
        fs.writeFile(targetDirectory+'index.js',newContentData, e => {})  
      });

    }, 1000);
  } else {
    task.skip(`Directory is not empty: ${commandDirectory}s\\${componentName}\\`)
  }
  
}

function showHelp() {
  console.log('This CLI helps you to create React Native components');
}

async function createFiles(options) {
  options = {
    ...options,
    targetDirectory: options.targetDirectory || process.cwd() // + '/' + options.command + '/'+ options.args[0]
  };

  const fullPathName = new URL(import.meta.url).pathname;
  const templateDir = path.resolve(
    fullPathName.substr(fullPathName.indexOf('/') + 1),
    '../../templates',
    options.command
  );
  options.templateDirectory = templateDir;



  try {
    await access(templateDir, fs.constants.R_OK);
  } catch (err) {
    console.error('%s Invalid template name', chalk.red.bold('ERROR'));
    process.exit(1);
  }

  const templateUrl = options.templateDirectory;
  const targetUrl = options.targetDirectory;
  const commandDirectory = options.command;
  const tasksData = [];

  options.args.forEach( item => {
    tasksData.push({
      title: `Create ${item} ${options.command} files`,
      // task: async(ctx, task) => await copyTemplateFiles(templateUrl, targetUrl, commandDirectory, item, task),
      task: async(ctx, task) => {
        // return true
      },

    })
  })

  const tasks = new Listr(tasksData);



  await tasks.run();
}

export async function commandExec(options) {
  
  switch (options.command) {
    case 'help': showHelp(); break;
    case 'component': createFiles(options); break;
    case 'screen': createFiles(options); break;
    default: break;
  }

  
}