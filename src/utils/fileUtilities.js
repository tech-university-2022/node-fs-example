const fs = require('fs');

const promisifyReadDir = (directoryPath) => new Promise((resolve, reject) => {
  if (typeof directoryPath !== 'string') throw new Error('Invalid, enter a proper Directory Path!');
  fs.readdir(directoryPath, (err, data) => {
    if (err) reject(new Error('Directory not found!'));
    else resolve(data);
  });
});
const filterData = (array, filterCharacter = null, include = true) => {
  if (array.constructor !== Array) throw new Error('Invalid, enter proper array!');
  if (array.some((item) => typeof item !== 'string')) throw new Error('Invalid, enter proper array!');
  if (filterCharacter && typeof filterCharacter !== 'string') throw new Error('Invalid, enter a proper filter Character!');
  if (!filterCharacter) return array;
  if (include) {
    return array.filter((item) => item.toLowerCase().startsWith(filterCharacter.toLowerCase()));
  }
  return array.filter((item) => !item.toLowerCase().startsWith(filterCharacter.toLowerCase()));
};
const promisifyReadFile = (filePath) => new Promise((resolve, reject) => {
  if (typeof filePath !== 'string') throw new Error('Invalid, enter a proper filepath!');
  fs.readFile(filePath, (err, data) => {
    if (err) reject(err);
    else resolve(data.toString().split('\r\n'));
  });
});
const promisifyAppendFile = (filePath, data) => new Promise((resolve, reject) => {
  if (typeof filePath !== 'string') throw new Error('Invalid, enter a proper filepath!');
  if (!data) throw Error('Invalid, Enter data to write!');
  else if (typeof data !== 'string') throw new Error('Invalid, enter string buffer data!');
  fs.appendFile(filePath, data, (err) => {
    if (err) reject(new Error(`Cannot write into file '${filePath}'!`));
    return resolve(promisifyReadFile(filePath));
  });
});
const promisifyWriteFile = (filePath, data) => new Promise((resolve, reject) => {
  if (typeof filePath !== 'string') throw new Error('Invalid, enter a proper filepath!');
  if (!data) throw new Error('Invalid, Enter data to write!');
  else if (typeof data !== 'string') throw new Error('Invalid, enter string buffer data!');
  fs.writeFile(filePath, data, (err) => {
    if (err) reject(new Error(`Cannot write into file '${filePath}'!`));
    return resolve(promisifyReadFile(filePath));
  });
});

const removeFromFile = async (filePath, filterCharacter = null) => {
  if (typeof filePath !== 'string') throw new Error('Invalid, enter a proper filepath!');
  if (!filterCharacter || typeof filterCharacter !== 'string') throw new Error('Invalid, enter a proper filter Character!');
  let content = await promisifyReadFile(filePath);
  if (content.length !== 0) { content = filterData(content, filterCharacter, false).join('\r\n'); }
  const writePromise = await promisifyWriteFile(filePath, content);
  return writePromise;
};
// (async () => {
//   // const a = await promisifyWriteFile('./seed/fruits.txt', '\r\nstrawberry\r\npeach');
//   const a = await promisifyReadFile('./seed/fruits.txt');
//   // const a = filterData(4, 'b', true);
//   console.log(a);
// })();

module.exports = {
  promisifyReadDir,
  promisifyReadFile,
  promisifyAppendFile,
  removeFromFile,
  filterData,
};
