const fs = require('fs');

function readFile(filePath) {
  return new Promise(function (fulfill, reject) {
    fs.readFile(filePath,'utf-8' , (err, result) => {
      if (err) {
        reject(err.message);
      }
      fulfill(result);
    });
  });
}

async function getFileContent(filePath,firstCharacter) {
  let result = readFile(filePath);
  try {
    result = await result;
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

function getSeeds(firstCharacter) {
  try {
    const seeds = {};
    const directoryPath = './seed/';
    fs.readdir(directoryPath, async function (err, files) {
      if (err) {
        return console.log(`Unable to scan directory: ${ err}`);
      } 

      await Promise.all(files.map(async (file) => {
        const resultSeeds = await getFileContent(`${directoryPath}${file}`,firstCharacter);
        file = file.replace('.txt','');
        seeds[file] =  resultSeeds;
      }));
      console.log(seeds);
    });
    return Promise.resolve(seeds);
  }
  catch (err) {
    return Promise.reject(err.message);
  }
}

async function appendFile(filePath,data) {
  return new Promise(function (fulfill, reject) {
    fs.appendFile(filePath, data , (err) => {
      if (err) {
        reject(err.message);
      }
      fulfill(getFileContent(filePath));
    }); 
  });
}

async function appendSeeds() {
  const beveragesData = 'tea\r\nhot chocolate\r\ncoffee';
  const resultBeveragesData = appendFile('./seed/beverages2.txt',beveragesData);
  const fruitsData =  '\r\nstrawberry\r\npeach';
  const resultFruitsData = appendFile('./seed/fruits2.txt',fruitsData);
  const vegetablesData = '\r\npumpkin';
  const resultVegetablesData = appendFile('./seed/vegetables2.txt',vegetablesData);
  console.log(await resultBeveragesData);
  console.log(await resultFruitsData);
  console.log(await resultVegetablesData);
}

function writeFile(filePath,data) {
  return new Promise(function (fulfill, reject) {
    fs.writeFile(filePath, data , (err) => {
      if (err) {
        reject(err.message);
      }
      fulfill(getFileContent(filePath));
    }); 
  });
}

async function removeSeeds(filePath, firstCharacter) {
  let result = readFile(filePath);
  result = await result;
  result = result.replace(/(\r)/g, '');
  result = result.split('\n');
  result = result.filter(element => element.length > 0);
  if (firstCharacter) {
    result = result.filter(element => element[0] !== firstCharacter);
  }
  let finalVegetableContent = '';
  result.forEach((element) => {finalVegetableContent += (`${element}\r\n`);}); 
  const resultVegetablesData = writeFile('./seed/vegetables3.txt',finalVegetableContent);
  console.log(await resultVegetablesData);
}

getSeeds();

//appendSeeds();

//removeSeeds('./seed/vegetables3.txt','c');

module.exports = {
  readFile,
  getFileContent,
  getSeeds,
  appendFile
};