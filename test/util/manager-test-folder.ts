import { FilesManagerService } from "../../src/manager/service/files-manager.service";

const testTargetDirectory = process.cwd()+'\/test\/target-dir';

export const createTestDir = async () => {
  const filesManagerService = new FilesManagerService();
  await filesManagerService.createDirectory(testTargetDirectory)
} 

export const removeTestDir = async () => {
  const filesManagerService = new FilesManagerService();
  if (await filesManagerService.checkIfPathExists(testTargetDirectory))
    await filesManagerService.deleteDirectory(testTargetDirectory)
}