const fs = require('fs');
const  fileOperations = require('./fileHandler.utils');

async function getFileContent(filePath,firstCharacter) {
  let result =  await fileOperations.promisifyReadFile(filePath);
  try {
    result = result.replace(/(\r)/g, '');
    result = result.split('\n');
    result = result.filter(element => element.length > 0);
    if (firstCharacter) {
      result = result.filter(element => element[0] === firstCharacter);
    }
    return Promise.resolve(result);
  }
  catch (err) {
    return Promise.reject(err.message);
  }
}

async function getSeeds(firstCharacter) {
  try {
    const seeds = {};
    const directoryPath = './resources/';
    const files = await fileOperations.promisifyReadDir(directoryPath);

    await Promise.all(files.map(async (file) => {
      const resultSeeds = await getFileContent(`${directoryPath}${file}`,firstCharacter);
       
      file = file.replace('.txt','');
      seeds[file] =  resultSeeds;
    }));
    return Promise.resolve(seeds);
  }
  catch (err) {
    return Promise.reject(err.message);
  }
}

async function appendSeeds() {
  const beveragesData = 'tea\r\nhot chocolate\r\ncoffee';
  await fileOperations.promisifyAppendFile('./resources/beverages2.txt',beveragesData);
  const resultBeveragesData = await getFileContent('./resources/beverages2.txt');
  const fruitsData =  '\r\nstrawberry\r\npeach';
  await fileOperations.promisifyAppendFile('./resources/fruits2.txt',fruitsData);
  const resultFruitsData =  await getFileContent('./resources/fruits2.txt');
  const vegetablesData = '\r\npumpkin';
  await fileOperations.promisifyAppendFile('./resources/vegetables2.txt',vegetablesData);
  const resultVegetablesData = await getFileContent('./resources/vegetables2.txt');
  return Promise.resolve('Successfully appended');
}


async function removeSeeds(filePath, firstCharacter) {
  let result =  await fileOperations.promisifyReadFile(filePath);
  result = result.replace(/(\r)/g, '');
  result = result.split('\n');
  result = result.filter(element => element.length > 0);
  if (firstCharacter) {
    result = result.filter(element => element[0] !== firstCharacter);
  }
  let finalVegetableContent = '';
  result.forEach((element) => {finalVegetableContent += (`${element}\r\n`);}); 
  await fileOperations.promisifyWriteFile('./resources/vegetables3.txt',finalVegetableContent);
  const resultVegetablesData = await getFileContent('./resources/vegetables3.txt');
  await resultVegetablesData;
  return Promise.resolve('Successfully removed');
}

module.exports = {
  getFileContent,
  getSeeds,
  appendSeeds,
  removeSeeds
};