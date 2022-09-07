// import { componentCliService, rnFilesCreatorConfigFileService, screenCliService, userPromptedArgsCliService } from "./cli/cli.module";
// import { helpCliService } from "./cli/cli.module";

import { cliPath } from "./manager/constants/paths";

export async function cli(args:string[]) {

  console.log(cliPath);

  // path.resolve(
  //   __dirname.substring(__dirname.indexOf('/') + 1),
  //   process.env.NODE_ENVIRONMENT ? '../../../src' : '../../../build'
  // )

  // // TODO: to be created
  // // const isReactNativeProject = libManagerService.isReactNativeProject(); 
  // const userPromptedArgs = await userPromptedArgsCliService.handleGetUserPromptedArgs(args);
  // if (!userPromptedArgs) return;
  
  // if (userPromptedArgs.isHelp){
  //   await helpCliService.handle();
  //   return
  // }
  // const projectConfig = await rnFilesCreatorConfigFileService.handleGetUserRnConfigFile();

  // // TODO: check if it's -v and return the current version
  
  // if (userPromptedArgs.component)
  //   await componentCliService.handler({components: userPromptedArgs.component}, projectConfig)
  
  // if (userPromptedArgs.screen)
  //   await screenCliService.handler({screens: userPromptedArgs.screen}, projectConfig)
  
  // // TODO: create navigator flow
  // // if (userPromptedArgs.screen)
  //   // await componentCliService.handler({components: userPromptedArgs.component}, projectConfig)
  
  // return true
}