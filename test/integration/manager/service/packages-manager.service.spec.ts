import { removeTestDir } from '../../../util/manager-test-folder';
import { PromptLogger } from '../../../../src/common/logger/prompt-logger';
import { filesManagerService, packagesManagerService } from '../../../../src/manager/manager.module';

jest.mock('../../../../src/common/logger/prompt-logger');
const testTargetDirectory = process.cwd()+'\/test\/target-dir';
const promptLoggerArgs = {'interruptProcess': true, 'loggerType': 'ERROR', 'message': 'The CLI must be run in the root of a React Native project'};

describe('test PackagesManagerService', () => {
  beforeAll(async() => {
    await removeTestDir()
    await filesManagerService.createDirectory(testTargetDirectory)
  });
  afterAll(async() => {
    await removeTestDir()
  });
  beforeEach(() => {
    jest.clearAllMocks();
    jest.restoreAllMocks()
  })

  it('should stop flow if package.json was not found', async() => {
    await packagesManagerService.checkIfPackageJsonExists()
    expect(PromptLogger).toHaveBeenCalledWith(promptLoggerArgs);
  })
  it('should stop flow if package.json does not belong to a React Native project', async() => {
    await filesManagerService.writeFile(testTargetDirectory, '\/package.json', '{}');
    await packagesManagerService.checkIfPackageJsonBelongsToRNProject()
    expect(PromptLogger).toHaveBeenNthCalledWith(2, promptLoggerArgs);
  })
  it('should return true it is a React Native project', async() => {
    // TODO: consume an example json file
    await filesManagerService.writeFile(testTargetDirectory, '\/package.json', JSON.stringify({dependencies: {"react-native": "0.68.2"}}));
    expect(await packagesManagerService.isReactNativeProject()).toBeTruthy()
    expect(PromptLogger).not.toHaveBeenCalledWith(promptLoggerArgs);
  })
})