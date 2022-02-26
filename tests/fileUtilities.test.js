const fs = require('fs');
const {
  promisifyReadDir, promisifyReadFile, promisifyAppendFile, removeFromFile, filterData,
} = require('../src/utils/fileUtilities');

describe('PromisifyReadFile function', () => {
  it('should read and display the data in a file in array format', async () => {
    jest.spyOn(fs, 'readFile').mockImplementation((filepath, callback) => {
      callback(null, 'mango\r\nbanana\r\norange\r\napple');
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

describe('PromisifyAppendFile function', () => {
  it('should write into a new line of the file and return file contents in array', async () => {
    jest.spyOn(fs, 'appendFile').mockImplementation((filePath, content, errorCallback) => {
      errorCallback(null);
    });
    jest.spyOn(fs, 'readFile').mockImplementation((filePath, callback) => {
      callback(null, ['mango\r\nbanana\r\norange\r\napple\r\nstrawberry\r\npeach']);
    });
    const writefilePromise = await promisifyAppendFile('./seed/fruits.txt', '\r\nstrawberry\r\npeach');
    expect(writefilePromise).toStrictEqual(['mango', 'banana', 'orange', 'apple', 'strawberry', 'peach']);
  });
  it('should return invalid message if file is not found', async () => {
    jest.spyOn(fs, 'appendFile').mockImplementation((filePath, content, errorCallback) => {
      errorCallback('Cannot write into file!');
    });
    try {
      await promisifyAppendFile('seed', 'exampledata');
    } catch (err) {
      expect(err.message).toBe('Cannot write into file \'seed\'!');
    }
  });
  it('should return invalid message if file path is not string', async () => {
    try {
      await promisifyAppendFile(5);
    } catch (err) {
      expect(err.message).toBe('Invalid, enter a proper filepath!');
    }
  });
  it('should return invalid message if no data is given to write', async () => {
    try {
      await promisifyAppendFile('./seed/fruits.txt');
    } catch (err) {
      expect(err.message).toBe('Invalid, Enter data to write!');
    }
  });
  it('should return invalid message if data is not a string buffer', async () => {
    try {
      await promisifyAppendFile('./seed/fruits.txt', 5);
    } catch (err) {
      expect(err.message).toBe('Invalid, enter string buffer data!');
    }
  });
});

describe('RemoveFromFile function', () => {
  it('should filter content from file and return the modified file contents in an array', async () => {
    jest.spyOn(fs, 'writeFile').mockImplementation((filePath, content, errorCallback) => {
      errorCallback(null);
    });
    jest.spyOn(fs, 'readFile').mockImplementation((filePath, callback) => {
      callback(null, ['mango\r\nbanana\r\norange\r\napple\r\nstrawberry\r\npeach']);
    });
    const fruitsWithoutB = await removeFromFile('./seed/fruits.txt', 'b');
    expect(fruitsWithoutB).toEqual(['mango', 'banana', 'orange', 'apple', 'strawberry', 'peach']);
  });
  it('should return invalid message if file is not found', async () => {
    jest.spyOn(fs, 'readFile').mockImplementation((filePath, callback) => {
      callback(new Error('Cannot find file!'), null);
    });
    try {
      await removeFromFile('seed', 'c');
    } catch (err) {
      expect(err.message).toBe('Cannot find file!');
    }
  });
  it('should return invalid message if filePath is not string', async () => {
    try {
      await removeFromFile(5);
    } catch (err) {
      expect(err.message).toBe('Invalid, enter a proper filepath!');
    }
  });
  it('should return invalid message if filter character not given', async () => {
    try {
      await removeFromFile('somedirectory');
    } catch (err) {
      expect(err.message).toBe('Invalid, enter a proper filter Character!');
    }
  });
  it('should return invalid message if filter character is not string', async () => {
    try {
      await removeFromFile('somedirectory', 5);
    } catch (err) {
      expect(err.message).toBe('Invalid, enter a proper filter Character!');
    }
  });
});
describe('FilterData function', () => {
  it('should return invalid message if filter character is not string', () => {
    try {
      filterData([], 5);
    } catch (err) {
      expect(err.message).toBe('Invalid, enter a proper filter Character!');
    }
  });
  it('should return invalid message if input array is not an array', () => {
    try {
      filterData(2, 'c');
    } catch (err) {
      expect(err.message).toBe('Invalid, enter proper array!');
    }
  });
  it('should return invalid message if the array does not contain only strings', () => {
    try {
      filterData([2, 'hi']);
    } catch (err) {
      expect(err.message).toBe('Invalid, enter proper array!');
    }
  });
  const testArray = ['banana', 'broccoli', 'beans', 'coleslaw'];
  it('should return only content starting with filtercharacter if include flag is true', () => {
    expect(filterData(testArray, 'b', true)).toEqual(testArray.slice(0, 3));
  });
  it('should return only content not starting with filtercharacter if include flag is false', () => {
    expect(filterData(testArray, 'b', false)).toEqual([testArray[3]]);
  });
});
