import inquirer from 'inquirer';
import System from './System';

export default class CLI {
  static parseArgumentsIntoOptions(rawArgs) {
    const validArgs = CLI.getValidArgs();
    const typedArgs = rawArgs.slice(2);
    const command = CLI.getCommandName(typedArgs[0]);
    const args = typedArgs.splice(1);
    const isValidCommand =  validArgs.indexOf(command) > -1;
  
    return {
      command,
      isValidCommand,
      args,
    };
   }
  
  static async promptForMissingOptions(options, jsonConfig) {
    if (options.command == 'help') {
      return options;
    }
  
    const questions = [];
    const isLanguageNotSet = ( 
      jsonConfig.language === undefined || 
      jsonConfig.language !== 'JavaScript' &&
      jsonConfig.language !== 'TypeScript'
    );
    let willWriteOnJsonFile = false;
  
    if ( isLanguageNotSet ) {
      questions.push({
        type: 'list',
        name: 'language-choice',
        message: 'Do you wanna create in which language?',
        choices: ['JavaScript', 'TypeScript'],
        default:'JavaScript'
      })
    } 

    if ( jsonConfig.useStyledComponent === undefined ) {
      questions.push({
        type: 'list',
        name: 'style-choice',
        message: 'Do you wanna use styled component?',
        choices: ['No', 'Yes'],
        default:'No'
      })
    }
  
    if (options.isValidCommand === false) {
      questions.push({
        type: 'list',
        name: 'command-name',
        message: 'Select what you wanna create',
        choices: ['component', 'screen'],
        default:'component'
      })
    }
  
    if ( options.args.length == 0) {
      questions.push({
        type: 'input',
        name: 'component-name',
        message: `What's the ${options.command} name? Use space if you wanna create more than one ${options.command}\n->`,
        default: "MyComponent", 
      });
    }
  
    const answers = await inquirer.prompt(questions);

    if ( isLanguageNotSet ) {
      jsonConfig.language = answers['language-choice'];
      willWriteOnJsonFile = true;
    }

    if ( jsonConfig.useStyledComponent === undefined ) {
      jsonConfig.useStyledComponent = answers['style-choice'] === 'Yes' 
      willWriteOnJsonFile = true;
    }

    if ( willWriteOnJsonFile )
      System.writeJsonConfigFile(jsonConfig)
   
    return {
      ...options,
      command: options.isValidCommand ? options.command : answers['command-name'], 
      isValidCommand: true,
      language: jsonConfig.language ? jsonConfig.language : answers['language-choice'],
      args: options.args.length > 0 ? options.args : answers['component-name'].split(' '),
      useStyledComponent: jsonConfig.useStyledComponent
    };
  }
  
  static getValidArgs() {
    return [
    '-h', 'help',
    '-c', 'component',
    '-s', 'screen', 
    ];
  }

  static getCommandName(command) {
    switch (command) {
      case '-c': case 'component': 
        return 'component';
      case '-s': case 'screen':
        return 'screen';
      case '-n': case 'navigator':
        return 'navigator';
      case '-h': case 'help':
        return 'help';
  
      default: return '';
    }
  }
}