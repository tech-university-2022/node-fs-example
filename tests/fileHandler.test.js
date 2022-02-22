const { readAndFilterFiles } = require('../src/fileHandler');

describe('ReadAndFilterfile function', () => {
  it('should return an object with file name as key and array of content', async () => {
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
});
