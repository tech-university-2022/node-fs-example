const {readFileContent, fileNamesArray, printObject} = require('../fileReader.js');

describe('readFileContent to return data in the form of array', () => {
    it('should return data in the form of array', () =>{
        return readFileContent('seed/fruits.txt').then((fruits)=>{
            expect(fruits).toEqual([ 'mango', 'banana', 'orange', 'apple' ]);
        });
    });
    it('should return error if file doesnt exist', () =>{
        return readFileContent('seed/noFile.txt').then(null, (data)=>{
            expect(data).toBe('File cannot be read');
        });
    });
    it('should return empty array for empty file', () =>{
        return readFileContent('tests/empty.txt').then((data)=>{
            expect(data).toEqual(['']);
        });
    });
    it('should return error if no file passed', () =>{
        return readFileContent().then(null, (data)=>{
            expect(data).toBe('File cannot be read');
        });
    });
});

describe('fileNamesArray that returns names of files in dir as array', () => {
    it('should return files in dir as array', ()=>{
        return fileNamesArray('seed').then((files)=>{
            expect(files).toEqual([ 'beverages.txt', 'fruits.txt', 'vegetables.txt' ]);
        });
    });
    it('should return error if dir doesnt exist', () =>{
        return fileNamesArray('noDir').then(null, (data)=>{
            expect(data).toBe('cant read files in dir');
        });
    });
    it('should return empty array for empty dir', () =>{
        return fileNamesArray('tests/testDir').then((data)=>{
            expect(data).toEqual([]);
        });
    });
    it('should return error if no directory passed', () =>{
        return fileNamesArray().then(null, (data)=>{
            expect(data).toBe('cant read files in dir');
        });
    });
});

