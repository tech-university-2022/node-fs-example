const fs = require('fs');
const utils = require('./utils/index');
const readAllfilesIntoObject = async(directoryPath, filterCharacter) => {
    if(typeof directoryPath !== 'string' || (typeof filterCharacter !== 'string' && filterCharacter !== undefined ))
    {
        return "invalid datatype";
    }
    if(( filterCharacter !== undefined && filterCharacter.length !== 1 ))
    {
        return "invalid size of filterCharacter";
    }
    const rawFileNames = await utils.promisfyReadDirectory(directoryPath);
    const fileNames = rawFileNames.map((fileName) => fileName.split('.')[0]);
    const allFilePromises = rawFileNames.map((fileName)=> utils.promisfyReadFiles(`${directoryPath}/${fileName}`,filterCharacter));
    const data = await Promise.all(allFilePromises);
    const result = data.reduce((prevValue, fileData, index)=> {
        return {
            ...prevValue,
            [[fileNames[index]]]: fileData
        }
    },{})
    return result;
}

const appendData = async (directoryPath , fileName , data) => {
    if(typeof directoryPath !== 'string' ||typeof fileName !== 'string' ||! (data instanceof Array)  ) {
        return "invalid datatype";
    }
    await utils.promisfyAppendData(`${directoryPath}/${fileName}`,data);
    const result =await readAllfilesIntoObject('./seed', );
    return result;
}

const removeData = async(dirPath, fileName , filterCharacter) => {

    if((typeof  dirPath !== 'string')||(typeof fileName !== 'string') ||( typeof filterCharacter !== 'string') ) {
        return "invalid datatype";
    }
    if( filterCharacter.length !== 1 )
    {
        return "invalid size of filterCharacter";
    }
    const filePath = `${dirPath}/${fileName}`;
    const rawData = await utils.promisfyReadFilesAndFilter(filePath,filterCharacter);
    await promisfyRemoveData(filePath,rawData);
    const result =await readAllfilesIntoObject('./seed', );
    return result;
 }
 
 module.exports ={readAllfilesIntoObject,appendData,removeData};
//readAllfilesIntoObject('./seed','c').then(data => console.log(data));
//appendData('./seed', 'beverages.txt' ,['coffee','hot chocolate','tea']);
// console.log(removeData('./seed','vegetables.txt','cb'));