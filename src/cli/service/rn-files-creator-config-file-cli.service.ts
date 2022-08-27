import { userProjectPath } from "../../manager/constants/paths";
import { FilesManagerService } from "../../manager/service/files-manager.service";
import { RnFilesCreatorConfigFile } from "../data/rn-files-creator-config-file";
import { RnFilesCreatorConfigFileView } from "../view/rn-files-creator-config-file-cli.view";

export class RnFilesCreatorConfigFileService {
  constructor(
    private filesManagerService: FilesManagerService,
    private rnFilesCreatorConfigFileView: RnFilesCreatorConfigFileView
  ) {}

  async handleGetUserRnConfigFile() {
    const savedRnConfigFile = await this.getUserRnConfigFile();
    const validatedRnConfigFile = await this.rnFilesCreatorConfigFileView.askforMissingParams(savedRnConfigFile) as RnFilesCreatorConfigFile;
    const configHasChanged = JSON.stringify(validatedRnConfigFile) !== JSON.stringify(savedRnConfigFile)
    if (configHasChanged) await this.updateUserRnConfigFile(validatedRnConfigFile)
    return validatedRnConfigFile
  }

  private async getUserRnConfigFile(): Promise<RnFilesCreatorConfigFile> {
    const rnConfigFileContent = await this.filesManagerService.readFile(userProjectPath + '\\rn-files-config-service.json');
    const rnConfigFile = rnConfigFileContent ? JSON.parse(rnConfigFileContent) : {};
    return rnConfigFile;
  }

  private async updateUserRnConfigFile(rnConfigFile: RnFilesCreatorConfigFile){
    await this.filesManagerService.writeFile(userProjectPath, '\\rn-files-config-service.json', JSON.stringify(rnConfigFile));
  }
}