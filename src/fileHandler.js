const path = require('path');
const { promisfyReadDir, promisfyReadFile, promisifyAppendFile,
    promisfyWriteFile, readAndFilterFiles } = require('./fileHandlerUtils')

const readAllFiles = async (directoryPath) => {
    const rawFileNames = await promisfyReadDir(directoryPath);
    const fileNames = rawFileNames.map((fileName) => path.parse(fileName).name);
    const allFilePromises = rawFileNames.map((fileName) => promisfyReadFile(`${directoryPath}/${fileName}`))
    const allFilesData = await Promise.all(allFilePromises);
    const result = allFilesData.reduce((acc, fileContent, index) => {
        return {
            ...acc,
            [fileNames[index]]: fileContent
        }
    }, {})
    //console.log(result);
}

readAllFiles('./seed');

module.exports = {
    readAllFiles
}

// (async () => {
//     console.log(await promisifyAppendFile('./seed/fruits.txt', '\r\nkiwi'));
// })();

// (async () => {
//     console.log(await promisfyWriteFile('./seed/beverages.txt', 'Tea\r\nCoffee'));
// })();
// (async () => {
//     console.log(await readAndFilterFiles('./seed/vegetables.txt', 'c'))
// })();