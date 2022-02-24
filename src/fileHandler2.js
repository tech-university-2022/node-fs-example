
const path=require('path');
const utils=require('../utils/fileManipulator.js');
const readMultipleFiles=require('../utils/readMultipleFiles');
const filterData=(dataInFiles,filterWithStartingLetter)=>{
    if(dataInFiles.constructor !==Object){
        throw new Error('You must enter an object.');
    }
    for(const key in dataInFiles){
        dataInFiles[key]=dataInFiles[key].filter((currentData)=>currentData.startsWith(filterWithStartingLetter));
    }
    return dataInFiles;
}

const removeData= async(filePath,startingLetter)=>{
    return new Promise(async(fulfill,reject)=>{
        let data;
        try{
            data=await utils.getDataFromFile(filePath);
        }catch(err){
            return reject(err);
        };
            data=data.filter((element)=>element[0]!==startingLetter);
            data=data.toString().replaceAll(',','\r\n');
            await utils.writeToFile(filePath,data);
            try{
                const directoryPath=filePath.substring(0,filePath.lastIndexOf("\\")+1);
                return fulfill(await readMultipleFiles.readAllFiles(directoryPath));
            }catch(err){
                reject(err);
            };
    });
}

module.exports={
    filterData,
    removeData,
};

