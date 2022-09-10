import { FilesManagerService } from "./service/files-manager.service";
import { PackagesManagerService } from "./service/packages-manager.service";

export const filesManagerService = new FilesManagerService();
export const packagesManagerService = new PackagesManagerService(filesManagerService);