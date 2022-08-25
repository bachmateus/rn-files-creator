import { promises as fs } from 'fs';
import { FileNotFoundException } from '../logger/file-not-found.logger';
import { FileNotWrittenException } from '../logger/file-not-written.logger';
const { mkdir, stat, copyFile, readFile, writeFile } = fs;

export class FilesManagerService {
  async checkIfPathExists(filePath: string) {
    try {
      await stat(filePath)
      return true
    } catch {
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

  async copyFile(filePath:string, targetFilePath:string): Promise<boolean> {
    try {
      await copyFile(filePath, targetFilePath)
      return true
    } catch(error) {
      console.error(error)
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

  async writeFile(filePath:string,newContent:string) {
    try {
      return await writeFile(filePath,newContent)
    } catch (error) {
      new FileNotWrittenException(filePath)
      return null
    }
  }
  // async deleteDirectory(targetDirectory:string) {
  //   try {
  //     return await unlink(targetDirectory);
  //   } catch (e){
  //     console.error(e)
  //     return null;
  //   }
  // }
}