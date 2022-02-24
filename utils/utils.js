const fs = require('fs');

const promisefyReaddir = (directoryName) => new Promise((resolve, reject) => {
  fs.readdir(directoryName, 'UTF-8', (err, data) => {
    if (err) { reject(err.message); } else {
      resolve(data);
    }
  });
});
const promisefyFileRead = (filePath) => new Promise((resolve, reject) => {
  fs.readFile(filePath, 'UTF-8', (err, data) => {
    if (err) {
      reject(err);
    } else {
      resolve(data.toString().split('\r\n'));
    }
  });
});

module.exports = { promisefyReaddir, promisefyFileRead };
