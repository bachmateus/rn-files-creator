import { RnFilesCreatorConfigFile } from '../../cli/data/rn-files-creator-config-file';
import { FilesManagerService } from "../../manager/service/files-manager.service";
import { RouteCliParams } from '../../cli/data/creator-params';
import { cliTemplatePath, userProjectDirectory } from '../../manager/constants/paths';
import { ComponentAlreadyExistsLogger } from '../logger/component-already-exists.logger';
import { NativeStringFunction } from '../../common/functions/nativeStringFunction';
import { routeFileToCopy, routeWordsToRename } from '../data/route-words-to-rename';
import { routesTypesEnum } from '../../cli/data/args-cli-options';

export class RouteBuilderService {
  private routeCliParams: RouteCliParams = {} as RouteCliParams
  private projectConfig: RnFilesCreatorConfigFile = {} as RnFilesCreatorConfigFile

  constructor(private readonly filesManagerService: FilesManagerService) {}

  async handle(routeCliParams: RouteCliParams, projectConfig: RnFilesCreatorConfigFile) {
    this.setConfigVars(routeCliParams, projectConfig);
    this.createRoute();
  }

  private setConfigVars(routeCliParams: RouteCliParams, projectConfig: RnFilesCreatorConfigFile) {
    this.routeCliParams = routeCliParams
    this.projectConfig = projectConfig
  }

  private async createRoute(): Promise<boolean> {
    // TODO: if fail remove dir
    const { fileName, templateFileName} = routeFileToCopy[this.projectConfig.language](this.routeCliParams.route);
    if (await this.checkIfRouteExists()) return false;
    return await this.createRouteFile(this.routeCliParams.route, this.routeCliParams.routeType, fileName, templateFileName);
  }

  private async checkIfRouteExists(): Promise<boolean> {
    const routeName = this.routeCliParams.route;
    const doesExist = await this.filesManagerService.checkIfPathExists(`${userProjectDirectory.route}\/${routeName}.js`);
    if (doesExist) new ComponentAlreadyExistsLogger(routeName);
    else await this.filesManagerService.createDirectory(userProjectDirectory.route)
    return doesExist;
  }

  private async createRouteFile(routeName: string, routeType: routesTypesEnum, fileName: string, templateFileName: string): Promise<boolean> {
    const fileData = await this.filesManagerService.readFile(`${cliTemplatePath.route}\/${templateFileName}`);
    const newContent = this.replaceWordsFromTemplateFile(fileData!, routeName, routeType);
    return await this.filesManagerService.writeFile(userProjectDirectory.route, fileName, newContent)
  }

  private replaceWordsFromTemplateFile(content: string, routeName: string, routeType: routesTypesEnum): string {
    const libraryWords = routeWordsToRename.routeFile.library[routeType];
    let newContent = content;
    newContent = NativeStringFunction.replaceAll(newContent, routeWordsToRename.routeFile.routeNameToRename, routeName);
    libraryWords.forEach(item => newContent = NativeStringFunction.replaceAll(newContent, item.find, item.replaceTo));
    return newContent;
  }
}