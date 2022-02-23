const fs = require('fs');
const { promisfyReadDirectory, promisfyReadFiles , promisfyAppendData, promisfyRemoveData , promisfyReadFilesAndFilter} = require('../src/utils/index');
describe('promisfyReadDirectory function', () => {
    it('should read directory and return the array of file names', async () => {
        jest.spyOn(fs,'readdir').mockImplementation((directoryPath, encodingParam , callback)=>{
            callback(null,['beverages.txt', 'fruits.txt' , 'vegetables.txt']);
        })
        const fileNames = promisfyReadDirectory('./seed');
        return expect(fileNames).resolves.toStrictEqual(['beverages.txt', 'fruits.txt' , 'vegetables.txt']);
    });
    it('should return error if path of directory is invalid', async () => {
        jest.spyOn(fs,'readdir').mockImplementation((directoryPath, encodingParam , callback)=>{
            callback("ERROR! not a valid path",null);
        })
        const fileNames = promisfyReadDirectory('we');
        return expect(fileNames).rejects.toBe("ERROR! not a valid path");
    });
    it('should return invalid data type if directory path is not string', async () => {
        const fileNames = promisfyReadDirectory(1);
        return expect(fileNames).toBe("invalid data type");
    });
});

describe('promisfyReadFiles function' ,() => {
    it('should return invalid data type if file path is not string', async () => {
        const fileNames = promisfyReadFiles(1,"a");
        return expect(fileNames).toBe("invalid data type");
    });
    it('should return invalid data type if file path is not string', async () => {
        const fileNames = promisfyReadFiles("a",1);
        return expect(fileNames).toBe("invalid data type");
    });
    it('should return error if path of file is invalid', async () => {
        jest.spyOn(fs,'readFile').mockImplementation((filePath, encodingParam , callback)=>{
            callback("ERROR! not a valid path",null);
        })
        const fileNames = promisfyReadFiles('we','a');
        return expect(fileNames).rejects.toBe("ERROR! not a valid path");
    });
    it('should return all content in an array if  no filter character is provided', async () => {
        jest.spyOn(fs,'readFile').mockImplementation((filePath, encodingParam , callback)=>{
            callback(null,'coffee\r\nhot chocolate\r\ntea');
        })
        const fileNames = promisfyReadFiles('./seed/beverages.txt');
        return expect(fileNames).resolves.toStrictEqual(['coffee','hot chocolate', 'tea']);
    });
    it('should return all filtered conetent in an array if filter character is provided', async () => {
        jest.spyOn(fs,'readFile').mockImplementation((filePath, encodingParam , callback)=>{
            callback(null,'coffee\r\nhot chocolate\r\ntea');
        })
        const fileNames = promisfyReadFiles('./seed/beverages.txt','c');
        return expect(fileNames).resolves.toStrictEqual(['coffee']);
    });
});

describe('promisfyAppendData function', () =>{
    it('should return invalid data type if file path is not string', async () => {
        const fileNames = promisfyAppendData(1,"a");
        return expect(fileNames).toBe("invalid data type");
    });
    it('should return invalid data type if data is not an array', async () => {
        const fileNames = promisfyAppendData("a",1);
        return expect(fileNames).toBe("invalid data type");
    });
    it('should return error if filepath is invalid', () => {
        jest.spyOn(fs,"appendFile").mockImplementation((filepath,string, callback)=> {
            callback("ERROR!");
        })
        const fileNames = promisfyAppendData('we',['a']);
        return expect(fileNames).rejects.toBe("ERROR!");
    });
});

describe('promisfyRemoveData function' , () => {
    it('should return invalid data type if file path is not string', async () => {
        const fileNames = promisfyRemoveData(1,"a");
        return expect(fileNames).toBe("invalid data type");
    });
    it('should return invalid data type if data is not an array', async () => {
        const fileNames = promisfyRemoveData("a",1);
        return expect(fileNames).toBe("invalid data type");
    });
    it('should return error if filepath is invalid', () => {
        jest.spyOn(fs,"writeFile").mockImplementation((filepath,string, callback)=> {
            callback("ERROR!");
        })
        const fileNames = promisfyRemoveData('we',['a']);
        return expect(fileNames).rejects.toBe("ERROR!");
    });
});

describe("promisfyReadFilesAndFilter function" ,() => {

    it('should return invalid data type if file path is not string', async () => {
        const fileNames = promisfyReadFilesAndFilter(1,"a");
        return expect(fileNames).toBe("invalid data type");
    });
    it('should return invalid data type if file path is not string', async () => {
        const fileNames = promisfyReadFilesAndFilter("a",1);
        return expect(fileNames).toBe("invalid data type");
    });
    it('should return error if path of file is invalid', async () => {
        jest.spyOn(fs,'readFile').mockImplementation((filePath, encodingParam , callback)=>{
            callback("ERROR! not a valid path",null);
        })
        const fileNames = promisfyReadFilesAndFilter('we','a');
        return expect(fileNames).rejects.toBe("ERROR! not a valid path");
    });
    it('should return all content in an array if  no filter character is provided', async () => {
        jest.spyOn(fs,'readFile').mockImplementation((filePath, encodingParam , callback)=>{
            callback(null,'coffee\r\nhot chocolate\r\ntea');
        })
        const fileNames = promisfyReadFilesAndFilter('./seed/beverages.txt');
        return expect(fileNames).resolves.toStrictEqual(['coffee','hot chocolate', 'tea']);
    });
    it('should return all filtered conetent in an array if filter character is provided', async () => {
        jest.spyOn(fs,'readFile').mockImplementation((filePath, encodingParam , callback)=>{
            callback(null,'coffee\r\nhot chocolate\r\ntea');
        })
        const fileNames = promisfyReadFilesAndFilter('./seed/beverages.txt','c');
        return expect(fileNames).resolves.toStrictEqual(['hot chocolate','tea']);
    });

})