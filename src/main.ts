import { componentCliService, rnFilesCreatorConfigFileService, userPromptedArgsCliService } from "./cli/cli.module";

export async function cli(args:string[]) {
  // TODO: to be created
  // const isReactNativeProject = libManagerService.isReactNativeProject(); 
  const projectConfig = await rnFilesCreatorConfigFileService.handleGetUserRnConfigFile();
  const userPromptedArgs = await userPromptedArgsCliService.handleGetUserPromptedArgs(args);
  // TODO: check if it's -h and return the help txt
  // TODO: check if it's -v and return the current version

  if (!userPromptedArgs) return;
  
  if (userPromptedArgs.component)
    await componentCliService.handler({components: userPromptedArgs.component}, projectConfig)
  
  // TODO: create screen flow as it is today
  // if (userPromptedArgs.screen)
    // await componentCliService.handler({components: userPromptedArgs.component}, projectConfig)
  
  // TODO: create navigator flow
  // if (userPromptedArgs.screen)
    // await componentCliService.handler({components: userPromptedArgs.component}, projectConfig)
  
  return true
}