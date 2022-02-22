const fs = require('fs');
const { promisifyReadDir, promisifyReadFile, promisifyWriteFile } = require('../src/utils/fileUtilities');

describe('PromisifyReadFile function', () => {
  it('should read and display the data in a file in array format', async () => {
    jest.spyOn(fs, 'readFile').mockImplementation((filepath, callback) => {
      callback(null, ['mango\r\nbanana\r\norange\r\napple']);
    });
    const fruits = promisifyReadFile('../seed/fruits.txt');
    return expect(fruits).resolves.toStrictEqual(['mango', 'banana', 'orange', 'apple']);
  });
  it('should return invalid message if file is not found', async () => {
    jest.spyOn(fs, 'readFile').mockImplementation((filepath, callback) => {
      callback(new Error('File cannot be found!'), null);
    });
    try {
      await promisifyReadFile('file.txt');
    } catch (err) {
      expect(err.message).toBe('File cannot be found!');
    }
  });
  it('should return invalid message if input is not a string', async () => {
    try {
      await promisifyReadFile(5);
    } catch (err) {
      expect(err.message).toBe('Invalid, enter a proper filepath!');
    }
  });
  it('should return invalid message if filter character is not string', async () => {
    try {
      await promisifyReadFile('./seed', 5);
    } catch (err) {
      expect(err.message).toBe('Invalid, enter a proper filter Character!');
    }
  });
});

describe('PromisifyReadDir function', () => {
  it('should read files name into an array', async () => {
    jest.spyOn(fs, 'readdir').mockImplementation((directoryPath, callback) => {
      callback(null, ['beverages.txt', 'fruits.txt', 'vegetables.txt']);
    });
    const files = await promisifyReadDir('../seed');
    expect(files).toStrictEqual(['beverages.txt', 'fruits.txt', 'vegetables.txt']);
  });
  it('should return invalid message if directory not found', async () => {
    jest.spyOn(fs, 'readdir').mockImplementation((directoryPath, callback) => {
      callback(new Error('Directory not found!'), null);
    });
    try {
      await promisifyReadDir('seeds');
    } catch (err) {
      expect(err.message).toBe('Directory not found!');
    }
  });
  it('should return invalid message if input is not a string', async () => {
    try {
      await promisifyReadDir(5);
    } catch (err) {
      expect(err.message).toBe('Invalid, enter a proper Directory Path!');
    }
  });
});

describe('PromisifyWriteFile function', () => {
  it('should write into a new line of the file and return file contents in array', async () => {
    jest.spyOn(fs, 'appendFile').mockImplementation((filePath, content, errorCallback) => {
      errorCallback(null);
    });
    jest.spyOn(fs, 'readFile').mockImplementation((filePath, callback) => {
      callback(null, ['mango\r\nbanana\r\norange\r\napple\r\nstrawberry\r\npeach']);
    });
    const writefilePromise = await promisifyWriteFile('./seed/fruits.txt', '\r\nstrawberry\r\npeach');
    expect(writefilePromise).toStrictEqual(['mango', 'banana', 'orange', 'apple', 'strawberry', 'peach']);
  });
  it('should return invalid message if file is not found', async () => {
    jest.spyOn(fs, 'appendFile').mockImplementation((filePath, content, errorCallback) => {
      errorCallback('Cannot write into file!');
    });
    try {
      await promisifyWriteFile('seed', 'exampledata');
    } catch (err) {
      expect(err.message).toBe('Cannot write into file \'seed\'!');
    }
  });
  it('should return invalid message if file path is not string', async () => {
    try {
      await promisifyWriteFile(5);
    } catch (err) {
      expect(err.message).toBe('Invalid, enter a proper filepath!');
    }
  });
  it('should return invalid message if no data is given to write', async () => {
    try {
      await promisifyWriteFile('./seed/fruits.txt');
    } catch (err) {
      expect(err.message).toBe('Invalid, Enter data to write!');
    }
  });
  it('should return invalid message if data is not a string buffer', async () => {
    try {
      await promisifyWriteFile('./seed/fruits.txt', 5);
    } catch (err) {
      expect(err.message).toBe('Invalid, enter string buffer data!');
    }
  });
});
