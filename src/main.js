import chalk from 'chalk';
import execa from 'execa';
import fs from 'fs';
import Listr from 'listr';
import ncp from 'ncp';
import path from 'path';
import { projectInstall } from 'pkg-install';
import { promisify } from 'util';

const access = promisify(fs.access);
const copy = promisify(ncp);

async function createDirectory(diretoryName) {
  if (!fs.existsSync(diretoryName)){
    await fs.mkdir(diretoryName,{recursive:true},console.error);
  }
}
async function copyTemplateFiles(templateUrl, targetUrl, commandDirectory, componentName) {

  const targetDirectory = `${targetUrl}\\src\\${commandDirectory}s\\${componentName}\\`;

  if (!fs.existsSync(targetDirectory)){
    await fs.mkdir(targetDirectory,{recursive:true},console.error);

    setTimeout(function() {
      return copy(
        templateUrl, 
        targetDirectory, 
        {
          clobber: false,
        }
      );
    }, 1000);
  } 

  return () => {}
  
}

async function initGit(options) {
 const result = await execa('git', ['init'], {
   cwd: options.targetDirectory,
 });
 if (result.failed) {
   return Promise.reject(new Error('Failed to initialize git'));
 }
 return;
}

export async function createProject(options) {
  options = {
    ...options,
    targetDirectory: options.targetDirectory || process.cwd()
  };

  const fullPathName = new URL(import.meta.url).pathname;
  const templateDir = path.resolve(
    fullPathName.substr(fullPathName.indexOf('/') + 1),
    '../../templates',
    options.template.toLowerCase()
  );
 options.templateDirectory = templateDir;
//  return

 try {
   await access(templateDir, fs.constants.R_OK);
 } catch (err) {
   console.error('%s Invalid template name', chalk.red.bold('ERROR'));
   process.exit(1);
 }

 const tasks = new Listr([
   {
     title: 'Copy project files',
     task: () => copyTemplateFiles(options),
   },
   {
     title: 'Initialize git',
     task: () => initGit(options),
     enabled: () => options.git,
   },
   {
     title: 'Install dependencies',
     task: () =>
       projectInstall({
         cwd: options.targetDirectory,
       }),
     skip: () =>
       !options.runInstall
         ? 'Pass --install to automatically install dependencies'
         : undefined,
   },
 ]);

 await tasks.run();
 console.log('%s Project ready', chalk.green.bold('DONE'));
 return true;
}

function showHelp() {
  console.log('This CLI helps you to create React Native components');

}

function createComponent(options) {

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
  const componentName = options.args[0];
  // copyTemplateFiles(templateUrl, targetUrl, commandDirectory, componentName)

  const tasksData = [];

  // console.log(options.args)
  // return

  createDirectory(`${targetUrl}\\src\\${commandDirectory}s\\`)

  options.args.forEach( item => {
    tasksData.push({
      title: 'Copy project files',
      task: () => copyTemplateFiles(templateUrl, targetUrl, commandDirectory, item),
    })
  })

  const tasks = new Listr(tasksData);


  // const tasks = new Listr([
  //   {
  //     title: 'Copy project files',
  //     task: () => copyTemplateFiles(options),
  //   },
  // ]);

  await tasks.run();
  // console.log('%s Project ready', chalk.green.bold('DONE'));

}

export async function commandExec(options) {
  createFiles(options);
  return;
  // return
  switch (options.command) {
    case 'help': showHelp(); break;
    
    default: console.log('other')
    break;
  }
  
  // console.log(options)
}