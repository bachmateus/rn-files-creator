import { cli } from "../../src/main";
import { PromptLogger } from '../../src/common/logger/prompt-logger';
import { createCommandsArgs } from "../util/create-commands-args";
import { FilesManagerService } from "../../src/manager/service/files-manager.service";
import { rnFilesCreatorConfigFileService } from "../../src/cli/cli.module";

jest.mock('../../src/common/logger/prompt-logger');
const testTargetDirectory = process.cwd()+'\\test\\target-dir';

describe('Create Component Flow', () => {
  beforeAll(async() => {
    jest.spyOn(rnFilesCreatorConfigFileService, 'handleGetUserRnConfigFile').mockReturnValue(Promise.resolve({language: 'JavaScript', styleType: 'StyleSheet'}))
  });
  
  afterAll(async() => {
    const filesManagerService = new FilesManagerService();
    if (await filesManagerService.checkIfPathExists(testTargetDirectory))
      await filesManagerService.deleteDirectory(testTargetDirectory)
  });

  it('should SUCCESS to create a component', async() => {
    const args = createCommandsArgs('rn -c ComponentAlreadyExists');
    const resp = await cli(args);
    expect(resp).toBeTruthy()
    expect(PromptLogger).toHaveBeenCalledWith({"interruptProcess": false, "loggerType": "CREATE", "message": "\\ComponentAlreadyExists\\index.js"});
    expect(PromptLogger).toHaveBeenCalledWith({"interruptProcess": false, "loggerType": "CREATE", "message": "\\ComponentAlreadyExists\\styles.js"});
  })
  it('should SUCCESS to create two components', async() => {
    const args = createCommandsArgs('rn -c Component1 -c Component2');
    const resp = await cli(args);
    expect(resp).toBeTruthy()
    expect(PromptLogger).toHaveBeenCalledWith({"interruptProcess": false, "loggerType": "CREATE", "message": "\\Component1\\index.js"});
    expect(PromptLogger).toHaveBeenCalledWith({"interruptProcess": false, "loggerType": "CREATE", "message": "\\Component1\\styles.js"});
    expect(PromptLogger).toHaveBeenCalledWith({"interruptProcess": false, "loggerType": "CREATE", "message": "\\Component2\\index.js"});
    expect(PromptLogger).toHaveBeenCalledWith({"interruptProcess": false, "loggerType": "CREATE", "message": "\\Component2\\styles.js"});
  })
  
  it('should FAIL if it already exists', async() => {
    const componentName = 'ComponentAlreadyExists';
    const args = createCommandsArgs('rn -c ' + componentName);
    await cli(args);
    expect(PromptLogger).toHaveBeenCalledWith({"interruptProcess": false, "loggerType": "ERROR", "message": `${componentName} already exists`});
  })
  it('should FAIL if it\'s name starts with a number', async() => {
    const componentName = '2ComponentTest';
    const args = createCommandsArgs('rn -c ' + componentName);      
    await cli(args);
    expect(PromptLogger).toHaveBeenCalledWith({"interruptProcess": true, "loggerType": "ERROR", "message": `Invalid component name: ${componentName}.`});
  })
  it('should FAIL if it\'s name starts with an special char', async() => {
    const componentName = '&ComponentTest';
    const args = createCommandsArgs('rn -c ' + componentName);
    await cli(args);
    expect(PromptLogger).toHaveBeenCalledWith({"interruptProcess": true, "loggerType": "ERROR", "message": `Invalid component name: ${componentName}.`});
  })
  
})
