const handler = require('../src/fileHandler');
const utils = require('../src/utils/index');

describe('readAllfilesIntoObject function' , () => {
    it('should return invalid datatype if direectory path is not a string' ,async () => {
        const msg = await handler.readAllfilesIntoObject(12,"a");
       return expect(msg).toEqual("invalid datatype");
    });
    it('should return invalid datatype if filter character is not string', async ()=>{
        const msg = await handler.readAllfilesIntoObject("av",12);
        expect(msg).toEqual("invalid datatype");
    })
    it('should return invalid size is filtercharacter is not 1', async () => {
        const msg = await handler.readAllfilesIntoObject("av","abc");
        expect(msg).toEqual("invalid size of filterCharacter");
    });
    it('should return content of all files in an object if filtercharacter is not provided', async () => {
        jest.spyOn(utils,"promisfyReadDirectory").mockResolvedValue(['beverages.txt','fruits.txt','vegetables.txt']);
        jest.spyOn(utils,"promisfyReadFiles").mockResolvedValueOnce([]).mockResolvedValueOnce(['mango','apple']).mockResolvedValueOnce(['beans']);
        const recievedValue = await handler.readAllfilesIntoObject('ab',);
        expect(recievedValue).toEqual({ beverages : [], fruits: ['mango','apple'], vegetables: ['beans']});
    });
    it('should return filtered content of all files in an object if filtercharacter is provided', async () => {
        jest.spyOn(utils,"promisfyReadDirectory").mockResolvedValue(['beverages.txt','fruits.txt','vegetables.txt']);
        jest.spyOn(utils,"promisfyReadFiles").mockResolvedValueOnce([]).mockResolvedValueOnce(['mango','apple']).mockResolvedValueOnce([]);
        const recievedValue = await handler.readAllfilesIntoObject('ab','b');
        expect(recievedValue).toEqual({ beverages : [], fruits: ['mango','apple'], vegetables: []});
    });
});

describe('appendData function',() => {
    it('should return invalid datatype if directory path is not a string' ,async () => {
        const msg = await handler.appendData(12,"a",[]);
       return expect(msg).toEqual("invalid datatype");
    });
    it('should return invalid datatype if filename is not a string' ,async () => {
        const msg = await handler.appendData("ab",1,[]);
       return expect(msg).toEqual("invalid datatype");
    });
    it('should return invalid datatype if data is not an array' ,async () => {
        const msg = await handler.appendData("ab","a",1);
       return expect(msg).toEqual("invalid datatype");
    });
});

describe('removeData function', ()=> {
    it('should return invalid datatype if directory path is not a string' ,async () => {
        const msg = await handler.removeData(12,"a",'a');
       return expect(msg).toEqual("invalid datatype");
    });
    it('should return invalid datatype if filename is not a string' ,async () => {
        const msg = await handler.removeData("ab",1,'a');
       return expect(msg).toEqual("invalid datatype");
    });
    it('should return invalid datatype if filtercharacter is not a string' ,async () => {
        const msg = await handler.removeData("ab",1,1);
       return expect(msg).toEqual("invalid datatype");
    });
    it('should return invalid size is filtercharacter is not 1', async () => {
        const msg = await handler.removeData("av","abc",'aq');
        expect(msg).toEqual("invalid size of filterCharacter");
    });
})