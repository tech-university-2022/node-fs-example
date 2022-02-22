const fs = require('fs');
const path = require('path');

const promisfyReadDir = (directoryPath) => {
    return new Promise((resolve,reject) => {
        fs.readdir(directoryPath, 'utf-8' , (error,data) => {
            if(error) {
                reject(error);
            }
            else{
                resolve(data);
            }
        })
    })
}

const promisfyReadFile = (filePath , character) => {
    return new Promise((resolve , reject ) => {
        fs.readFile(filePath, 'utf-8' , (error,data) => {
            if(error) {
                reject(error);
            }else{
                resolve(data.toString().split('\n').filter((a) => a.toLowerCase().startsWith(character.toLowerCase())));
            }
        })
    })
}

const readAllFiles = async (directoryPath) => {
    const rawFileNames = await promisfyReadDir(directoryPath);
    const fileNames = rawFileNames.map((fileName) => path.parse(fileName).name);
    const allFilePromises = rawFileNames.map((fileName) => promisfyReadFile(`${directoryPath}/${fileName}`,'c'))
    const allFilesData = await Promise.all(allFilePromises);
    const result = allFilesData.reduce((acc,fileContent,index) => {
        return{
            ...acc,
            [fileNames[index]] : fileContent
        }
    }, {})
    console.log(result);
}

readAllFiles('./seed');