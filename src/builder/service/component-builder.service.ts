import { RnFilesCreatorConfigFile } from "../../cli/data/rn-files-creator-config-file";
import { cliTemplatePath, userProjectDirectory } from "../../manager/constants/paths";
import { FilesManagerService } from "../../manager/service/files-manager.service";
import { ComponentAlreadyExistsLogger } from "../logger/component-already-exists.logger";
import { componentFilesToCopy } from '../data/component-files-to-copy';

export class ComponentBuilderService {
  projectConfig: RnFilesCreatorConfigFile = {} as RnFilesCreatorConfigFile
  filestoCopy: any
  cliTemplatePath: string | undefined
  projectTargetDiretory: string | undefined
  constructor(private filesManagerService: FilesManagerService) {}
  
  async handle(components: string[], projectConfig: RnFilesCreatorConfigFile): Promise<string[]> {
    this.setConfigVars(projectConfig);
    const componentsNotCreated = [];
    for (const component of components) {
      const wasCreated = await this.createComponent(component);
      if (!wasCreated) componentsNotCreated.push(component)
    }
    return componentsNotCreated
  }

  setConfigVars(projectConfig: RnFilesCreatorConfigFile): void{
    this.projectConfig = projectConfig;
    this.filestoCopy = componentFilesToCopy;
    this.cliTemplatePath = cliTemplatePath.component;
    this.projectTargetDiretory = userProjectDirectory.component;
  }

  async createComponent(componentName: string): Promise<boolean> {
    // TODO: if fail remove dir
    if (await this.checkIfComponentExists(componentName)) return false;
    return await this.handleCopyTemplateFiles(componentName)
  }

  async checkIfComponentExists(componentName: string): Promise<boolean> {
    const doesExist = await this.filesManagerService.checkIfPathExists(this.projectTargetDiretory + componentName);
    if (doesExist) new ComponentAlreadyExistsLogger(componentName);
    else await this.filesManagerService.createDirectory(this.projectTargetDiretory + componentName)
    return doesExist;
  }

  async handleCopyTemplateFiles(componentName: string): Promise<boolean> {
    const copyStatusList: boolean[] = [];
    const filesToBeCopyed = this.filestoCopy[this.projectConfig.language][this.projectConfig.styleType]
    for (const file of filesToBeCopyed) {
      const templatePath = `${this.cliTemplatePath}\/${file.templateFileName}`;
      const fileTargetPath = `\/${componentName}\/${file.fileName}`;
      const copiedResponse = (file.shallRename) 
        ? await this.createFile(templatePath, this.projectTargetDiretory as string, fileTargetPath, componentName)
        : await this.copyTemplateFile(templatePath, this.projectTargetDiretory as string, fileTargetPath); 
      copyStatusList.push(copiedResponse);
    }
    return copyStatusList.every(status=>status);
  }

  async copyTemplateFile(templatePath: string, targetDirectory:string, fileTargetPath: string): Promise<boolean> {
    return await this.filesManagerService.copyFile(templatePath, targetDirectory, fileTargetPath);
  }

  async createFile(templatePath: string, fileDirectory:string, filePath: string, componentName: string): Promise<boolean> {
    const fileData = await this.filesManagerService.readFile(templatePath);
    const newContent = fileData!.replaceAll('MyComponent', componentName);
    return await this.filesManagerService.writeFile(fileDirectory, filePath, newContent)
  }
}