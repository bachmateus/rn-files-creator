import inquirer from 'inquirer';
import { cli } from "../../src/main";
import { PromptLogger } from '../../src/common/logger/prompt-logger';
import { createCommandsArgs } from "../util/create-commands-args";
import { rnFilesCreatorConfigFileService } from "../../src/cli/cli.module";
import { removeTestDir } from "../util/manager-test-folder"; 
import { filesManagerService } from "../../src/manager/manager.module";

jest.mock('../../src/common/logger/prompt-logger');

describe('Create Screen Flow', () => {
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

  it('should SUCCESS to create a screen', async() => {
    const args = createCommandsArgs('rn -c Screen');
    const resp = await cli(args);
    expect(resp).toBeTruthy()
    expect(PromptLogger).toHaveBeenCalledWith({"interruptProcess": false, "loggerType": "CREATE", "message": "\/Screen\/index.js"});
    expect(PromptLogger).toHaveBeenCalledWith({"interruptProcess": false, "loggerType": "CREATE", "message": "\/Screen\/styles.js"});
  })
  it('should SUCCESS to create two screens', async() => {
    const args = createCommandsArgs('rn -c Screenx21 -c Screenx22');
    const resp = await cli(args);
    expect(resp).toBeTruthy()
    expect(PromptLogger).toHaveBeenCalledWith({"interruptProcess": false, "loggerType": "CREATE", "message": "\/Screenx21\/index.js"});
    expect(PromptLogger).toHaveBeenCalledWith({"interruptProcess": false, "loggerType": "CREATE", "message": "\/Screenx21\/styles.js"});
    expect(PromptLogger).toHaveBeenCalledWith({"interruptProcess": false, "loggerType": "CREATE", "message": "\/Screenx21\/index.js"});
    expect(PromptLogger).toHaveBeenCalledWith({"interruptProcess": false, "loggerType": "CREATE", "message": "\/Screenx21\/styles.js"});
  })
  it('should SUCCESS to create a screen if arg -c was not passed', async() => {
    jest.spyOn(inquirer, 'prompt').mockResolvedValueOnce(Promise.resolve({ creator: 'screen' }))
    jest.spyOn(inquirer, 'prompt').mockResolvedValueOnce(Promise.resolve({screens: 'ScreenWithNoParam'}))
    const args = createCommandsArgs('rn');
    const resp = await cli(args);
    expect(resp).toBeTruthy()
    expect(PromptLogger).toHaveBeenCalledWith({"interruptProcess": false, "loggerType": "CREATE", "message": "\/ScreenWithNoParam\/index.js"});
    expect(PromptLogger).toHaveBeenCalledWith({"interruptProcess": false, "loggerType": "CREATE", "message": "\/ScreenWithNoParam\/styles.js"});
  })
  
  it('should FAIL if it already exists', async() => {
    jest.spyOn(filesManagerService, 'checkIfPathExists').mockReturnValueOnce(Promise.resolve(true))
    const screenName = 'ScreenAlreadyExists';
    const args = createCommandsArgs('rn -c ' + screenName);
    await cli(args);
    expect(PromptLogger).toHaveBeenCalledWith({"interruptProcess": false, "loggerType": "ERROR", "message": `${screenName} already exists`});
  })
  it('should FAIL if it\'s name starts with a number', async() => {
    const screenName = '2ScreenTest';
    const args = createCommandsArgs('rn -c ' + screenName);      
    await cli(args);
    expect(PromptLogger).toHaveBeenCalledWith({"interruptProcess": true, "loggerType": "ERROR", "message": `Invalid component name: ${screenName}.`});
  })
  it('should FAIL if it\'s name starts with an special char', async() => {
    const screenName = '&ScreenTest';
    const args = createCommandsArgs('rn -c ' + screenName);
    await cli(args);
    expect(PromptLogger).toHaveBeenCalledWith({"interruptProcess": true, "loggerType": "ERROR", "message": `Invalid component name: ${screenName}.`});
  })
  
})
