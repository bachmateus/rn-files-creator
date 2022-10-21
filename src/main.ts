import { componentCliService, routeCliService, rnFilesCreatorConfigFileService, screenCliService, userPromptedArgsCliService } from "./cli/cli.module";
import { helpCliService } from "./cli/cli.module";
import { routesTypesEnum } from "./cli/data/args-cli-options";
import { packagesManagerService } from "./manager/manager.module";

export async function cli(args:string[]) {
  await packagesManagerService.isReactNativeProject(); 
  
  const userPromptedArgs = await userPromptedArgsCliService.handleGetUserPromptedArgs(args);
  if (!userPromptedArgs) return;
  
  if (userPromptedArgs.isHelp){
    await helpCliService.handle();
    return
  }
  const projectConfig = await rnFilesCreatorConfigFileService.handleGetUserRnConfigFile();

  // TODO: check if it's -v and return the current version
  
  if (userPromptedArgs.component)
    await componentCliService.handler({components: userPromptedArgs.component}, projectConfig)
  
  if (userPromptedArgs.screen)
    await screenCliService.handler({screens: userPromptedArgs.screen}, projectConfig)
  
  // TODO: create route flow
  if (userPromptedArgs.route || userPromptedArgs.route === ''){
    const route = userPromptedArgs.route;
    const routeType= (userPromptedArgs.routeType) ? userPromptedArgs.routeType : "" as routesTypesEnum;
    await routeCliService.handler({route, routeType}, projectConfig)
  }
  return true
}