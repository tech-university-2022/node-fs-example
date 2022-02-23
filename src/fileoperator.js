/* pseudo code:-
1.file name needed
2. read file name using readdir
3. read all files content
4.  manipulate data according to the ques */
const fs = require('fs');
const path = require('path');
const utils = require('../utils/utils');

// func to get all file name in given directory

const readFileContent = async (directoryName) => {
  const fileNameArray = await utils.promisefyReaddir(directoryName);
  const fileNameArraywithouttxt = fileNameArray.map((file) => path.parse(file).name);
  const filePromiseArray = fileNameArray.map((file) => utils.promisefyFileRead(`${directoryName}/${file}`));
  const fileDataArray = await Promise.all(filePromiseArray);// will give data of each
  /// file bcz we've promisified
  // mock resolved value

  console.log('array of all promises data ', fileDataArray);
  const objOfFileWithData = fileDataArray.reduce((acc, currfiledata, index) => ({ ...acc, [fileNameArraywithouttxt[index]]: currfiledata }), {});

  console.log(objOfFileWithData);
  return objOfFileWithData;
};
const filterData = async (directoryName, characterForFilter) => {
  const objData = await readFileContent(directoryName);
  for (const keys in objData) {
    const newData = objData[keys].filter((value) => value[0] === characterForFilter);
    objData[keys] = newData;
  }
  console.log(objData);
};

filterData('./seed', 'c');
// readFileContent('./seed');
