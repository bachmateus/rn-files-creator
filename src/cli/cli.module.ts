import { RnFilesCreatorConfigFileService } from "./service/rn-files-creator-config-file-cli.service";
import { RnFilesCreatorConfigFileView } from "./view/rn-files-creator-config-file-cli.view";
import { filesManagerService } from "../manager/manager.module";
import { componentBuilderService, screenBuilderService } from "../builder/builder.module";
import { ComponentCliService } from "./service/component-cli.service";
import { ComponentCliView } from "./view/component-cli.view";
import { ScreenCliService } from "./service/screen-cli.service";
import { ScreenCliView } from "./view/screen-cli.view";
import { UserPromptedArgsCliService } from "./service/user-prompted-args-cli.service";

export const rnFilesCreatorConfigFileView = new RnFilesCreatorConfigFileView();
export const rnFilesCreatorConfigFileService = new RnFilesCreatorConfigFileService(filesManagerService, rnFilesCreatorConfigFileView);

export const componentCliView = new ComponentCliView();
export const componentCliService = new ComponentCliService(componentCliView, componentBuilderService);

export const screenCliView = new ScreenCliView();
export const screenCliService = new ScreenCliService(screenCliView, screenBuilderService);

export const userPromptedArgsCliService = new UserPromptedArgsCliService();
