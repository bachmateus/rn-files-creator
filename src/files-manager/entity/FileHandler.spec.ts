import { FileManagerEntity } from "./file-manager.entity";
import * as fs from 'node:fs/promises';
import path from "node:path";

const targetPath = __dirname;

describe('Test FileHandler', () => {
  let fileHandler: FileManagerEntity;

  beforeAll(() => {
    fileHandler = new FileManagerEntity();
  })

  // describe('checkIfPathExists', () =>{
  //   it('should return true to file exists', async () => {
  //     expect(await fileHandler.checkIfPathExists(targetPath+'/file-manager.entity.ts')).toBeTruthy()
  //   });
  //   it('should return false to an unexistant file', async () => {
  //     expect(await fileHandler.checkIfPathExists(targetPath+'/fake-file.ts')).toBeFalsy()
  //   });
    // it('should return true to an existing diretory', async () => {
    //   expect(await fileHandler.checkIfPathExists(targetPath)).toBeTruthy()
    // });
    // it('should return false to a unknown diretory', async () => {
    //   const targetPath = __dirname + '-non-existing';
    //   expect(await fileHandler.checkIfPathExists(targetPath)).toBeFalsy()
    // });
  // })

  // describe('createDirectory', () => {
  //   it('should success to create a folder', async () => {
  //     jest.spyOn(fs, 'mkdir').mockReturnValueOnce(Promise.resolve(targetPath+'/test'));

  //     const resp = await fileHandler.createDirectory(targetPath+'/test');
  //     console.log(resp)
  //   });
    // it('should fail to create a folder', async () => {
    //   const resp = await fileHandler.createDirectory(targetPath+'/test')
    //   console.log(resp)
    // })
  // })
  
  // describe('deleteDirectory', () => {
  //   it('should success to delete a folder', async () => {
  //     const resp = await fileHandler.deleteDirectory(targetPath+'/test');
  //     console.log(resp)
  //   });
    // it('should fail to create a folder', async () => {
    //   const resp = await fileHandler.createDirectory(targetPath+'/test')
    //   console.log(resp)
    // })
  // })

  // describe('copyFile', () => {
  //   it('should success to copy file', async() => {
  //     const filePath = targetPath + '/FileHandler.spec.ts';
  //     const resp = await fileHandler.copyFile(filePath, targetPath + '/test/FileHandler.spec.ts');
  //   })
  // })

  // describe('readFile', () =>{
  //   it('should success to return file content', async() => {
  //     const filePath = targetPath + '/FileHandler.spec.ts';
  //     const fileContent = await fileHandler.readFile(filePath);
  //     expect(typeof fileContent).toEqual('string');
  //   })
    
  //   it('should fail to return file content', async() => {
  //     const filePath = targetPath + '/fake-file.spec.ts';
  //     const fileContent = await fileHandler.readFile(filePath);
  //     expect(fileContent).toEqual(null);
  //   })
  // })

  // describe('writeFile', () =>{
    it('should success to copy template directory', async() => {
      const filePath = targetPath;
      const fileContent = await fileHandler.writeFile(filePath, content);
      // expect(typeof fileContent).toEqual('string');
    })

    // it('should success to write  file content', async() => {
    //   const filePath = targetPath + '/testing-file.ts';
    //   const content = `testing a file\n\n    testing\ntests`;
    //   const fileContent = await fileHandler.writeFile(filePath, content);
    //   // expect(typeof fileContent).toEqual('string');
    // })
    
  //   it('should fail to return file content', async() => {
  //     const filePath = targetPath + '/fake-file.spec.ts';
  //     const fileContent = await fileHandler.readFile(filePath);
  //     expect(fileContent).toEqual(null);
  //   })
  // })

})