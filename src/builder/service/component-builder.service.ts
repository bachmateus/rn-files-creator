import path from "path";
import { RnFilesCreatorConfigFile } from "../../cli/data/rn-files-creator-config-file";
import { cliTemplatePath, userProjectDirectory, userProjectPath } from "../../manager/constants/paths";
import { ErrorFileCreated } from "../../manager/logger/error-file-created.logger";
import { SuccessFileCreated } from "../../manager/logger/success-file-created.logger";
import { FilesManagerService } from "../../manager/service/files-manager.service";
import { ComponentAlreadyExistsLogger } from "../logger/component-already-exists.logger";
import { TemplateNotFoundError } from "../logger/template-not-found";

export class ComponentBuilderService {
  private userComponentPath = userProjectPath
  private projectConfig: RnFilesCreatorConfigFile = {}

  constructor(private filesManagerService: FilesManagerService) {}
  
  async handle(components: string[], projectConfig: RnFilesCreatorConfigFile) {
    this.projectConfig = projectConfig;

    // console.log('userProjectPath', userProjectDirectory.component)
    // console.log('cliTemplatePath', cliTemplatePath.component)
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

  async handleCopyTemplateFiles(componentName: string): Promise<void> {
    await this.copyTemplateFile(componentName, 'index.js');
    await this.copyTemplateFile(componentName, 'styles.js');
  }

  async copyTemplateFile(componentName: string, fileName: string): Promise<void> {
    const targetDirectory = `${userProjectDirectory.component}\\${componentName}\\`;
    await this.filesManagerService.copyFile(`${cliTemplatePath.component}\\${fileName}`, targetDirectory, `\\${fileName}`);
  }
}