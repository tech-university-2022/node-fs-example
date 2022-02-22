const fs=require('fs');
const path=require('path');
const {getFileNames}=require('../utils/fileNamesRetriever.js');
const {getDataFromFile}=require('../utils/fileReader.js');

const readAllFiles=async (directoryPath,filterWithStartingLetter='')=>{
    return new Promise(async (resolve,reject)=>{
        const fileNamesWithExtension=await getFileNames(directoryPath);
        const fileNames=fileNamesWithExtension.map(file=>path.parse(file).name);
        const promises=fileNamesWithExtension.map((file)=>getDataFromFile(`${directoryPath}\\${file}`));
        console.log(fileNamesWithExtension);
        const fileData=await Promise.all(promises);
        const data=fileData.reduce((acc,currentFileContent,index)=>{
            return{
                ...acc,
                [fileNames[index]]:currentFileContent,
            }
        },{});
        if(filterWithStartingLetter!==''){
            //resolve(filterData(data,filterWithStartingLetter));
        }
        resolve(data);
    });
};
const writeToFile=(fileName,content)=>{
    return new Promise((fulfill,reject)=>{
        fs.writeFile(fileName,content,(err)=>{
            if(err){
                reject(new Error('Data could not be written'));
            }
            fulfill('data written successfully');
        })
    })
}
const appendToFile=(fileName,content)=>{
    return new Promise((fulfill,reject)=>{
        fs.appendFile(fileName,content,(err)=>{
            if(err){
                reject(new Error('Data could not be written'));
            }
            fulfill('data written successfully');
        })
    })
}

readAllFiles('C:\\Users\\Twissa Modi\\node-fs-example\\seed').then(value=>console.log(value),null);
module.exports=readAllFiles;

