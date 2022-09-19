import { routeBuilderService } from "../../../../src/builder/builder.module";
import { routeFileToCopy, routeWordsToRename } from "../../../../src/builder/data/route-words-to-rename";
import { routesTypesEnum } from "../../../../src/cli/data/args-cli-options";
import { RnFilesCreatorConfigFile } from "../../../../src/cli/data/rn-files-creator-config-file";
import { cliTemplatePath, userProjectDirectory } from "../../../../src/manager/constants/paths";
import { filesManagerService } from "../../../../src/manager/manager.module";
import { createTestDir, removeTestDir } from "../../../util/manager-test-folder";

jest.mock('../../../../src/common/logger/prompt-logger');
const javascriptConfigFile:RnFilesCreatorConfigFile = { language:'TypeScript', styleType: 'StyleSheet' }

describe('Route builder', () => {
  beforeAll(async() => {
    await removeTestDir()
  });
  afterAll(async() => {
    // await removeTestDir()
  });
  beforeEach(() => {
    jest.clearAllMocks();
    jest.restoreAllMocks()
  });

  it('should replace words from template file', async() => {
    const routeType = routesTypesEnum.stack;
    const routeName = 'LoggedRoutes';
    const libraryWords = routeWordsToRename.routeFile.library[routeType];
    const fileData = await filesManagerService.readFile(`${cliTemplatePath.route}\/routes.js`) as string;
    const resp = routeBuilderService['replaceWordsFromTemplateFile'](fileData, routeName, routeType);

    expect(resp.split(libraryWords[0].replaceTo).length).toEqual(3);
    expect(resp).toContain(libraryWords[1].replaceTo);
    expect(resp).toContain(routeName);
  });

  it('should create a route file', async()=> {
    const routeName = 'LoggedRoutes'; 
    const routeType = routesTypesEnum.stack;
    const { fileName, templateFileName } = routeFileToCopy[javascriptConfigFile.language](routeName);
    await filesManagerService.createDirectory(userProjectDirectory.route)
    await routeBuilderService['createRouteFile'](routeName, routeType, fileName, templateFileName);
    
    const resp = await filesManagerService.readFile(`${userProjectDirectory.route}\/${fileName}`) as string;
    expect(resp).toContain(routeName);
  })
})