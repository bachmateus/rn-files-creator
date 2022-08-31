import { RnFilesCreatorConfigFile } from "../../cli/data/rn-files-creator-config-file";
import { cliTemplatePath, userProjectDirectory } from "../../manager/constants/paths";
import { FilesManagerService } from "../../manager/service/files-manager.service";
import { ComponentAlreadyExistsLogger } from "../logger/component-already-exists.logger";
import { componentFilesToCopy } from '../data/component-files-to-copy';

export class ComponentBuilderService {
  private projectConfig: RnFilesCreatorConfigFile = {} as RnFilesCreatorConfigFile

  constructor(private filesManagerService: FilesManagerService) {}
  
  async handle(components: string[], projectConfig: RnFilesCreatorConfigFile) {
    this.projectConfig = projectConfig;

    for (const component of components) {
      await this.createComponent(component)
    }
  }

  async createComponent(componentName: string): Promise<boolean> {
    // TODO: if fail remove dir
    if (await this.checkIfComponentExists(componentName)) return false;
    return await this.handleCopyTemplateFiles(componentName)
  }

  async checkIfComponentExists(componentName: string): Promise<boolean> {
    const doesExist = await this.filesManagerService.checkIfPathExists(userProjectDirectory.component + componentName);
    if (doesExist) new ComponentAlreadyExistsLogger(componentName);
    else await this.filesManagerService.createDirectory(userProjectDirectory.component + componentName)
    return doesExist;
  }

  async handleCopyTemplateFiles(componentName: string): Promise<boolean> {
    const copyStatusList: boolean[] = [];
    const filesToBeCopyed = componentFilesToCopy[this.projectConfig.language][this.projectConfig.styleType]
    for (const file of filesToBeCopyed) {
      copyStatusList.push(
        await this.copyTemplateFile(componentName, file.templateFileName, file.fileName)
      )
    }
    return copyStatusList.every(status=>status);
  }

  async copyTemplateFile(componentName: string, templateFileName: string, fileName: string): Promise<boolean> {
    return await this.filesManagerService.copyFile(`${cliTemplatePath.component}\\${templateFileName}`, userProjectDirectory.component, `\\${componentName}\\${fileName}`);
  }
}