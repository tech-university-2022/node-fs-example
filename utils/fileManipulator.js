const fs=require('fs');

const getFileNames=(directoryPath)=>{
    return new Promise((resolve,reject)=>{
        fs.readdir(directoryPath,'utf-8',(err,file)=>{
            if(err){
                return reject(new Error('Directory not found.'));
            }
            resolve(file);
    });
});
}

const getDataFromFile=(filePath)=>{
    return new Promise((resolve,reject)=>{
        fs.readFile(filePath,'utf-8',(err,fileContent)=>{
            if(err){
                return reject(new Error('File cannot be opened.'));
            }
            resolve(fileContent.toString().split('\r\n').filter((currentElement)=>currentElement!==''));
        });
    });
};
const writeToFile=(filePath,content)=>{
    return new Promise((fulfill,reject)=>{
        fs.writeFile(filePath,content,(err)=>{
            if(err){
               return reject(new Error('Data could not be written'));
            }
            fulfill(`data written successfully in ${filePath}.`);
        })
    })
}
const appendToFile=(filePath,content)=>{
    return new Promise((fulfill,reject)=>{
        fs.appendFile(filePath,content,(err)=>{
            if(err){
                return reject('Data could not be written');
            }
            fulfill(`data appended successfully in ${filePath}.`);
        })
    })
}
module.exports={
    getFileNames,
    getDataFromFile,
    appendToFile,
    writeToFile
};

