import CLI from "./classes/CLI";
import Help from "./classes/Help";
import Options from "./classes/Options";
import Component from './classes/Component';

export default class Main 
{
  static async main(args){
    let argOptions = CLI.parseArgumentsIntoOptions(args);
    argOptions = await CLI.promptForMissingOptions(argOptions);
    
    const options = new Options(argOptions)

    switch (options.command) {
      case 'help': 
        Help.showTxtHelpFile(options.fullPathName); 
        break;
      
        case 'component': case 'screen': 
          const component = new Component(options);
          component.createComponent(); 
          break;
      default: break;
    }
  }
}