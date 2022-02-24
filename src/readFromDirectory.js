const { error } = require('console');
const fs=require('fs');
const { resolve } = require('path');
const path =require('path');
const utils=require('./utils')

const readAllFiles = async (directoryPath,character)=>{
    const rawfileNames=await utils.promisifyReadDir(directoryPath);//return files
    //console.log(rawfileNames);
    const fileNames=rawfileNames.map((file)=>path.parse(file).name);//return file names without extensions
    //console.log(fileNames);
    const allFilePromises=rawfileNames.map((fileName)=>utils.promisifyReadFile(`${directoryPath}/${fileName}`,character));
    //return promises
    //console.log(allFilePromises);
    const allFilesData=await Promise.all(allFilePromises);//resolve promises
    //console.log(allFilesData);
    const result=allFilesData.reduce((acc,fileContent,index)=>{//converts to object
        return {
            ...acc,
            [fileNames[index]]:fileContent
        }
    }, {})
    return result;
    //console.log(result)
}
function appendFiles(file,...argument){
    return new Promise((fulfill,reject)=>{
        let s=argument.join('\r\n');
        s='\r\n'+s;
        fs.appendFile(file,s, (err) => {
            if (!err){
                resolve("file appended")
            }
            else{
                reject(err);
            }
        });
    })
}
const remove=(file)=>{
    return new Promise((fulfill,reject)=>{
        fs.readFile(file, (error, vegetables) => {
            if (error){
                return reject('File cannot be opened');
            }
            fulfill(reterivedData=vegetables.toString().split('\r\n').filter((currentElement)=>currentElement!=='').filter((element)=>element[0]!=='c'));
        });
    })
}
const removeC= async (file)=>{
    rem=await remove(file);
    console.log(rem)
}
const callFunctions=async(file)=>{
    console.log(await readAllFiles('./seed'))
    //console.log(await utils.promisifyReadDir(file))
    //readFile('./seed')
    //readAllFiles('./seed')
    //await appendFiles('./seed/beverages.txt','tea','hot chocolate','coffee')
    //appendFiles('./fruits.txt','strawberry','peach')
    //appendFiles('./vegetables.txt','pumpkin')
    //removeC('./seed/vegetables.txt');
}

//callFunctions()
module.exports={
    appendFiles,
    readAllFiles
}