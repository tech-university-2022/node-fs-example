const fs = require('fs');

const readFileContent = (filename='') => {
    return new Promise((resolve, reject) => {
        fs.readFile(filename, (err, data) => {
            if(err)
                return reject('File cannot be read');
             resolve(data.toString().split('\r\n'));
        });
    });
};
const fileNamesArray = (dirname='') => {
    return new Promise((resolve, reject) => {
        fs.readdir(dirname, (err, files) => {
            if (err)
              reject('cant read files in dir');
            resolve(files);
        });
    });
};
const printObject = async (dirname)=>{
    let fileObject = {};
    let fileNamesPromise = fileNamesArray(dirname)
    let fileNames = await fileNamesPromise;
    for(const file of fileNames) {
        let fileDataPromise = readFileContent(dirname+'/'+file);
        let fileContent = await fileDataPromise;
        fileObject[file] = fileContent;
    }
    console.log(fileObject);
}
printObject('seed');

module.exports = {readFileContent, fileNamesArray, printObject};