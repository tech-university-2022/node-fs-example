/* pseudo code:-
1.file name needed
2. read file name using readdir
3. read all files content
4.  manipulate data according to the ques */
const fs = require('fs');
const path = require('path');
const utils = require('./utils/operator');

const readFileContent = async (directoryName, characterForFilter) => {
  const fileNameArray = await utils.promisefyReaddir(directoryName);
  const fileNameArraywithouttxt = fileNameArray.map((file) => path.parse(file).name);
  const filePromiseArray = fileNameArray.map((file) => utils.promisefyFileRead(`${directoryName}/${file}`, characterForFilter));
  const fileDataArray = await Promise.all(filePromiseArray);

  const objOfFileWithData = fileDataArray.reduce((acc, currfiledata, index) => ({ ...acc, [fileNameArraywithouttxt[index]]: currfiledata }), {});

  return objOfFileWithData;
};

const dataRemovalFromFile = async (filepath, directoryName, filterCharacter = null) => {
  const datas = await utils.promisefyFileRead(filepath);
  let newData = ' ';
  console.log('data before removal', datas);
  if (filterCharacter !== null) {
    newData = datas.filter((item) => !item.toLowerCase().startsWith(filterCharacter.toLowerCase())).join('\r\n');
  }

  await utils.promisefyWriteFile(filepath, newData);

  const fileData1 = await readFileContent(directoryName);
  return fileData1;
};

/* const callingFunction = async () => {
  const data = await readFileContent('./seed');// async return promise whose data will be return value
  console.log('displaying file data in obj form ', data);

  console.log('adding data in beverages.txt');
  const mess = await utils.promisefyWriteFile('./seed/beverages.txt', 'tea\r\nhot\r\nchocolate\r\ncoffee');
  console.log(mess);
  const data1 = await utils.promisefyAppendFile('./seed/fruits.txt', 'strawberry\r\npeach');
  console.log(data1);
  const data2 = await utils.promisefyAppendFile('./seed/vegetables.txt', '  pumpkin');
  console.log(data2);
  const finalFileData = await readFileContent('./seed');
  console.log('data : ', finalFileData);
  const data3 = await dataRemovalFromFile('./seed/vegetables.txt', './seed');
  console.log('after removal', data3);
};
callingFunction(); */

module.exports = { readFileContent, dataRemovalFromFile };
