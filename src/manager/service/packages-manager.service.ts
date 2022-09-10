import { FilesManagerService } from "@bachmateus/rn-files-creator/src/manager/service/files-manager.service";
import { userProjectDirectory } from "../constants/paths";
import { ErrorNotReactNativeProjectLogger } from "../logger/error-not-react-native-project.logger";

export class PackagesManagerService {
  constructor(
    private filesManagerService: FilesManagerService
  ){}

  async isReactNativeProject(): Promise<boolean> {
    await this.checkIfPackageJsonExists();
    await this.checkIfPackageJsonBelongsToRNProject();
    return true;
  }

  async checkIfPackageJsonExists(): Promise<void> {
    const packageJsonExists = await this.filesManagerService.checkIfPathExists(userProjectDirectory.packageJson);
    if (!packageJsonExists) new ErrorNotReactNativeProjectLogger();
  }

  async checkIfPackageJsonBelongsToRNProject(): Promise<void> {
    const packageJsonContent = await this.filesManagerService.readFile(userProjectDirectory.packageJson);
    if (packageJsonContent?.indexOf('react-native') === -1) new ErrorNotReactNativeProjectLogger();
  }
}