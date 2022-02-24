const fs = require('fs');
const promisfyReadDirectory = (directoryPath) => {
    if(typeof directoryPath !== 'string') {
        return "invalid data type";
    }
    return new Promise((resolve , reject) => {
        fs.readdir(directoryPath, 'utf-8' , (error, data) => {
            if(error)
            {
                reject("ERROR! not a valid path");
            }
            resolve(data);
        })
    })
}

const promisfyReadFiles = (filePath ,filterCharacter) => {
   
    if(typeof filePath !== 'string' ||( typeof filterCharacter !== 'string' && filterCharacter !== undefined)  ) {
        return "invalid data type";
    }
    return new Promise((resolve ,reject) => {
        fs.readFile(filePath, 'utf-8', (error, data) => {
            if(error)
            {
                reject("ERROR! not a valid path");
            }
            if(filterCharacter !== undefined ){
                resolve(data.split('\r\n').filter((data)=> data.toLowerCase()[0] === filterCharacter.toLowerCase()));
            }
            else {
                resolve(data.split('\r\n'));
            }
           
        })
    })
}

const promisfyReadFilesAndFilter = (filePath ,filterCharacter) => {
   
    if(typeof filePath !== 'string' ||( typeof filterCharacter !== 'string' && filterCharacter !== undefined)  ) {
        return "invalid data type";
    }
    return new Promise((resolve ,reject) => {
        fs.readFile(filePath, 'utf-8', (error, data) => {
            if(error)
            {
                reject("ERROR! not a valid path");
            }
            if(filterCharacter !== undefined ){
                resolve(data.split('\r\n').filter((data)=> data.toLowerCase()[0] !== filterCharacter.toLowerCase()));
            }
            else {
                resolve(data.split('\r\n'));
            }
           
        })
    })
}
 //promisfyReadFiles("./seed/fruits.txt",'m').then(data => console.log(data));
const promisfyAppendData = (filePath , data) => {
    if(typeof filePath !== 'string' ||! (data instanceof Array)  ) {
        return "invalid data type";
    }
    return new Promise((resolve, reject) => {
        fs.appendFile(filePath , data.join('\r\n'),(err) =>{
            if(err)
            {
                reject("ERROR!");
            }
            resolve();
        })
    })
}
const promisfyRemoveData = (filePath, data)=>
{
    if(typeof filePath !== 'string' ||! (data instanceof Array)  ) {
        return "invalid data type";
    }
    return new Promise((resolve, reject)=> {
     fs.writeFile(filePath,data.join('\r\n') ,(err)=> {
         if(err)
         {
             reject("ERROR!");
         }
         resolve();
     })
    })
}

module.exports ={
    promisfyReadDirectory,
    promisfyReadFiles,
    promisfyAppendData,
    promisfyRemoveData,
    promisfyReadFilesAndFilter
}