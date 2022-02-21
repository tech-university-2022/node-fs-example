/* eslint-disable no-unused-vars */
// File Handling
const fs = require('fs');
// const { isTypedArray } = require('util/types');
const { readAndFilterFile, getFilesInDirectory, putFilesIntoObject } = require('../fileHandler');

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
describe('GetFilesInDirectory function', () => {
  it('should get file names of files in the directory in an array', async () => {
    jest.spyOn(fs, 'readdir').mockImplementation((filepath, callback) => {
      callback(null, ['beverages.txt', 'fruits.txt', 'vegetables.txt']);
    });
    const files = await getFilesInDirectory('seed\\fruits.txt');
    expect(files).toEqual(['beverages.txt', 'fruits.txt', 'vegetables.txt']);
  });
  it('should return invalid message if directory is not found', async () => {
    jest.spyOn(fs, 'readdir').mockImplementation((filepath, callback) => {
      callback(new Error('Invalid, Cannot Read Directory!'), null);
    });
    try {
      const data = await getFilesInDirectory('seeds');
    } catch (err) {
      expect(err.message).toBe('Invalid, Cannot Read Directory!');
    }
  });
  it('should return invalid message when directory name is not a string', async () => {
    try {
      const data = await getFilesInDirectory(5);
    } catch (err) {
      expect(err.message).toBe('Invalid, Cannot Find Directory!');
    }
    // expect(await getFilesInDirectory(5)).toThrow('Invalid, Cannot Find Directory!');
  });
});

describe('PutFilesIntoObject function', () => {
//   it('should return an object with file names as key with array of content as value',
// async () => {
//     jest.spyOn(fs, 'readdir').mockImplementation((filepath, callback) => {
//       callback(null, {
//         fruits: ['mango', 'banana', 'orange', 'apple'],
//         vegetables: [
//           'carrot',
//           'beans',
//           'potato',
//           'spinach',
//           'brocolli',
//           'capsicum',
//           'beetroot',
//         ],
//         beverages: [''],
//       });
//     });
//     expect(await putFilesIntoObject('seed')).toEqual({
//       fruits: ['mango', 'banana', 'orange', 'apple'],
//       vegetables: [
//         'carrot',
//         'beans',
//         'potato',
//         'spinach',
//         'brocolli',
//         'capsicum',
//         'beetroot',
//       ],
//       beverages: [''],
//     });
//   });
  it('should return invalid message when directory name is not string', async () => {
    try {
      const data = await putFilesIntoObject(5);
    } catch (err) {
      expect(err.message).toBe('Invalid, Cannot Find Directory!');
    }
  });
  it('should return invalid message if filterValue is not null and not a character', async () => {
    try {
      const data = await putFilesIntoObject('seeds', 5);
    } catch (err) {
      expect(err.message).toBe('Invalid, Enter proper filter character(s)!');
    }
  });
});
