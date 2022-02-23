const fs = require('fs');
const {
  promisifyReadFile,
  promisifyReadFolder,
  editFile,
} = require('../src/utils/fileUtilities');

describe('promisifyReadFile', () => {
  it('should resolve the file contents into an array given a valid file path', async () => {
    // eslint-disable-next-line no-undef
    jest.spyOn(fs, 'readFile').mockImplementation((filepath, encoding, callback) => {
      callback(null, 'mango\r\napple\r\ngrapes');
    });
    const fruits = await promisifyReadFile('fruits.txt');
    return expect(fruits).toStrictEqual(['mango', 'apple', 'grapes']);
  });
  it('should return an error if the file does not exist', async () => {
    jest.spyOn(fs, 'readFile').mockImplementation((filepath, encoding, callback) => {
      callback(new Error('Invalid file name'), null);
    });
    try {
      await promisifyReadFile('fruits.txt');
    } catch (err) {
      expect(err.message).toBe('Invalid file name');
    }
  });
  it('should return an error if the first argument is not a string', async () => {
    try {
      await promisifyReadFile(123);
    } catch (err) {
      expect(err.message).toBe('Invalid input for first argument');
    }
  });
  it('should throw an error if the second argument is not a string', async () => {
    jest.spyOn(fs, 'readFile').mockImplementation((filepath, encoding, callback) => {
      callback(null, 'apple\nbanana');
    });
    try {
      await promisifyReadFile('../seed/fruits.txt', 123);
    } catch (err) {
      expect(err.message).toBe('Invalid input for second argument');
    }
  });
});

describe('promisifyreadFolder', () => {
  it('should resolve the file names given a valid file path', async () => {
    jest.spyOn(fs, 'readdir').mockImplementation((folderpath, encoding, callback) => {
      callback(null, 'fruits.txt\nvegetables.txt');
    });
    const files = await promisifyReadFolder('./seed');
    return expect(files).toBe('fruits.txt\nvegetables.txt');
  });
  it('should return an error if the folder does not exist', async () => {
    jest.spyOn(fs, 'readdir').mockImplementation((folderpath, encoding, callback) => {
      callback(new Error('Invalid folder name'), null);
    });
    try {
      await promisifyReadFolder('./seed');
    } catch (err) {
      expect(err.message).toBe('Invalid folder name');
    }
  });
  it('should return an error if the folder  path is not a string', async () => {
    try {
      await promisifyReadFolder(123);
    } catch (err) {
      expect(err.message).toBe('Invalid input type');
    }
  });
});

describe('editFile function', () => {
  xit('should print the new file given the file name and content', async () => {
    jest.spyOn(fs, 'readFile').mockImplementation((filepath, encoding, callback) => {
      callback(null, 'carrot\nbeans\npotato\nspinach\nbrocolli\ncapsicum\nbeetroot');
    });
    jest.spyOn(fs, 'writeFile').mockImplementation((filePath, content, errorCallback) => {
      errorCallback(null);
    });
    const result = await editFile('./seed/vegetables.txt', 'c');
    expect(result).toEqual('beans\npotato\nspinach\nbrocolli\nbeetroot');
  });
  it('should throw an error if the file is not found', async () => {
    jest.spyOn(fs, 'readFile').mockImplementation((filepath, encoding, callback) => {
      callback(new Error('File does not exist'), null);
    });
    try {
      await editFile('seed', 'c');
    } catch (err) {
      expect(err.message).toBe('File does not exist');
    }
  });
  it('should throw an error if the file path is not a string', async () => {
    try {
      await editFile(123, 'c');
    } catch (err) {
      expect(err.message).toBe('Invalid input type for first argument');
    }
  });
  it('should throw an error if the first character is not a string', async () => {
    try {
      await editFile('./seed/vegetables.txt', 12);
    } catch (err) {
      expect(err.message).toBe('Invalid input type for second argument');
    }
  });
});
