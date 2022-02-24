const handler=require('../src/fileHandler2.js');
const utils=require('../utils/fileManipulator.js');
const readMultipleFiles=require('../utils/readMultipleFiles');
const fs=require('fs');

describe('getFileNames function',()=>{
    it('should give an array of filename when correct directory path is passed',async ()=>{
        jest.spyOn(fs,'readdir').mockImplementation((directoryPath,encoding,callback)=>{
            callback(null,['beverages.txt','fruits.txt','vegetables.txt'])});
        const output=await utils.getFileNames('C:\\Users\\Twissa Modi\\node-fs-example\\seed');
        expect(output).toStrictEqual(['beverages.txt','fruits.txt','vegetables.txt']);
    });
    it('should give an error when wrong directory path is passed',async ()=>{
        jest.spyOn(fs,'readdir').mockImplementation((directoryPath,encoding,callback)=>{
            callback(new Error('Directory not found.'),null)});
        try{
            await utils.getFileNames('something');
        }catch(err){
            expect(err.message).toBe('Directory not found.');
        }
    });
});
describe('getDataFromFile function',()=>{
    it('should give an array of content present in fruits.txt as output when this file is passed',async ()=>{
        jest.spyOn(fs,'readFile').mockImplementation((filePath,encoding,callback)=>{
            callback(null,'mango\r\nbanana\r\norange\r\napple');
        });
        const output=await utils.getDataFromFile('C:\Users\Twissa Modi\node-fs-example\seed\fruits.txt');
        return expect(output).toStrictEqual([ 'mango', 'banana', 'orange', 'apple' ]);
    });
    it('should give an error as output when wrong file is passed',async ()=>{
        jest.spyOn(fs,'readFile').mockImplementation((filePath,encoding,callback)=>{
            callback(new Error('File cannot be opened.'),null);
        });
        try{
            await utils.getDataFromFile('something');
        }catch(err){
            expect(err.message).toBe('File cannot be opened.');
        }
    });
    it('should give an error as output when wrong file is passed',async ()=>{
        jest.spyOn(fs,'readFile').mockImplementation((filePath,encoding,callback)=>{
            callback(new Error('File cannot be opened.'),null);
        });
        try{
            await utils.getDataFromFile(123);
        }catch(err){
            expect(err.message).toBe('File cannot be opened.');
        }
    });
});
describe('writeToFile function',()=>{
    it('should successfully write data when file path is passed',async ()=>{
        const spy=jest.spyOn(fs,'writeFile').mockImplementation((filePath,content,callback)=>{
            callback(null);
        });
        const output=await utils.writeToFile('C:\\Users\\Twissa Modi\\node-fs-example\\seed\\beverages.txt',"tea\r\nhot chocolate\r\ncoffee");
        expect(output).toBe('data written successfully in C:\\Users\\Twissa Modi\\node-fs-example\\seed\\beverages.txt.')
        expect(spy).toHaveBeenCalledTimes(1);
    });
    it('should give an error when any path except string is passed',async ()=>{
        jest.spyOn(fs,'writeFile').mockImplementation((filePath,content,callback)=>{
            callback(new Error('Data could not be written'));
        });
        try{
            await utils.writeToFile(123,'abc');
        }catch(err){
            expect(err.message).toBe('Data could not be written');
        }
    });
});
describe('appendToFile function',()=>{
    it('should successfully write data when file path is passed',async ()=>{
        const spy=jest.spyOn(fs,'appendFile').mockImplementation((filePath,content,callback)=>{
            callback(null);
        });
        const output=await utils.appendToFile('C:\\Users\\Twissa Modi\\node-fs-example\\seed\\beverages.txt',"tea\r\nhot chocolate\r\ncoffee");
        expect(output).toBe('data appended successfully in C:\\Users\\Twissa Modi\\node-fs-example\\seed\\beverages.txt.')
        expect(spy).toHaveBeenCalledTimes(1);
    });
    it('should give an error when any path except string is passed',async ()=>{
        jest.spyOn(fs,'writeFile').mockImplementation((filePath,content,callback)=>{
            callback(new Error('Data could not be written'));
        });
        try{
            await utils.appendToFile(123);
        }catch(err){
            expect(err.message).toBe('Data could not be written');
        }
    });
});
describe('readAllFiles',()=>{
    it('should give an object containing data from all files',async ()=>{
        jest.spyOn(utils,'getFileNames').mockResolvedValue(['beverages.txt','fruits.txt','vegetables.txt']);
        jest.spyOn(utils,'getDataFromFile').mockResolvedValueOnce([]).mockResolvedValueOnce(['mango', 'banana', 'orange', 'apple']).mockResolvedValueOnce(['carrot','beans','potato','spinach','brocolli','capsicum','beetroot']);
        const output=await readMultipleFiles.readAllFiles('C:\\Users\\Twissa Modi\\node-fs-example\\seed');
        expect(output).toStrictEqual({
            beverages: [],
            fruits: [ 'mango', 'banana', 'orange', 'apple' ],
            vegetables: [
              'carrot',
              'beans',
              'potato',
              'spinach',
              'brocolli',
              'capsicum',
              'beetroot'
            ]
          });
    });
    it('should give an error when wrong directory passed',async ()=>{
        jest.spyOn(utils,'getFileNames').mockRejectedValue(new Error('Directory not found.'));
        try{
            await readMultipleFiles.readAllFiles('nosuchdirectoryexists');
        }catch(err){
            expect(err.message).toBe('Directory not found.');
        };
    });
});
describe('filterData function',()=>{
    it('should give filteredData when data and starting letter is provided',()=>{
        const output=handler.filterData({
            beverages: [],
            fruits: [ 'mango', 'banana', 'orange', 'apple' ],
            vegetables: [
              'carrot',
              'beans',
              'potato',
              'spinach',
              'brocolli',
              'capsicum',
              'beetroot'
            ]
          },'c');
          expect(output).toStrictEqual({"beverages":[],"fruits":[],"vegetables":['carrot','capsicum']})
    });
    it('should give an error if in place of object a array is passed',()=>{
        expect(()=>{
            handler.filterData([12,3],'c');
        }).toThrow('You must enter an object.');
    });
    it('should give an error if in place of object a string is passed',()=>{
        expect(()=>{
            handler.filterData('abc','c');
        }).toThrow('You must enter an object.');
    });
});
describe('removeData function',()=>{
    it('should remove data starting with given argument from specified file',async ()=>{
        jest.spyOn(utils,'getDataFromFile').mockResolvedValue(['carrot',
        'beans',
        'potato',
        'spinach',
        'brocolli',
        'capsicum',
        'beetroot']);
        jest.spyOn(utils,'writeToFile').mockResolvedValue('data written successfully in C:\\Users\\Twissa Modi\\node-fs-example\\seed\\vegetables.txt');
        jest.spyOn(readMultipleFiles,'readAllFiles').mockResolvedValue({
            beverages: [],
            fruits: [ 'mango', 'banana', 'orange', 'apple' ],
            vegetables: [ 'beans', 'potato', 'spinach', 'brocolli', 'beetroot' ]
          });
        const output=await handler.removeData('C:\\Users\\Twissa Modi\\node-fs-example\\seed\\vegetables.txt','c');
        expect(output).toStrictEqual({"beverages": [], "fruits":["mango", "banana", "orange", "apple"], "vegetables": ["beans", "potato", "spinach", "brocolli", "beetroot"]});
    });
    it('should give an error if specified file does not exits',async ()=>{
        jest.spyOn(utils,'getDataFromFile').mockRejectedValue(new Error('File cannot be opened.'))
        try{
            await handler.removeData('C:\\Users\\Twissa Modi\\node-fs-example\\seed\\doesnotexist.txt','c');
        }catch(err){
            expect(err.message).toBe('File cannot be opened.');
        }
        
    });
});