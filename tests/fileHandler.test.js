const utils=require('../utils/fileReader.js');
const readAllFiles=require('../src/fileHandler2.js');
const utils2=require('../utils/fileNamesRetriever.js');
const fs=require('fs');
describe('readFile function',()=>{
    it('should give an array of content present in fruits.txt as output when this file is passed',async ()=>{
        jest.spyOn(fs,'readFile').mockImplementation((filePath,encoding,callback)=>{
            callback(null,'mango\r\nbanana\r\norange\r\napple');
        });
        const output=await readFile('C:\Users\Twissa Modi\node-fs-example\seed\fruits.txt');
        return expect(output).toStrictEqual([ 'mango', 'banana', 'orange', 'apple' ]);
    });
    it('should give an error as output when wrong file is passed',async ()=>{
        try{
            await readFile('something');
        }catch(err){
            expect(err.message).toBe('File cannot be opened.');
        }
    });
    it('should give an error as output when wrong file is passed',async ()=>{
        try{
            await readFile(123);
        }catch(err){
            expect(err.message).toBe('File cannot be opened.');
        }
    });

});
describe('',()=>{
    it.only('should give...',async ()=>{
        jest.spyOn(utils2,'getFileNames').mockResolvedValue(['beverages','fruits.txt','vegetables.txt'])
        await readAllFiles('C:\\Users\\Twissa Modi\\node-fs-example\\seed');
    })
})

