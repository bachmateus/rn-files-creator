import CLI from "./classes/CLI";
import Help from "./classes/Help";
import Options from "./classes/Options";
import Component from './classes/Component';
import System from "./classes/System";
import Screen from "./classes/Screens";

export default class Main 
{
  static async main(args){

    const jsonConfig = System.getJsonConfigFileToObject();
   
    let argOptions = CLI.parseArgumentsIntoOptions(args);
    argOptions = await CLI.promptForMissingOptions(argOptions, jsonConfig);
    
    const options = new Options(argOptions)

    switch (options.command) {
      case 'component': 
        const component = new Component(options);
        component.createComponent(); 
        break;
      
      case 'screen': 
        const screen = new Screen(options);
        screen.createComponent(); 
        break;
      
      case 'help': default: 
        Help.showTxtHelpFile(options.fullPathName); 
        break;
    }
  }
}