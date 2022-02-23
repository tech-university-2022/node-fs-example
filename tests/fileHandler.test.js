const { readAndFilterFiles } = require('../src/fileHandler');
const utils = require('../src/utils/fileUtilities');

describe('ReadAndFilterfile function', () => {
  jest.spyOn(utils, 'promisifyReadDir').mockResolvedValue(['beverages.txt', 'fruits.txt', 'vegetables.txt']);
  it('should return an object with file name as key and array of content', async () => {
    jest.spyOn(utils, 'promisifyReadFile').mockResolvedValueOnce(['']).mockResolvedValueOnce(['mango', 'banana', 'orange', 'apple']).mockResolvedValueOnce(['carrot',
      'beans',
      'potato',
      'spinach',
      'brocolli',
      'capsicum',
      'beetroot']);
    const readAndFilterSeed = await readAndFilterFiles('./seed');
    expect(readAndFilterSeed).toEqual({
      beverages: [''],
      fruits: ['mango', 'banana', 'orange', 'apple'],
      vegetables: [
        'carrot',
        'beans',
        'potato',
        'spinach',
        'brocolli',
        'capsicum',
        'beetroot',
      ],
    });
  });
  it('should return object with filtered content if Filter Character is given', async () => {
    jest.spyOn(utils, 'promisifyReadFile').mockResolvedValueOnce([]).mockResolvedValueOnce([]).mockResolvedValueOnce(['carrot', 'capsicum']);
    const readAndFilterSeedC = await readAndFilterFiles('./seed', 'C');
    expect(readAndFilterSeedC).toEqual({ beverages: [], fruits: [], vegetables: ['carrot', 'capsicum'] });
  });
  it('should return invalid message when filter Value is not a character', async () => {
    try {
      await readAndFilterFiles('./seed', [1, 2]);
    } catch (error) { expect(error.message).toBe('Invalid Filter Character!'); }
  });
  it('should return invalid message when directory path is not string', async () => {
    try {
      await readAndFilterFiles(5);
    } catch (error) { expect(error.message).toBe('Invalid Directory Path!'); }
  });
  it('should return invalid message when directory is invalid', async () => {
    jest.spyOn(utils, 'promisifyReadDir').mockRejectedValue(Error('Directory not found!'));
    try {
      await readAndFilterFiles('fruits');
    } catch (error) { expect(error.message).toBe('Directory not found!'); }
  });
});
