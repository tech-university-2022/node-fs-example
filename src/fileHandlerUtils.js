const { resolve } = require('dns');
const fs = require('fs');
const path = require('path');

const promisfyReadDir = (directoryPath) => {
    return new Promise((resolve, reject) => {
        fs.readdir(directoryPath, 'utf-8', (error, data) => {
            if (error) {
                reject(error);
            }
            else {
                resolve(data);
            }
        })
    })
}

const promisfyReadFile = (filePath) => {
    return new Promise((resolve, reject) => {
        fs.readFile(filePath, 'utf-8', (error, data) => {
            if (error) {
                reject(error);
            } else {
                resolve(data.toString().split('\n'));
            }
        })
    })
}

const promisfyWriteFile = (filepath, val) => {
    return new Promise((resolve, reject) => {
        fs.writeFile(filepath, val, (error, data) => {
            if (error) {
                reject(error);
            } else {
                resolve(data);
            }
        })
    })
}

const promisifyAppendFile = (filepath, data) => {
    return new Promise((resolve, reject) => {
        fs.appendFile(filepath, data, (err) => {
            if (err) {
                reject(err);
            } else {
                resolve()
            }
        });
    })
}

const readAndFilterFiles = async (filePath, filterCharacter = null) => {
    return new Promise((resolve, reject) => {
        fs.readFile(filePath, 'utf-8', (error, data) => {
            if (error) {
                reject(error);
            }
            if (filterCharacter !== undefined) {
                resolve(data.split('\r\n').filter((data) => data.toLowerCase()[0] !== filterCharacter.toLowerCase()));
            }
            else {
                resolve(data.split('\r\n'));
            }

        })
    })
}


module.exports = {
    promisfyReadDir,
    promisfyReadFile,
    promisifyAppendFile,
    promisfyWriteFile,
    readAndFilterFiles
}