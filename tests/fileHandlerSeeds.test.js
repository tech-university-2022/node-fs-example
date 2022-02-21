const {readFile, getFileContent, getSeeds, } = require('../fileHandlerSeeds.js');
const fs = require('fs');

describe('getSeeds', function() {
  test('should return the seed object if a proper input is given', async () => {
    const expectedResultSeeds = {
      fruits1: [ 'mango', 'banana', 'orange', 'apple' ],
      vegetables1: [
        'carrot',
        'beans',
        'potato',
        'spinach',
        'brocolli',
        'capsicum',
        'beetroot'
      ],
      beverages1: []
    };
    await expect(getSeeds()).resolves.toStrictEqual(expectedResultSeeds);
  });
  test('should return the seed object with particular start letters if a proper input is given', async () => {
    const expectedResultSeeds = {
      fruits1: [],
      vegetables1: ['carrot','capsicum'],
      beverages1 : []
    };
    await expect(getSeeds('c')).resolves.toStrictEqual(expectedResultSeeds);
  });
});

describe('readFile', function() {
  test('should return the fruits string if a proper input path for fruits file is given', () => {
    jest.spyOn(fs,'readFile').mockImplementation((path,encoding,callback) => {
      callback(null,'mango\nbanana\norange\napple');
    });
    return readFile('./seed/fruits1.txt').then(data => {
      expect(data).toBe('mango\nbanana\norange\napple');
    });
  });
  test('should return the vegetable string if a proper input path for vegetables file is given', () => {
    jest.spyOn(fs,'readFile').mockImplementation((path,encoding,callback) => {
      callback(null,'carrot\nbeans\npotato\nspinach\nbrocolli\n\ncapsicum\nbeetroot');
    });
    return readFile('./seed/vegetables1.txt').then(data => {
      expect(data).toBe('carrot\nbeans\npotato\nspinach\nbrocolli\n\ncapsicum\nbeetroot');
    });
  });
  test('should return the beverages string if a proper input path for beverages file is given', () => {
    jest.spyOn(fs,'readFile').mockImplementation((path,encoding,callback) => {
      callback(null,'');
    });
    return readFile('./seed/beverages1.txt').then(data => {
      expect(data).toBe('');
    });
  });
  test('should return error when file path not exists', () => {
    jest.spyOn(fs,'readFile').mockImplementation((path,encoding,callback) => {
      callback(new Error('ENOENT: no such file or directory, open \'C:\\Users\\Aishwarya S R\\fileOperations\\seed\\fruits.txt\''),'');
    });
    return readFile('./seed/fruits.txt').catch(data => {
      expect(data).toBe('ENOENT: no such file or directory, open \'C:\\Users\\Aishwarya S R\\fileOperations\\seed\\fruits.txt\'');
    });
  });
});

