import CLI from "./system/CLI";

import Help from "./views/Help.view";

import Options from "./models/Options.model";

import Component from './builders/Component.builder';
import Screen from "./builders/Screen.builder";

import JsonConfigFile from "./files-manager/JsonConfigFile.manager";

export default class Main 
{
  static async main(args){

    const jsonConfig = JsonConfigFile.getJsonConfigFileToObject();
   
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