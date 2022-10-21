import { promises as fs } from 'fs';
import { ErrorFileCreated } from '../logger/error-file-created.logger';
import { FileNotFoundException } from '../logger/file-not-found.logger';
import { FileNotWrittenException } from '../logger/file-not-written.logger';
import { SuccessFileCreated } from '../logger/success-file-created.logger';
import { SuccessFileUpdated } from '../logger/success-file-updated.logger';
const { mkdir, stat, copyFile, readFile, writeFile, rm } = fs;

export class FilesManagerService {
  async checkIfPathExists(filePath: string): Promise<boolean> {
    try {
      await stat(filePath)
      return true
    } catch (e){
      return false
    }
  }

  async createDirectory(targetDirectory: string): Promise<boolean> {
    try {
      const createdDirectory = await mkdir(targetDirectory, { recursive: true });
      if (createdDirectory===undefined) throw new Error("Directory not created") 
      return true
    } catch(error) {
      console.error(error)
      return false
    }
  }

  async copyFile(filePath:string, targetDirectoryPath:string, targetFilePath:string): Promise<boolean> {
    try {
      await copyFile(filePath, targetDirectoryPath + targetFilePath)
      new SuccessFileCreated(targetFilePath)
      return true
    } catch(error) {
      new ErrorFileCreated(targetFilePath)
      // TODO: create a file log txt
      return false
    } 
  }

  async readFile(filePath:string) {
    try {
      return await readFile(filePath, {encoding: 'utf-8'})
    } catch (error) {
      new FileNotFoundException(filePath)
      return null
    }
  }

  async saveOrUpdateFile(directoryPath: string, filePath:string, newContent:string) {
    await writeFile(directoryPath + filePath, newContent);
  }

  async updateFile(directoryPath: string, filePath:string, newContent:string): Promise<boolean> {
    try {
      await this.saveOrUpdateFile(directoryPath, filePath, newContent);
      new SuccessFileUpdated(filePath)
      return true
    } catch (error) {
      new FileNotWrittenException(filePath)
      return false
    }
  }

  async writeFile(directoryPath: string, filePath:string, newContent:string): Promise<boolean> {
    try {
      await this.saveOrUpdateFile(directoryPath, filePath, newContent);
      new SuccessFileCreated(filePath)
      return true
    } catch (error) {
      new FileNotWrittenException(filePath)
      return false
    }
  }

  async deleteDirectory(targetDirectory:string) {
    try {
      return await rm(targetDirectory, {recursive:true});
    } catch (e){
      return null;
    }
  }
}