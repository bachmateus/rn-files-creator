import { RnFilesCreatorConfigFile } from "../../cli/data/rn-files-creator-config-file";
import { cliTemplatePath, userProjectDirectory } from "../../manager/constants/paths";
import { FilesManagerService } from "../../manager/service/files-manager.service";
import { ComponentAlreadyExistsLogger } from "../logger/component-already-exists.logger";

export class ComponentBuilderService {
  private projectConfig: RnFilesCreatorConfigFile = {}

  constructor(private filesManagerService: FilesManagerService) {}
  
  async handle(components: string[], projectConfig: RnFilesCreatorConfigFile) {
    this.projectConfig = projectConfig;

    for (const component of components) {
      await this.createComponent(component)
    }
  }

  async createComponent(componentName: string): Promise<boolean> {
    if (await this.checkIfComponentExists(componentName)) return false;
    await this.handleCopyTemplateFiles(componentName)
    return true
  }

  async checkIfComponentExists(componentName: string): Promise<boolean> {
    const doesExist = await this.filesManagerService.checkIfPathExists(userProjectDirectory.component + componentName);
    if (doesExist) new ComponentAlreadyExistsLogger(componentName);
    else await this.filesManagerService.createDirectory(userProjectDirectory.component + componentName)
    return doesExist;
  }

  async handleCopyTemplateFiles(componentName: string): Promise<boolean> {
    const indexWasCopied = await this.copyTemplateFile(componentName, 'index.js');
    const stylesWasCopied = await this.copyTemplateFile(componentName, 'styles.js');
    return indexWasCopied && stylesWasCopied
  }

  async copyTemplateFile(componentName: string, fileName: string): Promise<boolean> {
    return await this.filesManagerService.copyFile(`${cliTemplatePath.component}\\${fileName}`, userProjectDirectory.component, `\\${componentName}\\${fileName}`);
  }
}