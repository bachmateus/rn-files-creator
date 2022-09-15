import { cli } from "../../src/main";
import { createCommandsArgs } from "../util/create-commands-args";
import { filesManagerService, packagesManagerService } from "../../src/manager/manager.module";
import { txtHelpFile } from "../../src/manager/constants/paths";
import { componentCliService, rnFilesCreatorConfigFileService, screenCliService } from "../../src/cli/cli.module";

describe('Help Flow', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    jest.restoreAllMocks();
    jest.spyOn(console, 'log').mockImplementation()
    jest.spyOn(packagesManagerService, 'isReactNativeProject').mockReturnValue(Promise.resolve(true))
  })

  it('should SUCCESS to show help commands', async() => {
    const consoleLogSpy = jest.spyOn(console, 'log')
    const args = createCommandsArgs('rn -h');
    const helpFileContent = await filesManagerService.readFile(txtHelpFile) as string;
    await cli(args);
    expect(consoleLogSpy).toHaveBeenCalledWith(helpFileContent);
  })
  
  it('should SUCCESS to skip any other arg if -h was passed', async() => {
    const rnFilesCreatorConfigFileServiceSpy = jest.spyOn(rnFilesCreatorConfigFileService, 'handleGetUserRnConfigFile')
    const componentCliServiceSpy = jest.spyOn(componentCliService, 'handler')
    const screenCliServiceSpy = jest.spyOn(screenCliService, 'handler')
    const args = createCommandsArgs('rn -h -c Component1 -s Screen1');
    await cli(args);
    expect(rnFilesCreatorConfigFileServiceSpy).not.toHaveBeenCalled();
    expect(componentCliServiceSpy).not.toHaveBeenCalled();
    expect(screenCliServiceSpy).not.toHaveBeenCalled();
  })
})
