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