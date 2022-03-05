const fs = require('fs');

function  promisifyReadDir(directoryPath) {
  return new Promise(function (fulfill, reject) {
    fs.readdir(directoryPath, async function (err, files) {
      if (err) {
        return console.log(`Unable to scan directory: ${ err}`);
      }
      fulfill(files);
    });
  });
}


function  promisifyReadFile(filePath) {
  return new Promise(function (fulfill, reject) {
    fs.readFile(filePath,'utf-8' , (err, result) => {
      if (err) {
        reject(err.message);
      }
      fulfill(result);
    });
  });
}

function promisifyWriteFile(filePath,data) {
  return new Promise(function (fulfill, reject) {
    fs.writeFile(filePath, data , (err) => {
      if (err) {
        reject(err.message);
      }
      fulfill('Successfully written into the file');
    }); 
  });
}

function promisifyAppendFile(filePath,data) {
  return new Promise(function (fulfill, reject) {
    fs.appendFile(filePath, data , (err) => {
      if (err) {
        reject(err.message);
      }
      fulfill('Successfully appended into the file');
    }); 
  });
}


module.exports = {
  promisifyReadDir, promisifyReadFile, promisifyWriteFile, promisifyAppendFile
};