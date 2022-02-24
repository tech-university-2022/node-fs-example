const readfileobj = require('../src/index');
const utils = require('../src/utils/operator');

describe('readFileContent', () => {
  it('should return the file content in object form if filterCharacter is given', () => {
    const fileName = jest.spyOn(utils, 'promisefyReaddir').mockResolvedValue(['beverages.txt', 'fruits.txt', 'vegetables.txt']);
    const fileData = jest.spyOn(utils, 'promisefyFileRead').mockResolvedValueOnce(['']).mockResolvedValueOnce(['']).mockResolvedValueOnce(['carrot', 'capsicum',
    ]);

    const promise = readfileobj.readFileContent('./seed', 'c');
    return expect(promise).resolves.toStrictEqual({ beverages: [''], fruits: [''], vegetables: ['carrot', 'capsicum'] });
  });
});
