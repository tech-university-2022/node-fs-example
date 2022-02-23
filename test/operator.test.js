const fs = require('fs');
const utils = require('../src/utils/operator');

describe('promisefyFileRead', () => {
  it('should read data and display according to our conditions', async () => {
    jest.spyOn(fs, 'readFile').mockImplementation((filePath, encoding, callback) => {
      callback(null, 'orange\r\napple\r\nbanana');
    });// here we want not to call original read file method so we are
    // spying and givingits mock definition
    const data = await utils.promisefyFileRead('ajhhas');
    expect(data).toStrictEqual(['orange', 'apple', 'banana']);
  });
  it('should give error if file is not read', async () => {
    jest.spyOn(fs, 'readFile').mockImplementation((filepath, encoding, callback) => {
      callback(new Error('file not read'), null);
    });// whenever we take func from outside then we do mocking
    try {
      await utils.promisefyFileRead('ashas');
    } catch (error) {
      expect(error.message).toBe('file not read');
    }
  });
});
describe('promisefyWriteFile', () => {
  it('should display succesfully data added', async () => {
    jest.spyOn(fs, 'writeFile').mockImplementation((filePath, data, callback) => {
      callback(null);
    });

    return utils.promisefyWriteFile('filepath', 'data addded').then((data) => {
      expect(data).toBe('successfully data added');
    });
  });
  it('should display error msg if file format is not correct', async () => {
    jest.spyOn(fs, 'writeFile').mockImplementation((filePath, encoding, callback) => {
      callback(new Error('cannot open file'));
    });
    return utils.promisefyWriteFile('agshashas', 'data addded').catch((err) => {
      expect(err.message).toBe('cannot open file');
    });
  });
});
describe('promisefyAppendFile', () => {
  it('should display appended data succesfully msg after appending data', () => {
    jest.spyOn(fs, 'appendFile').mockImplementation((filepath, data, encoding, callback) => {
      callback(null);
    });
    return utils.promisefyAppendFile('filepath', 'data append').then((data) => {
      expect(data).toBe('appended data succesfully');
    });
  });
  it('should display cannot append data msg if error is caught', () => {
    jest.spyOn(fs, 'appendFile').mockImplementation((filepath, data, encoding, callback) => {
      callback(new Error('cannot append data'));
    });
    return utils.promisefyAppendFile('filepath', 'data append').catch((err) => {
      expect(err.message).toBe('cannot append data ');
    });
  });
});
describe('promisefyReaddir', () => {
  it('should display the array of files name', () => {
    jest.spyOn(fs, 'readdir').mockImplementation((directoryName, encoding, callback) => {
      callback(null, ['fruits.txt', 'beverages.txt', 'vegetables.txt']);
    });
    return utils.promisefyReaddir('./seed').then((data) => {
      expect(data).toStrictEqual(['fruits.txt', 'beverages.txt', 'vegetables.txt']);
    });
  });
  it('should give an error if readdir caught any error', () => utils.promisefyReaddir().catch((err) => {
    expect(err).toBe('file name are not accesible');
  }));
});
