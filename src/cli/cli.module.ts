import { componentBuilderService } from "../builder/builder.module";
import { filesManagerService } from "../manager/manager.module";
import { ComponentCliService } from "./service/component-cli.service";
import { RnFilesCreatorConfigFileService } from "./service/rn-files-creator-config-file-cli.service";
import { UserPromptedArgsCliService } from "./service/user-prompted-args-cli.service";
import { ComponentCliView } from "./view/component-cli.view";
import { RnFilesCreatorConfigFileView } from "./view/rn-files-creator-config-file-cli.view";

export const rnFilesCreatorConfigFileView = new RnFilesCreatorConfigFileView();
export const rnFilesCreatorConfigFileService = new RnFilesCreatorConfigFileService(filesManagerService, rnFilesCreatorConfigFileView);
export const componentCliView = new ComponentCliView();
export const componentCliService = new ComponentCliService(componentCliView, componentBuilderService);
export const userPromptedArgsCliService = new UserPromptedArgsCliService();
