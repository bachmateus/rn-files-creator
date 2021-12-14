import CLI from "./classes/CLI";
import Help from "./classes/Help";
import Options from "./classes/Options";
import Component from './classes/Component';
import System from "./classes/System";

export default class Main 
{
  static async main(args){

    const jsonConfig = System.getJsonConfigFileToObject();
   
    let argOptions = CLI.parseArgumentsIntoOptions(args);
    argOptions = await CLI.promptForMissingOptions(argOptions, jsonConfig);
    
    const options = new Options(argOptions)

    // console.log(options);

    return;

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