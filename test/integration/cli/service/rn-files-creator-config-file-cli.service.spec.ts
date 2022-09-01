import { FilesManagerService } from "../../../../src/manager/service/files-manager.service";
import { rnFilesCreatorConfigFileService } from "../../../../src/cli/cli.module";
import { filesManagerService } from "../../../../src/manager/manager.module";
import inquirer from 'inquirer';
import { PromptLogger } from "../../../../src/common/logger/prompt-logger";

jest.mock('../../../../src/common/logger/prompt-logger');
const testTargetDirectory = process.cwd()+'\\test\\target-dir\\config-file-test';

describe('Create config file flow', () => {
  beforeEach(() => {
  })
  afterEach(() => {
    jest.clearAllMocks();
  })
  beforeAll(async() => {
    await filesManagerService.createDirectory(testTargetDirectory)
  })
  afterAll(async() => {
    const filesManagerService = new FilesManagerService();
    if (await filesManagerService.checkIfPathExists(testTargetDirectory))
      await filesManagerService.deleteDirectory(testTargetDirectory)
  });

  it('should SUCCESS to create a config file', async () => {
    jest.spyOn(inquirer, 'prompt').mockResolvedValueOnce(Promise.resolve({ language: 'JavaScript', styleType: 'styled-component'}))
    const response = await rnFilesCreatorConfigFileService.handleGetUserRnConfigFile();
    expect(response).toEqual({"language":"JavaScript","styleType":"styled-component"})
    expect(PromptLogger).toHaveBeenCalledWith({"interruptProcess": false, "loggerType": "CREATE", "message": "\\rn-files-config-service.json"});
  })
  it('should SUCCESS to get a created config file', async () => {
    const response = await rnFilesCreatorConfigFileService.handleGetUserRnConfigFile();
    expect(response).toEqual({"language":"JavaScript","styleType":"styled-component"})
    expect(PromptLogger).not.toBeCalled()
  })
})