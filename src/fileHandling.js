const path = require('path');
const fs = require('fs');
const obj = require('./utils/fileUtilities');

const readFiles = async (folderPath, firstCharacter) => {
  if (typeof (folderPath) !== 'string') {
    throw new Error('Invalid input type for first argument');
  }
  if (firstCharacter && typeof (firstCharacter) !== 'string') {
    throw new Error('Invalid input type for second argument');
  }
  const rawFileNames = await obj.promisifyReadFolder(folderPath);
  const fileNames = rawFileNames.map((fileName) => path.parse(fileName).name);
  const allFilePromises = rawFileNames.map((fileName) => obj.promisifyReadFile(`${folderPath}/${fileName}`, firstCharacter));
  const allFilesData = await Promise.all(allFilePromises);
  const result = allFilesData.reduce((acc, fileContent, index) => ({
    ...acc,
    [fileNames[index]]: fileContent,
  }), {});
  return (result);
};

const addFileContent = ((folderPath, fileName, content) => new Promise((fulfill, reject) => {
  if (typeof (folderPath) !== 'string' || typeof (fileName) !== 'string') {
    throw new Error('Invalid path');
  }
  if (!content) {
    throw new Error('Second argument expected');
  }
  if (typeof (content) !== 'string') {
    throw new Error('Invalid input');
  }
  fs.appendFile(path.join(folderPath, fileName), content, (err) => {
    if (err) {
      return reject(err.message);
    }
    // console.log(content);
    return fulfill(readFiles(folderPath));
  });
}));

// readFiles('./seed');
// (async () => {
//   console.log(await addFileContent('./seed', 'beverages.txt', 'tea\r\nhot chocolate\r\ncoffee'));
// })();

// addFileContent('../node-fs-example/seed', 'fruits.txt', '\nstrawberry\r\npeach');
// addFileContent('../node-fs-example/seed', 'vegetables.txt', '\r\npumpkin');

// obj.editFile('./seed/vegetables.txt', 'c');

module.exports = {
  readFiles,
  addFileContent,
};
