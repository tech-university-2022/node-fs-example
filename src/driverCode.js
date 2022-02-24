const handler=require('../src/fileHandler2.js');
const readMultipleFiles=require('../utils/readMultipleFiles');
const utils=require('../utils/fileManipulator.js');
const fs=require('fs');


const readAndFilterData=async (directoryPath,filterWithStartingLetter=null)=>{
    let dataInFiles;
    try{
        dataInFiles=await readMultipleFiles.readAllFiles(directoryPath);
    }catch(err){
           console.log(err.message);
           return;
    }
    console.log(dataInFiles);
    if(filterWithStartingLetter!==null){
        const filteredData=handler.filterData(dataInFiles,filterWithStartingLetter);
        console.log(filteredData);
    };
};
const addDataToFile=()=>{
    utils.writeToFile('C:\\Users\\Twissa Modi\\node-fs-example\\seed\\beverages.txt','tea\r\nhot chocolate\r\ncoffee');
    utils.appendToFile('C:\\Users\\Twissa Modi\\node-fs-example\\seed\\fruits.txt','\r\nstrawberry\r\npeach\r\n');
    utils.appendToFile('C:\\Users\\Twissa Modi\\node-fs-example\\seed\\vegetables.txt','\r\npumpkin\r\n');
}

const driverCode=async ()=>{
    await readAndFilterData('C:\\Users\\Twissa Modi\\node-fs-example\\seed','c');
    await addDataToFile();
    readAndFilterData('C:\\Users\\Twissa Modi\\node-fs-example\\seed');
    console.log(await handler.removeData('C:\\Users\\Twissa Modi\\node-fs-example\\seed\\vegetables.txt','c'));
}
driverCode();