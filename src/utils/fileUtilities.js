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
const promisifyAppendFile = (filePath, data) => new Promise((resolve, reject) => {
  if (typeof filePath !== 'string') throw Error('Invalid, enter a proper filepath!');
  if (!data) throw Error('Invalid, Enter data to write!');
  else if (typeof data !== 'string') throw Error('Invalid, enter string buffer data!');
  fs.appendFile(filePath, data, (err) => {
    if (err) reject(new Error(`Cannot write into file '${filePath}'!`));
    return resolve(promisifyReadFile(filePath));
  });
});
const promisifyWriteFile = (filePath, data) => new Promise((resolve, reject) => {
  if (typeof filePath !== 'string') throw Error('Invalid, enter a proper filepath!');
  if (!data) throw Error('Invalid, Enter data to write!');
  else if (typeof data !== 'string') throw Error('Invalid, enter string buffer data!');
  fs.writeFile(filePath, data, (err) => {
    if (err) reject(new Error(`Cannot write into file '${filePath}'!`));
    return resolve(promisifyReadFile(filePath));
  });
});

const removeFromFile = async (filePath, filterCharacter = null) => {
  if (typeof filePath !== 'string') throw Error('Invalid, enter a proper filepath!');
  if (!filterCharacter || typeof filterCharacter !== 'string') throw Error('Invalid, enter a proper filter Character!');
  let content = await promisifyReadFile(filePath);
  content = content.filter((item) => !item.toLowerCase().startsWith(filterCharacter.toLowerCase())).join('\r\n');
  const writePromise = await promisifyWriteFile(filePath, content);
  return writePromise;
};
// (async () => {
//   // const a = await promisifyWriteFile('./seed/fruits.txt', '\r\nstrawberry\r\npeach');
//   const a = await removeFromFile('./seed/fruits.txt', 'b');
//   console.log(a);
// })();

module.exports = {
  promisifyReadDir,
  promisifyReadFile,
  promisifyAppendFile,
  removeFromFile,
};
