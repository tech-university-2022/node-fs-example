const { error } = require('console');
const fs=require('fs');
const path =require('path');

const promisifyReadDir=(directoryPath,)=>{
    return new Promise((resolve,reject)=>{
        fs.readdir(directoryPath,'utf-8',(error,data)=>{
            if (error){
                reject(error);
            }
            else
            {
                resolve(data);
            }
        })
    })
}
const promisifyReadFile=(filePath,character)=>{
    return new Promise((resolve,reject)=>{
        fs.readFile(filePath,'utf-8',(error,data)=>{
            if(error){
                reject(new Error ('file cannnot open'))
            }
            else{
                let datas=data.toString().split('\r\n').filter((currentElement)=>currentElement!=='')
                if(character)
                    resolve(datas.filter((a)=>a[0]!==character))
                resolve(datas);
            }
        })
    })
}
const readAllFiles = async (directoryPath,character)=>{
    const rawfileNames=await promisifyReadDir(directoryPath);//return files
    //console.log(rawfileNames);
    const fileNames=rawfileNames.map((file)=>path.parse(file).name);//return file names without extensions
    //console.log(fileNames);
    const allFilePromises=rawfileNames.map((fileName)=>promisifyReadFile(`${directoryPath}/${fileName}`,character));
    //return promises
    //console.log(allFilePromises);
    const allFilesData=await Promise.all(allFilePromises);//resolve promises
    //console.log(allFilesData);
    result=allFilesData.reduce((acc,fileContent,index)=>{//converts to object
        return {
            ...acc,
            [fileNames[index]]:fileContent
        }
    }, {})
    console.log(result)
}
function appendFiles(file,...argument){
    let s=argument.join('\r\n');
    s='\r\n'+s;
    fs.appendFileSync(file,s);
}
const remove=(file)=>{
    return new Promise((fulfill,reject)=>{
        fs.readFile(file, (error, vegetables) => {
            if (error){
                return reject('File cannot be opened');
            }
            fulfill(reterivedData=vegetables.toString().split('\r\n').filter((currentElement)=>currentElement!=='').filter((element)=>element[0]!=='c'));
        });
    })
}
const removeC= async (file)=>{
    rem=await remove(file);
    console.log(rem)
}
//readAllFiles('./seed','c')
//appendFiles('./seed/beverages.txt','tea','hot chocolate','coffee')
//appendFiles('./fruits.txt','strawberry','peach')
//appendFiles('./vegetables.txt','pumpkin')
//removeC('./seed/vegetables.txt');
module.exports={
    readAllFiles,
    promisifyReadFile,
    promisifyReadDir
}