import { RnFilesCreatorConfigFile } from "../../cli/data/rn-files-creator-config-file";
import { cliTemplatePath, userProjectDirectory } from "../../manager/constants/paths";
import { componentFilesToCopy } from "../data/component-files-to-copy";
import { ComponentBuilderService } from "./component-builder.service";

export class ScreenBuilderService extends ComponentBuilderService {
  setConfigVars(projectConfig: RnFilesCreatorConfigFile): void{
    this.projectConfig = projectConfig;
    this.filestoCopy = componentFilesToCopy;
    this.cliTemplatePath = cliTemplatePath.screen;
    this.projectTargetDiretory = userProjectDirectory.screen;
  }
}