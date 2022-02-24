const path=require('path');
const utils=require('../utils/fileManipulator.js');
const readAllFiles=async (directoryPath)=>{
    return new Promise(async (resolve,reject)=>{
        let fileNamesWithExtension;
        try{
            fileNamesWithExtension=await utils.getFileNames(directoryPath);
        }catch(err){
            return reject(err);
        }
        const fileNames=fileNamesWithExtension.map(file=>path.parse(file).name);
        const promises=fileNamesWithExtension.map((file)=>utils.getDataFromFile(`${directoryPath}\\${file}`));
        const fileData=await Promise.all(promises);
        const data=fileData.reduce((acc,currentFileContent,index)=>{
            return{
                ...acc,
                [fileNames[index]]:currentFileContent,
            }
        },{});
        
        resolve(data);
    });
};
module.exports={
    readAllFiles
}