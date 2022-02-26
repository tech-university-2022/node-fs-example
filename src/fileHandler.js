const path = require('path');
const utils = require('./utils/fileUtilities');

const readAndFilterFiles = async (directoryPath, filterCharacter = null) => {
  if (typeof directoryPath !== 'string') throw Error('Invalid Directory Path!');
  if (filterCharacter && typeof filterCharacter !== 'string') throw Error('Invalid Filter Character!');
  // const realDirectoryPath = `../${directoryPath}`;
  const rawFileNames = await utils.promisifyReadDir(directoryPath);
  const fileNames = rawFileNames.map((fileName) => path.parse(fileName).name);
  const allFilePromises = rawFileNames.map((file) => utils.promisifyReadFile(`${directoryPath}/${file}`));
  let allFilesContent = await Promise.all(allFilePromises);
  allFilesContent.forEach((fileContent) => {
    if (fileContent.length !== 0 || !fileContent) utils.filterData(fileContent, filterCharacter);
  });
  allFilesContent = allFilesContent.reduce((allContent, perFileContent, index) => ({
    ...allContent,
    [fileNames[index]]: perFileContent,
  }), {});
  return allFilesContent;
};
module.exports = {
  readAndFilterFiles,
};
