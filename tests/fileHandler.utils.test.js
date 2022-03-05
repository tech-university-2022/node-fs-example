const fs = require('fs');
const {promisifyReadFile, promisifyWriteFile, promisifyAppendFile} = require('../src/fileHandler.utils');

describe('promisifyReadFile', function() {
  test('should return the fruits string if a proper input path for fruits file is given', () => {
    jest.spyOn(fs,'readFile').mockImplementation((path,encoding,callback) => {
      callback(null,'mango\nbanana\norange\napple');
    });
    return promisifyReadFile('./resources/fruits1.txt').then(data => {
      expect(data).toBe('mango\nbanana\norange\napple');
    });
  });
  test('should return the vegetable string if a proper input path for vegetables file is given', () => {
    jest.spyOn(fs,'readFile').mockImplementation((path,encoding,callback) => {
      callback(null,'carrot\nbeans\npotato\nspinach\nbrocolli\n\ncapsicum\nbeetroot');
    });
    return promisifyReadFile('./resources/vegetables1.txt').then(data => {
      expect(data).toBe('carrot\nbeans\npotato\nspinach\nbrocolli\n\ncapsicum\nbeetroot');
    });
  });
  test('should return the beverages string if a proper input path for beverages file is given', () => {
    jest.spyOn(fs,'readFile').mockImplementation((path,encoding,callback) => {
      callback(null,'');
    });
    return promisifyReadFile('./resources/beverages1.txt').then(data => {
      expect(data).toBe('');
    });
  });
  test('should return error when file path not exists', () => {
    jest.spyOn(fs,'readFile').mockImplementation((path,encoding,callback) => {
      callback(new Error('No such file or directory'));
      return promisifyReadFile('./resources/abc.txt').catch(data => {
        expect(data).toBe('No such file or directory');
      });
    });
  });
});

describe('promisifyWriteFile', function() {
  test('should return successfully written if a proper input path and data is given', () => {
    jest.spyOn(fs,'writeFile').mockImplementation((path,encoding,callback) => {
      callback(null,'Successfully written into the file');
    });
    return promisifyWriteFile('./resources/fruits1.txt','pineapple').then(data => {
      expect(data).toBe('Successfully written into the file');
    });
  });
  test('should return error when file path not exists', () => {
    jest.spyOn(fs,'writeFile').mockImplementation((path,encoding,callback) => {
      callback(new Error('No such file or directory'));
      return promisifyWriteFile('./resources/abc.txt').catch(data => {
        expect(data).toBe('No such file or directory');
      });
    });
  });
});

describe('promisifyAppendFile', function() {
  test('should return successfully appended if a proper input path and data is given', () => {
    jest.spyOn(fs,'appendFile').mockImplementation((path,encoding,callback) => {
      callback(null,'Successfully appended into the file');
    });
    return promisifyAppendFile('./resources/fruits1.txt','pineapple').then(data => {
      expect(data).toBe('Successfully appended into the file');
    });
  });
  test('should return error when file path not exists', () => {
    jest.spyOn(fs,'appendFile').mockImplementation((path,encoding,callback) => {
      callback(new Error('No such file or directory'));
      return promisifyAppendFile('./resources/abc.txt').catch(data => {
        expect(data).toBe('No such file or directory');
      });
    });
  });
});
