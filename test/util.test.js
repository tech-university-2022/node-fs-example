const fs = require('fs');
const utils = require('../utils/utils');

describe('promisefyFileRead', () => {
  it('should read data and display according to our conditions', async () => {
    const spy = jest.spyOn(fs, 'readFile').mockImplementation((filePath, encoding, callback) => {
      callback(null, 'orange\r\napple\r\nbanana');
    });// here we want not to call original read file method so we are
    // spying and givingits mock definition
    const data = await utils.promisefyFileRead('ajhhas');
    expect(data).toStrictEqual(['orange', 'apple', 'banana']);
  });
  it('should give error if file is not read', async () => {
    const spy = jest.spyOn(fs, 'readFile').mockImplementation((filepath, encoding, callback) => {
      callback(new Error('file not read'), null);
    });
    try {
      await utils.promisefyFileRead('ashas');
    } catch (error) {
      expect(error.message).toBe('file not read');
    }
  });
});
