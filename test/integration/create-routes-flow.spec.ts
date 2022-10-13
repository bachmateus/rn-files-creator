import { cli } from "../../src/main";
import { createCommandsArgs } from "../util/create-commands-args";
import { rnFilesCreatorConfigFileService } from "../../src/cli/cli.module";
import { removeTestDir } from "../util/manager-test-folder"; 
import { filesManagerService, packagesManagerService } from "../../src/manager/manager.module";
import { userProjectDirectory } from '../../src/manager/constants/paths';
import { generateImportCodeLine, generateJsxCodeLine, generateRouteNameFile } from '../../src/builder/data/route-constants';
import { LoggerColor } from '../../src/common/data/prompt-logger-props';

const mainRouteFilePath = userProjectDirectory.route+'index.js';
describe('Create Routes Flow', () => {
  beforeAll(async() => {
    await removeTestDir()
  });

  afterEach(async() => {
    await removeTestDir()
  });
  beforeEach(() => {
    jest.clearAllMocks();
    jest.restoreAllMocks()
    jest.spyOn(rnFilesCreatorConfigFileService, 'handleGetUserRnConfigFile').mockReturnValue(Promise.resolve({language: 'JavaScript', styleType: 'StyleSheet'}))
    jest.spyOn(packagesManagerService, 'isReactNativeProject').mockReturnValue(Promise.resolve(true))
    jest.spyOn(process, 'exit').mockImplementation();
  })

  it('should SUCCESS to create a route and include it in main route', async() => {
    const consoleLogSpy = jest.spyOn(console,'log');
    const routeName = 'TestRoute';
    const routeFileName = generateRouteNameFile(routeName) + '.js';
    const args = createCommandsArgs(`rn -r ${routeName} -t bottomTab`);
    const resp = await cli(args);
    expect(resp).toBeTruthy()
    expect(consoleLogSpy).toBeCalledTimes(3);
    expect(consoleLogSpy).toHaveBeenNthCalledWith(1, LoggerColor.CREATE, routeFileName);
    expect(consoleLogSpy).toHaveBeenNthCalledWith(2, LoggerColor.CREATE, "index.js");
    // TODO: alterar quando o update tiver pronto
    // expect(consoleLogSpy).toHaveBeenNthCalledWith(3, LoggerColor.UPDATE, "index.js");
    const routeContent = await filesManagerService.readFile(userProjectDirectory.route+routeFileName);
    const mainRouteContent = await filesManagerService.readFile(mainRouteFilePath)
    
    expect(routeContent).toContain(routeName)
    expect(mainRouteContent).toContain(generateImportCodeLine(routeName))
    expect(mainRouteContent).toContain(generateJsxCodeLine(routeName, true));
  });
  
  it('should SUCCESS to create two routes and include them in main route', async() => {
    const consoleLogSpy = jest.spyOn(console,'log');
    
    const route1 = 'TestRoute1';
    const route1FileName = generateRouteNameFile(route1) + '.js';
    const args1 = createCommandsArgs(`rn -r ${route1} -t bottomTab`);
    expect(await cli(args1)).toBeTruthy();
    expect(consoleLogSpy).toHaveBeenNthCalledWith(1, LoggerColor.CREATE, route1FileName);
    expect(consoleLogSpy).toHaveBeenNthCalledWith(2, LoggerColor.CREATE, "index.js");
    expect(consoleLogSpy).toHaveBeenNthCalledWith(3, LoggerColor.CREATE, "index.js");
    // TODO: alterar quando o update tiver pronto
    // expect(consoleLogSpy).toHaveBeenNthCalledWith(3, LoggerColor.UPDATE, "index.js");
    
    const route2 = 'TestRoute2';
    const route2FileName = generateRouteNameFile(route2) + '.js';
    const args2 = createCommandsArgs(`rn -r ${route2} -t bottomTab`);
    expect(await cli(args2)).toBeTruthy();
    expect(consoleLogSpy).toHaveBeenNthCalledWith(4, LoggerColor.CREATE, route2FileName);
    expect(consoleLogSpy).toHaveBeenNthCalledWith(5, LoggerColor.CREATE, "index.js");
    // TODO: alterar quando o update tiver pronto
    // expect(consoleLogSpy).toHaveBeenNthCalledWith(5, LoggerColor.UPDATE, "index.js");

    const mainRouteContent = await filesManagerService.readFile(mainRouteFilePath)
    expect(mainRouteContent).toContain(generateImportCodeLine(route1))
    expect(mainRouteContent).toContain(generateJsxCodeLine(route1, true));
    expect(mainRouteContent).toContain(generateImportCodeLine(route2))
    expect(mainRouteContent).toContain(generateJsxCodeLine(route2, true));
  });
})