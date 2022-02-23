const fs = require('fs');
const { readFiles, addFileContent } = require('../src/fileHandling');
const obj = require('../src/utils/fileUtilities');

describe('readFiles function', () => {
  it('should return an object having the file name and its contents', async () => {
    jest.spyOn(obj, 'promisifyReadFolder').mockResolvedValue(['beverages.txt', 'fruits.txt', 'vegetables.txt']);
    jest.spyOn(obj, 'promisifyReadFile').mockResolvedValueOnce([]).mockResolvedValueOnce(['mango', 'banana', 'orange', 'apple']).mockResolvedValueOnce(['beans', 'potato', 'spinach', 'brocolli', 'beetroot', 'carrot', 'capsicum']);
    const result = await readFiles('./seed');
    expect(result).toEqual({
      beverages: [],
      fruits: ['mango', 'banana', 'orange', 'apple'],
      vegetables: ['beans', 'potato', 'spinach', 'brocolli', 'beetroot', 'carrot', 'capsicum'],
    });
  });
  it('should return object having the filtered the file name and its contents if the second parameter is specified', async () => {
    jest.spyOn(obj, 'promisifyReadFolder').mockResolvedValue(['beverages.txt', 'fruits.txt', 'vegetables.txt']);
    jest.spyOn(obj, 'promisifyReadFile').mockResolvedValueOnce([]).mockResolvedValueOnce([]).mockResolvedValueOnce(['carrot', 'capsicum']);
    const result = await readFiles('./seed', 'c');
    expect(result).toEqual({ beverages: [], fruits: [], vegetables: ['carrot', 'capsicum'] });
  });
  it('should return an error if the folder does not exist', async () => {
    jest.spyOn(obj, 'promisifyReadFolder').mockRejectedValue(Error('Folder does not exist'));
    try {
      await readFiles('fruits.txt');
    } catch (error) { expect(error.message).toBe('Folder does not exist'); }
  });
  it('should thrown an error if the folder path is not a string', async () => {
    try {
      await readFiles(123);
    } catch (err) { expect(err.message).toBe('Invalid input type for first argument'); }
  });
  it('should thrown an error if the first character is not a string', async () => {
    try {
      await readFiles('./seed', 123);
    } catch (err) { expect(err.message).toBe('Invalid input type for second argument'); }
  });
});

describe('addFileContent function', () => {
  xit('should append the given content into the specified file and return the content of all the file', async () => {
    jest.spyOn(fs, 'appendFile').mockImplementation((filepath, content, errorCallback) => {
      errorCallback(null);
    });
    jest.spyOn(fs, 'readFile').mockImplementation((filePath, callback) => {
      callback(null, 'tea\nhot chocolate');
    });
    const result = await addFileContent('./seed', 'beverages.txt', 'tea\r\nhot chocolate');
    expect(result).toStrictEqual(['tea', 'hot chocolate']);
  });
  it('should return an error if the file does not exist', async () => {
    jest.spyOn(fs, 'appendFile').mockImplementation((filepath, content, errorCallback) => {
      errorCallback(new Error('File does not exist'));
    });
    try {
      await addFileContent('bac', 'beverages.txt', 'tea\r\nhot chocolate');
    } catch (err) { expect(err.message).toBe('File does not exist'); }
  });
  it('should return an error if the file path is not a string', async () => {
    try {
      await addFileContent(123, 345, 'tea');
    } catch (err) { expect(err.message).toBe('Invalid path'); }
  });
  it('should return an error if the file content is not passed', async () => {
    try {
      await addFileContent('./seed', 'beverages.txt');
    } catch (err) { expect(err.message).toBe('Second argument expected'); }
  });
  it('should return an error if the file content is not a string', async () => {
    try {
      await addFileContent('./seed', 'beverages.txt', 123);
    } catch (err) { expect(err.message).toBe('Invalid input'); }
  });
});
