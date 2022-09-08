import inquirer from 'inquirer';
import { cli } from "../../src/main";
import { PromptLogger } from '../../src/common/logger/prompt-logger';
import { createCommandsArgs } from "../util/create-commands-args";
import { rnFilesCreatorConfigFileService } from "../../src/cli/cli.module";
import { removeTestDir } from "../util/manager-test-folder"; 
import { filesManagerService } from "../../src/manager/manager.module";

jest.mock('../../src/common/logger/prompt-logger');

describe('Create Component Flow', () => {
  beforeAll(async() => {
    await removeTestDir()
  });
  
  afterAll(async() => {
    await removeTestDir()
  });
  beforeEach(() => {
    jest.clearAllMocks();
    jest.restoreAllMocks()
    jest.spyOn(rnFilesCreatorConfigFileService, 'handleGetUserRnConfigFile').mockReturnValue(Promise.resolve({language: 'JavaScript', styleType: 'StyleSheet'}))
  })

  it('should SUCCESS to create a component', async() => {
    const args = createCommandsArgs('rn -c Component');
    const resp = await cli(args);
    expect(resp).toBeTruthy()
    expect(PromptLogger).toHaveBeenCalledWith({"interruptProcess": false, "loggerType": "CREATE", "message": "\/Component\/index.js"});
    expect(PromptLogger).toHaveBeenCalledWith({"interruptProcess": false, "loggerType": "CREATE", "message": "\/Component\/styles.js"});
  })
  it('should SUCCESS to create two components', async() => {
    const args = createCommandsArgs('rn -c Componentx21 -c Componentx22');
    const resp = await cli(args);
    expect(resp).toBeTruthy()
    expect(PromptLogger).toHaveBeenCalledWith({"interruptProcess": false, "loggerType": "CREATE", "message": "\/Componentx21\/index.js"});
    expect(PromptLogger).toHaveBeenCalledWith({"interruptProcess": false, "loggerType": "CREATE", "message": "\/Componentx21\/styles.js"});
    expect(PromptLogger).toHaveBeenCalledWith({"interruptProcess": false, "loggerType": "CREATE", "message": "\/Componentx21\/index.js"});
    expect(PromptLogger).toHaveBeenCalledWith({"interruptProcess": false, "loggerType": "CREATE", "message": "\/Componentx21\/styles.js"});
  })
  it('should SUCCESS to create a component if arg -c was not passed', async() => {
    jest.spyOn(inquirer, 'prompt').mockResolvedValueOnce(Promise.resolve({ creator: 'component' }))
    jest.spyOn(inquirer, 'prompt').mockResolvedValueOnce(Promise.resolve({components: 'ComponentWithNoParam'}))
    const args = createCommandsArgs('rn');
    const resp = await cli(args);
    expect(resp).toBeTruthy()
    expect(PromptLogger).toHaveBeenCalledWith({"interruptProcess": false, "loggerType": "CREATE", "message": "\/ComponentWithNoParam\/index.js"});
    expect(PromptLogger).toHaveBeenCalledWith({"interruptProcess": false, "loggerType": "CREATE", "message": "\/ComponentWithNoParam\/styles.js"});
  })
  
  it('should FAIL if it already exists', async() => {
    jest.spyOn(filesManagerService, 'checkIfPathExists').mockReturnValueOnce(Promise.resolve(true))
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
