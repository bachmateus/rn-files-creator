import inquirer from 'inquirer';
import Main from './main';

function parseArgumentsIntoOptions(rawArgs) {
  const validArgs = [
    'h', 'help',
    'c', 'component', 
    's', 'screen', 
  ];

  const typedArgs = rawArgs.slice(2);
  const command = getCommandName(typedArgs[0]);
  const args = typedArgs.splice(1);
  const isValidCommand = validArgs.indexOf(command) > -1;

  return {
    command,
    isValidCommand,
    args,
  };
 }

 async function promptForMissingOptions(options) {
  if (options.command == 'help') {
    return options;
  }

  const questions = [];

  questions.push({
    type: 'list',
    name: 'language-choice',
    message: 'Do you wanna create in which language?',
    choices: ['JavaScript', 'TypeScript'],
    default:'JavaScript'
  })

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
 
  return {
    ...options,
    command: options.isValidCommand ? options.command : answers['command-name'], 
    isValidCommand: true,
    language: answers['language-choice'],
    args: options.args.length > 0 ? options.args : answers['component-name'].split(' ')
  };
}

function getCommandName(command) {
  switch (command) {
    case 'c': case 'component': 
      return 'component';
    case 's': case 'screen':
      return 'screen';
    case 'h': case 'help':
      return 'help';

    default: return '';
  }
}

export async function cli(args) {
  let options = parseArgumentsIntoOptions(args);
  options = await promptForMissingOptions(options);
  const main = new Main(options);
  main.commandExec();
}