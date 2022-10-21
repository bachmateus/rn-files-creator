import { configFileLanguageType, RnFilesCreatorConfigFile } from '../../cli/data/rn-files-creator-config-file';
import { FilesManagerService } from "../../manager/service/files-manager.service";
import { RouteCliParams } from '../../cli/data/creator-params';
import { cliTemplatePath, userProjectDirectory } from '../../manager/constants/paths';
import { ComponentAlreadyExistsLogger } from '../logger/component-already-exists.logger';
import { NativeStringFunction } from '../../common/functions/nativeStringFunction';
import { generateImportCodeLine, generateJsxCodeLine, getMainRoutePathAndTagReference, mainRouteFileName, routeFileToCopy, routeWordsToRename } from '../data/route-constants';
import { routesTypesEnum } from '../../cli/data/args-cli-options';

export class RouteBuilderService {
  private routeCliParams: RouteCliParams = {} as RouteCliParams
  private projectConfig: RnFilesCreatorConfigFile = {} as RnFilesCreatorConfigFile

  constructor(private readonly filesManagerService: FilesManagerService) {}

  async handle(routeCliParams: RouteCliParams, projectConfig: RnFilesCreatorConfigFile) {
    this.setConfigVars(routeCliParams, projectConfig);
    const wasRouteCreated = await this.createRoute();

    // TODO: include route on main route or where it belongs
    if(wasRouteCreated) await this.includeRouteOnMainRoute(this.routeCliParams.route, '', projectConfig.language);
    return wasRouteCreated;
    // TODO: return which libs the cli shall install
  }

  private setConfigVars(routeCliParams: RouteCliParams, projectConfig: RnFilesCreatorConfigFile) {
    this.routeCliParams = routeCliParams
    this.projectConfig = projectConfig
  }

  private async createRoute(): Promise<boolean> {
    // TODO: if fail remove dir
    const { fileName, templateFileName} = routeFileToCopy[this.projectConfig.language](this.routeCliParams.route);
    if (await this.checkIfRouteExists(fileName)) return false;
    return await this.createRouteFile(this.routeCliParams.route, this.routeCliParams.routeType, fileName, templateFileName);
  }

  private async checkIfRouteExists(fileName: string): Promise<boolean> {
    const routeName = this.routeCliParams.route;
    const doesExist = await this.filesManagerService.checkIfPathExists(`${userProjectDirectory.route}\/${fileName}`);
    if (doesExist) new ComponentAlreadyExistsLogger(routeName);
    const doesPathExist = await this.filesManagerService.checkIfPathExists(`${userProjectDirectory.route}\/`);
    if (!doesPathExist) await this.filesManagerService.createDirectory(userProjectDirectory.route)
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

  private async createMainRouteFile(language: configFileLanguageType): Promise<boolean> {
    const mainFileExists = await this.filesManagerService.checkIfPathExists(userProjectDirectory.route + mainRouteFileName[language].fileName);
    if(mainFileExists) return false;
    return await this.filesManagerService.copyFile(
      `${cliTemplatePath.route}\/${mainRouteFileName[language].templateFileName}`, 
      userProjectDirectory.route, 
      mainRouteFileName[language].fileName
    );
  }

  private async includeRouteOnMainRoute(routeName: string, nestedRouteName: string, language: configFileLanguageType): Promise<boolean> {
    const { nestedRouteTagReference, importTermToFind } = getMainRoutePathAndTagReference(nestedRouteName);
    const routeFileName = (!nestedRouteName) ? mainRouteFileName[language].fileName : routeFileToCopy[this.projectConfig.language](nestedRouteName).fileName;
    if(!nestedRouteName) await this.createMainRouteFile(language);

    const nestedRouteData = await this.filesManagerService.readFile(userProjectDirectory.route + routeFileName);
    if(!nestedRouteData) return false;
    const codeLines = nestedRouteData?.split('\n') as string[];
    // TODO: convert app.route.tsx to AppRoute
    const lineOfLastImport = this.getLineNumberFromLastOcorrency(codeLines, importTermToFind)
    codeLines?.splice(lineOfLastImport+1, 0, generateImportCodeLine(routeName));

    // TODO: get space number from the file
    const lineOfNavigatorContentTag = this.getLineNumberFromLastOcorrency(codeLines, nestedRouteTagReference)
    codeLines?.splice(lineOfNavigatorContentTag+1, 0, generateJsxCodeLine(routeName, !nestedRouteName));

    return await this.filesManagerService.updateFile(userProjectDirectory.route, routeFileName, codeLines?.join('\n')) 
  }

  private getLineNumberFromLastOcorrency(codeLines: string[], textToFind: string): number {
    return codeLines?.reduce(
      (previousValue, codeLine: string, index) => {
        const found = codeLine.indexOf(textToFind);
        if (found > -1) return index;
        return previousValue;
      }, 
      -1
    ) as number;
  }
}