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