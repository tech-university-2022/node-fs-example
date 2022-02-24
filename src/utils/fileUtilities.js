const fs = require('fs');

const promisifyReadFolder = (folderPath) => new Promise((resolve, reject) => {
  if (typeof (folderPath) !== 'string') {
    throw new Error('Invalid input type');
  }
  fs.readdir(folderPath, 'utf-8', (folderError, files) => {
    if (folderError) {
      reject(folderError);
    } else {
      resolve(files);
    }
  });
});

const promisifyReadFile = (filePath, firstCharacter) => new Promise((resolve, reject) => {
  if (typeof (filePath) !== 'string') {
    throw new Error('Invalid input for first argument');
  }
  fs.readFile(filePath, 'utf-8', (fileError, data) => {
    if (fileError) {
      reject(fileError);
    } else {
      const result = (data.split('\r\n'));
      if (firstCharacter) {
        if (typeof (firstCharacter) !== 'string') {
          throw new Error('Invalid input for second argument');
        }
        result.filter((item) => item[0].toLowerCase() === firstCharacter.toLowerCase());
      }
      resolve(result);
    }
  });
});

const promisifyWriteFile = (filePath, content) => new Promise((resolve, reject) => {
  if (typeof (filePath) !== 'string') {
    throw new Error('Invalid input for first argument');
  }
  if (typeof (content) !== 'string') {
    throw new Error('Invalid input for second argument');
  }
  fs.writeFile(filePath, content, (err) => {
    if (err) {
      reject(err);
    }
    resolve(content);
  });
});

const editFile = async (filePath, firstCharacter) => {
  if (typeof (filePath) !== 'string') {
    throw new Error('Invalid input type for first argument');
  }
  if (typeof (firstCharacter) !== 'string') {
    throw new Error('Invalid input type for second argument');
  }
  let result = await promisifyReadFile(filePath);
  result = result.filter((item) => item[0] !== firstCharacter);
  let newFileContent = '';
  result.forEach((item) => { newFileContent += `${item}\n`; });
  const newFile = await promisifyWriteFile(filePath, newFileContent);
  // console.log(newFile);
  return newFile;
};

module.exports = {
  promisifyReadFile,
  promisifyReadFolder,
  promisifyWriteFile,
  editFile,
};
