const fs = require('fs');
const {promisfyReadDir,promisfyReadFile,promisifyAppendFile}=require('../src/fileHandlerUtilities.js');

describe("test promisifyReadDirectory",()=>{
    it("should return list of the files for valid directory",async ()=>{
        jest.spyOn(fs, 'readdir').mockImplementation((filepath,encoding, callback) => {
            callback(null, ['beverages.txt', 'fruits.txt', 'vegetables.txt']);
          });
        const promise = promisfyReadDir('../seed');
        return expect(promise).resolves.toStrictEqual(['beverages.txt','fruits.txt','vegetables.txt']);
    });
    it("should return data of the file for valid file name",async ()=>{
        jest.spyOn(fs, 'readdir').mockImplementation((filepath,encoding, callback) => {
            callback(new Error('Directory cannot be found!'), null);
          });
          try {
            await promisfyReadDir('./seed');
          } catch (err) {
            expect(err.message).toBe('Directory cannot be found!');
          }
    });
});

describe("test promisifyReadFile",()=>{
    it("should return data of the file for valid file name",async ()=>{
        // AAA
        // Arrange
        jest.spyOn(fs, 'readFile').mockImplementation((filepath,encoding, callback) => {
            callback(null, 'mango\r\nbanana\r\norange\r\napple\r\nWatermelon');
          });
        // Act
        const promise = promisfyReadFile('../seed/fruits.txt');
        // Assert
        return expect(promise).resolves.toStrictEqual(['mango\r','banana\r','orange\r','apple\r','Watermelon']);
    });
    it("should throw an error for Invalid file name",async ()=>{
        jest.spyOn(fs, 'readFile').mockImplementation((filepath,encoding, callback) => {
            callback(new Error('File cannot be found!'), null);
          });
          try {
            await promisfyReadFile('file.txt');
          } catch (err) {
            expect(err.message).toBe('File cannot be found!');
          }
    });
});