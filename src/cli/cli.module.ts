import { RnFilesCreatorConfigFileService } from "./service/rn-files-creator-config-file-cli.service";
import { RnFilesCreatorConfigFileView } from "./view/rn-files-creator-config-file-cli.view";
import { filesManagerService } from "../manager/manager.module";
import { componentBuilderService, routeBuilderService, screenBuilderService } from "../builder/builder.module";
import { ComponentCliService } from "./service/component-cli.service";
import { ComponentCliView } from "./view/component-cli.view";
import { ScreenCliService } from "./service/screen-cli.service";
import { ScreenCliView } from "./view/screen-cli.view";
import { HelpCliView } from "./view/help-cli-view";
import { HelpCliService } from "./service/help-cli.service";
import { RouteCliView } from "./view/route-cli.view";
import { RouteCliService } from "./service/route-cli.service";
import { UserPromptedArgsCliService } from "./service/user-prompted-args-cli.service";

const rnFilesCreatorConfigFileView = new RnFilesCreatorConfigFileView();
const rnFilesCreatorConfigFileService = new RnFilesCreatorConfigFileService(filesManagerService, rnFilesCreatorConfigFileView);

const componentCliView = new ComponentCliView();
const componentCliService = new ComponentCliService(componentCliView, componentBuilderService);

const screenCliView = new ScreenCliView();
const screenCliService = new ScreenCliService(screenCliView, screenBuilderService);

const helpCliView = new HelpCliView();
const helpCliService = new HelpCliService(filesManagerService, helpCliView)  

const routeCliView = new RouteCliView();
const routeCliService = new RouteCliService(routeCliView, routeBuilderService)  

const userPromptedArgsCliService = new UserPromptedArgsCliService();

export {
  rnFilesCreatorConfigFileService,
  componentCliService,
  screenCliService,
  helpCliService,
  userPromptedArgsCliService,
  routeCliService
}