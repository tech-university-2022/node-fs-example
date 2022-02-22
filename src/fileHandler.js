const path = require('path');
const { promisifyReadFile, promisifyReadDir, removeFromFile } = require('./utils/fileUtilities');

const readAndFilterFiles = async (directoryPath, filterCharacter = null) => {
  if (typeof directoryPath !== 'string') throw Error('Invalid Directory Path!');
  if (filterCharacter && typeof filterCharacter !== 'string') throw Error('Invalid Filter Character!');
  const rawFileNames = await promisifyReadDir(directoryPath);
  const fileNames = rawFileNames.map((fileName) => path.parse(fileName).name);
  const allFilePromises = rawFileNames.map((file) => promisifyReadFile(`${directoryPath}/${file}`, filterCharacter));
  let allFilesContent = await Promise.all(allFilePromises);
  allFilesContent = allFilesContent.reduce((allContent, perFileContent, index) => ({
    ...allContent,
    [fileNames[index]]: perFileContent,
  }), {});
  return allFilesContent;
  // console.log(allFilesContent);
};
// readAndFilterFiles('./seed', 'C');
module.exports = {
  readAndFilterFiles,
};
// (async () => {
//   console.log(await removeFromFile('./seed/vegetables.txt', 'C'));
// })();
