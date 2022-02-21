// File Handling
const fs = require('fs');
// const { isTypedArray } = require('util/types');
const { readAndFilterFile } = require('../fileHandler');

describe('ReadAndFilterFile function', () => {
  it('should read and display the data in fruits.txt in form of an array', async () => {
    jest.spyOn(fs, 'readFile').mockImplementation((filepath, callback) => {
      callback(null, ['mango', 'banana', 'orange', 'apple']);
    });
    const fruits = await readAndFilterFile('seed\\fruits.txt');
    expect(fruits).toEqual(['mango', 'banana', 'orange', 'apple']);
  });
  it('should return only content that begins with given character', async () => {
    jest.spyOn(fs, 'readFile').mockImplementation((filepath, callback) => {
      callback(null, []);
    });
    const beverages = await readAndFilterFile('seed\\beverages.txt', 'W');
    expect(beverages).toStrictEqual([]);
  });
  it('should return invalid message if file is not found', async () => {
    jest.spyOn(fs, 'readFile').mockImplementation((filepath, callback) => {
      callback(new Error('File cannot be found!'), null);
    });
    try {
      const data = await readAndFilterFile('file.txt');
    } catch (err) {
      expect(err.message).toBe('File cannot be found!');
    }
  });
  it('should return invalid message if input is not a file name', async () => {
    try {
      const data = await readAndFilterFile('k');
    } catch (err) {
      expect(err.message).toBe('Invalid, enter a proper filepath!');
    }
  });
  it('should return invalid message if input is not a string', async () => {
    try {
      const data = await readAndFilterFile(5);
    } catch (err) {
      expect(err.message).toBe('Invalid, enter a proper filepath!');
    }
  });
});
