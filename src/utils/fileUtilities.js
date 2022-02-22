const fs = require('fs');

const promisifyReadDir = (directoryPath) => new Promise((resolve, reject) => {
  if (typeof directoryPath !== 'string') throw Error('Invalid, enter a proper Directory Path!');
  fs.readdir(directoryPath, (err, data) => {
    if (err) reject(new Error('Directory not found!'));
    else resolve(data);
  });
});
const promisifyReadFile = (filePath, filterCharacter = null) => new Promise((resolve, reject) => {
  if (typeof filePath !== 'string') throw Error('Invalid, enter a proper filepath!');
  if (filterCharacter && typeof filterCharacter !== 'string') throw Error('Invalid, enter a proper filter Character!');
  fs.readFile(filePath, (err, data) => {
    if (err) reject(err);
    else if (filterCharacter) resolve(data.toString().split('\r\n').filter((item) => item.toLowerCase().startsWith(filterCharacter.toLowerCase())));
    else {
      resolve(data.toString().split('\r\n'));
    }
  });
});
module.exports = {
  promisifyReadDir,
  promisifyReadFile,
};
