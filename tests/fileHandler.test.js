//need to modularize the code and add more test cases 

const fs = require("fs");
const { readAllFiles } = require("../src/fileHandler");
const { promisfyReadDir, promisfyReadFile, promisifyAppendFile,
    promisfyWriteFile, readAndFilterFiles } = require('../src/fileHandlerUtils')

describe('Read and Filter directory files', () => {
    it('should read files name into an array', async () => {
        jest.spyOn(fs, 'readdir').mockImplementation((directoryPath, encoding, callback) => {
            callback(null, ['beverages.txt', 'fruits.txt', 'vegetables.txt']);
        });
        const files = await promisfyReadDir('../seed');
        expect(files).toStrictEqual(['beverages.txt', 'fruits.txt', 'vegetables.txt']);
    });
    it('should read and display the data in a file in array format', async () => {
        jest.spyOn(fs, 'readFile').mockImplementation((filepath, encoding, callback) => {
            callback(null, 'mango\r\nbanana\r\norange\r\napple');
        });
        const fruits = promisfyReadFile('../seed/fruits.txt');
        return expect(fruits).resolves.toStrictEqual(['mango', 'banana', 'orange', 'apple']);
    });
    it('should return invalid message if file is not found', async () => {
        jest.spyOn(fs, 'readFile').mockImplementation((filepath, encoding, callback) => {
            callback(new Error('File cannot be found!'), null);
        });
        try {
            await promisfyReadFile('file.txt');
        } catch (err) {
            expect(err.message).toBe('File cannot be found!');
        }
    });
    it('should return invalid message if input is not a string', async () => {
        try {
            await promisfyReadFile(5);
        } catch (err) {
            expect(err.message).toBe('Invalid, enter a proper filepath!');
        }
    });
    it('should return invalid message if filter character is not string', async () => {
        try {
            await promisfyReadFile('./seed', 5);
        } catch (err) {
            expect(err.message).toBe('Invalid, enter a proper filter Character!');
        }
    });
}) 