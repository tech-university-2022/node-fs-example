const { getFileContent, getSeeds, appendSeeds, removeSeeds} = require('../src/fileHandlerSeeds.js');
const fileOperations = require('../src/fileHandler.utils');

describe('getFileContent', function() {
  test('should call promisifyReadFile once', async () => {
    const mock = jest.spyOn(fileOperations,'promisifyReadFile');
    await getFileContent('./resources/vegetables3.txt','C');
    expect(mock).toHaveBeenCalledTimes(1);
  });
});

describe('getSeeds', function() {
  test('should return the seed object if a proper input is given', async () => {
    const mock = jest.spyOn(fileOperations,'promisifyReadDir');
    const expectedResultSeeds = {
      'beverages1':  [],
      'beverages2':  [
        'tea',
        'hot chocolate',
        'coffee',
      ],
      'fruits1':  [
        'mango',
        'banana',
        'orange',
        'apple',
      ],
      'fruits2':  [
        'mango',
        'banana',
        'orange',
        'apple',
        'strawberry',
        'peach',
      ],
      'vegetables1':  [
        'carrot',
        'beans',
        'potato',
        'spinach',
        'brocolli',
        'capsicum',
        'beetroot',
      ],
      'vegetables2':  [
        'carrot',
        'beans',
        'potato',
        'spinach',
        'brocolli',
        'capsicum',
        'beetroot',
      ],
      'vegetables3':  [
        'potato',
        'spinach',
        'pumpkin',
      ],
    };
    await expect(getSeeds()).resolves.toStrictEqual(expectedResultSeeds);
    expect(mock).toHaveBeenCalled();
  });
  test('should return the seed object with particular start letters if a proper input is given', async () => {
    const mock = jest.spyOn(fileOperations,'promisifyReadDir');
    const expectedResultSeeds =  {
      'beverages1':  [],
      'beverages2':  [
        'coffee',
      ],
      'fruits1':  [],
      'fruits2':  [],
      'vegetables1':  [
        'carrot',
        'capsicum',
      ],
      'vegetables2':  [
        'carrot',
        'capsicum',
      ],
      'vegetables3':  [],
    };
    await expect(getSeeds('c')).resolves.toStrictEqual(expectedResultSeeds);
    expect(mock).toHaveBeenCalled();
  });
});


describe('appendSeeds', function() {
  test('should call promisifyAppendFile ', async () => {
    const mock = jest.spyOn(fileOperations,'promisifyAppendFile').mockResolvedValue('Successfully appended into the file');
    const res = await appendSeeds('./resources/vegetables3.txt','C');
    expect(mock).toHaveBeenCalled();
    expect(res).toBe('Successfully appended');
  });
});


describe('removeSeeds', function() {
  test('should call promisifyReadFile and promisifyWriteFile ', async () => {
    const mock1 = jest.spyOn(fileOperations,'promisifyReadFile');
    const mock2 = jest.spyOn(fileOperations,'promisifyWriteFile').mockResolvedValue('Successfully written into the file');
    const res = await removeSeeds('./resources/vegetables3.txt','C');
    expect(mock1).toHaveBeenCalled();
    expect(mock2).toHaveBeenCalled();
    expect(res).toBe('Successfully removed');
  });
});
