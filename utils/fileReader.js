const fs=require('fs');
const getDataFromFile=(filePath)=>{
    return new Promise((resolve,reject)=>{
        fs.readFile(filePath,'utf-8',(err,fileContent)=>{
            if(err){
                reject('File cannot be opened.');
            }
            resolve(fileContent.toString().split('\r\n').filter((currentElement)=>currentElement!==''));
        });
    });
};
module.exports={
    getDataFromFile
};