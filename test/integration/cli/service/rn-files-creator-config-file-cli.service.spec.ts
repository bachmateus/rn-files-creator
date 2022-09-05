import inquirer from 'inquirer';
import { rnFilesCreatorConfigFileService } from "../../../../src/cli/cli.module";
import { filesManagerService } from "../../../../src/manager/manager.module";
import { PromptLogger } from "../../../../src/common/logger/prompt-logger";
import { removeTestDir } from "../../../util/manager-test-folder"; 

jest.mock('../../../../src/common/logger/prompt-logger');
const testTargetDirectory = process.cwd()+'\\test\\target-dir';

describe('Create config file flow', () => {
  beforeEach(() => {
  })
  afterEach(() => {
    jest.clearAllMocks();
  })
  beforeAll(async() => {
    await removeTestDir()
    await filesManagerService.createDirectory(testTargetDirectory)
  })
  afterAll(async() => {
    await removeTestDir()
  });

  it('should SUCCESS to create a config file', async () => {
    jest.spyOn(inquirer, 'prompt').mockResolvedValueOnce(Promise.resolve({ language: 'JavaScript', styleType: 'styled-component'}))
    const response = await rnFilesCreatorConfigFileService.handleGetUserRnConfigFile();
    expect(response).toEqual({"language":"JavaScript","styleType":"styled-component"})
    expect(PromptLogger).toHaveBeenCalledWith({"interruptProcess": false, "loggerType": "CREATE", "message": "\\rn-files-creator.json"});
  })
  it('should SUCCESS to get a created config file', async () => {
    const response = await rnFilesCreatorConfigFileService.handleGetUserRnConfigFile();
    expect(response).toEqual({"language":"JavaScript","styleType":"styled-component"})
    expect(PromptLogger).not.toBeCalled()
  })
})