
const path = require('path');
const fs = require('fs');
const getData=(fileName,startingLetter)=>{
    return new Promise((fulfill,reject)=>{
        fs.readFile(fileName, (error, dataInFile) => {
        if (error){
            return reject(new Error('File cannot be opened'));
        }
        reterivedData=dataInFile.toString().split('\r\n').filter((currentElement)=>currentElement!=='');
        if(startingLetter!=='none'){
            fulfill(reterivedData.filter((element)=>element[0]===startingLetter));
        }
        fulfill(reterivedData);
    });
});
};

const readAndFilterData=async(startingLetter='none')=>{
    let dataInFiles={};
    getData('./seed/beverages.txt',startingLetter).then((value)=>dataInFiles['beverages']=value);
    const dataInFruits=await getData('./seed/fruits.txt',startingLetter);
    const dataInVegetables= await getData('./seed/vegetables.txt',startingLetter);
    dataInFiles['fruits']=dataInFruits;
    dataInFiles['vegetables']=dataInVegetables;
    console.log(dataInFiles);
}

const writeToFile=(fileName,content)=>{
    return new Promise((fulfill,reject)=>{
        fs.writeFile(fileName,content,(err)=>{
            if(err){
                reject(new Error('Data could not be written'));
            }
            fulfill('data written successfully');
        })
    })
}
const appendToFile=(fileName,content)=>{
    return new Promise((fulfill,reject)=>{
        fs.appendFile(fileName,content,(err)=>{
            if(err){
                reject(new Error('Data could not be written'));
            }
            fulfill('data written successfully');
        })
    })
}
const removeVegetablesStartingWithC=()=>{
    return new Promise((fulfill,reject)=>{
        fs.readFile('seed/vegetables.txt', (error, vegetables) => {
        if (error){
            return reject(new Error('File cannot be opened'));
        }
        fulfill(reterivedData=vegetables.toString().split('\r\n').filter((currentElement)=>currentElement!=='').filter((element)=>element[0]!=='c'));
    });
});
}
const callingFunction=async ()=>{
    writeToFile('seed/updatedBeverages.txt',"tea\r\nhot chocolate\r\ncoffee\r\n");
    appendToFile('./seed/updatedBeverages.txt',"juice");
    writeToFile('seed/updatedFruits.txt',"strawberry\r\npeach");
    writeToFile('seed/updatedVegetables.txt','pumpkin');
    await readAndFilterData();
    removeVegetablesStartingWithC().then(value=>console.log(value));
}
callingFunction();

