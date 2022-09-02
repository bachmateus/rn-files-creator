import { removeTestDir } from "../../../util/manager-test-folder";
import { screenBuilderService } from "../../../../src/builder/builder.module";
import { RnFilesCreatorConfigFile } from "../../../../src/cli/data/rn-files-creator-config-file";
import { PromptLogger } from '../../../../src/common/logger/prompt-logger';

jest.mock('../../../../src/common/logger/prompt-logger');
const javascriptConfigFile:RnFilesCreatorConfigFile = { language:'JavaScript', styleType: 'StyleSheet' }

describe('Screen builder', () => {
  beforeAll(async() => {
    await removeTestDir()
  });
  afterAll(async() => {
    await removeTestDir()
  });
  beforeEach(() => {
    jest.clearAllMocks();
    jest.restoreAllMocks()
  })

  it('should SUCCESS to create a screen', async() => {
    const screensNames = ['Screen1'];
    await screenBuilderService.handle(screensNames, javascriptConfigFile);
    expect(PromptLogger).toHaveBeenCalledWith({"interruptProcess": false, "loggerType": "CREATE", "message": "\\Screen1\\index.js"});
    expect(PromptLogger).toHaveBeenCalledWith({"interruptProcess": false, "loggerType": "CREATE", "message": "\\Screen1\\styles.js"});
  })
})