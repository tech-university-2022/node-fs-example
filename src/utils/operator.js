const fs = require('fs');

const promisefyReaddir = (directoryName) => new Promise((resolve, reject) => {
  fs.readdir(directoryName, 'UTF-8', (err, data) => {
    if (err) { reject(new Error('file name are not accesible')); } else {
      resolve(data);
    }
  });
});
const promisefyFileRead = (filePath, characterForFilter) => new Promise((resolve, reject) => {
  fs.readFile(filePath, 'UTF-8', (err, data) => {
    if (err) {
      reject(err);
    } else if (characterForFilter) {
      resolve(data.toString().split('\r\n').filter((item) => item.toLocaleLowerCase.startsWith(characterForFilter.toLocaleLowerCase)));
    } else {
      resolve(data.toString().split('\r\n').filter((currfiledata) => currfiledata !== ''));
    }
  });
});
const promisefyWriteFile = (filepath, dataToBeAdded) => new Promise((resolve, reject) => {
  fs.writeFile(filepath, dataToBeAdded, (err) => {
    if (err) {
      reject(new Error('cannot open file'));
    } else {
      resolve('successfully data added');
    }
  });
});

const promisefyAppendFile = (filepath, dataToBeAppend) => new Promise((resolve, reject) => {
  fs.appendFile(filepath, dataToBeAppend, 'UTF-8', (err) => {
    if (err) {
      reject(new Error('cannot append data '));
    } else {
      resolve('appended data succesfully');
    }
  });
});

module.exports = {
  promisefyReaddir, promisefyFileRead, promisefyWriteFile, promisefyAppendFile,
};
// ctrl+b:-to increase the size
