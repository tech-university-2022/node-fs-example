const fileUtils = require("./utils/fileUtils")

const readFile = async (dirname,filename,firstChar) => {

    try{
        const data = await fileUtils.readFiles(dirname,filename);

        const arr = data.toString().split("\r\n").filter(instance=>instance.length>0)
        if(firstChar){
            return arr.filter(instance=>instance[0].toLowerCase()===firstChar.toLowerCase())
        }
        return arr;
    }catch(err){
        console.log(err)
    }
}

const readAllFilesInDir = async (dirname,firstChar) => {

    const fileNames = await fileUtils.readDirectory(dirname)

    const content = {}
 
    for(let i=0;i<fileNames.length;i++){
        const filename = fileNames[i].split(".")[0]

        // filter by a particular character
        // const output = await readFile(dirname,filename,"p")

        const output = await readFile(dirname,filename,firstChar)
        content[filename] = output

    }
    return content;
}

// Part 2
const appendToFile = async(dirname,filename,data) => {

    // await fileUtils.appendData(dirname,filename,"\r\n"+data.join("\r\n"))
    // const updatedData = await readFile(dirname,filename)

    let currentData = await readFile(dirname,filename)
    currentData.push(...data)
    await fileUtils.writeToFile(dirname,filename,currentData.join("\r\n"))
    const updatedData = await readFile(dirname,filename)


    const obj = {}
    obj[filename] = updatedData
    // console.log(obj)

    return obj

}
// Part 3
const removeTypeFirstChar = async (dirname,filename,firstChar) => {

    const data = await readFile(dirname,filename)

    const filteredData = data.filter(instance=>instance[0].toLowerCase()!==firstChar.toLowerCase())

    await fileUtils.writeToFile(dirname,filename,filteredData.join("\r\n"))

    const updatedData = await readFile(dirname,filename)

    const obj = {}
    obj[filename] = updatedData
    // console.log(obj)

    return obj
}

readAllFilesInDir("seed","b")
// removeTypeFirstChar("seed","beverages","B")

// (async () =>{
//     const data = await removeTypeFirstChar("seed","beverages","B")
//     console.log(data)
// })()

// (async () =>{
//     const data = await appendToFile("seed","beverages",["ne1","ne2"])
//     console.log(data)
// })()

module.exports = {
    readFile,
    readAllFilesInDir,
    appendToFile,
    removeTypeFirstChar,
}





































/* const fs = require('fs');
const { arch } = require('os');
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
} */