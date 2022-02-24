const { readdir } = require("fs");
const { readAllFiles } = require("../src/fileHandler");
const { promisfyReadDir, promisfyReadFile, promisifyAppendFile,
    promisfyWriteFile, readAndFilterFiles } = require('../src/fileHandlerUtilities')

describe('Read and Filter directory files', () => {
    it('should read file names in the directory in promisfyReadDir', () => {
        jest.spyOn(utils, "readDirectory").mockResolvedValue(["beverages.txt", "fruits.txt", "vegetables.txt"]);
        const promise = promisfyReadDir("seed")
        const expectedData = ["beverages.txt", "fruits.txt", "vegetables.txt"];
        return expect(promise).resolves.toStrictEqual(expectedData);
    })
}) 