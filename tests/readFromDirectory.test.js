const file = require('../src/readFromDirectory');
const fs=require('fs');
const utils=require('../src/utils');
const { builtinModules } = require('module');
describe('promisifyReadFile function', function() {
    it('should display the data of file', async () => {
        jest.spyOn(fs,'readFile').mockImplementation((filepath,encoding,callback)=>{
            callback(null,'mango\r\nbanana\r\norange\r\napple')
        });
        const fruits =await  utils.promisifyReadFile('./seed/fruits.txt');
        expect(fruits).toEqual(['mango','banana','orange','apple']);
  });
    it('should give an error as output when wrong file is passed',async ()=>{
        try{
            const err=await  utils.promisifyReadFile('something');
        }
        catch(err){
            expect(err).toBe('file cannnot open');
        } 
    });
});
describe('promisifyReadDir function', function() {
    
    it('should display the files in directory', async () => {
        jest.spyOn(fs,'readdir').mockImplementation((filepath,encoding,callback)=>{
            callback(null,[ 'beverages.txt', 'fruits.txt', 'vegetables.txt' ])
        });
        const dir =await  utils.promisifyReadDir('./seed');
        expect(dir).toEqual([ 'beverages.txt', 'fruits.txt', 'vegetables.txt' ]);
  });
    it('should give an error as output when wrong file is passed',async ()=>{
        jest.spyOn(fs,'readdir').mockImplementation((filepath,encoding,callback)=>{
            callback('Directory cannot be opened')
        });
        try{
            const err=await  utils.promisifyReadDir('./something');
        }
        catch(err){
            expect(err).toBe('Directory cannot be opened');
        } 
    });
});
describe('appendFiles function', function() {
    
    it('should append file', async () => {
        jest.spyOn(fs,'appendFile').mockImplementation((filepath,encoding,callback)=>{
            callback(null);
        });
            const output =await  file.appendFiles('./seed/something');
            expect(output).toBe('file appended');
        
    });
    
    it.only('should give an error as output when wrong file is passed',async ()=>{
        jest.spyOn(fs,'appendFile').mockImplementation((filepath,encoding,callback)=>{
            callback('file cannot be appended')
        });
        try{
            const err=await  file.appendFiles('./something','hi');
        }
        catch(err){
            expect(err).toBe('file cannot be appended');
        } 
    });
});
describe('readAllFiles function', function() {
    
    it('should read all files in directory', async () => {
        jest.spyOn(utils,'promisifyReadDir').mockResolvedValue([ 'beverages.txt', 'fruits.txt', 'vegetables.txt' ]);
        jest.spyOn(utils,'promisifyReadFile').mockResolvedValueOnce([]).mockResolvedValueOnce([ 'mango', 'banana', 'orange', 'apple' ]).mockResolvedValueOnce([ 'beans', 'potato', 'spinach', 'brocolli', 'beetroot' ])
        const output =await  file.readAllFiles('C:\Users\Vriti Satija\node-fs-example\seed');
        expect(output).toStrictEqual({"beverages": [], "fruits": ["mango", "banana", "orange", "apple"], "vegetables": ["beans", "potato", "spinach", "brocolli", "beetroot"]});
  });
    it('should give an error when wrong directory passed',async ()=>{
        jest.spyOn(utils,'promisifyReadDir').mockRejectedValue(new Error ('directory not found'));
        try{
            const output =await file.readAllFiles('./something');
        }
        catch(err){
            expect(err.message).toEqual('directory not found');
        }
        
    });
});

//  node ./src/readFromDirectory.js
// ./node_modules/.bin/jest.cmd ./readFromDirectory.test.js