const fs=require('fs');
const path =require('path');
const promisifyReadDir=(directoryPath)=>{
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
                reject('file cannnot open')
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
module.exports={
    promisifyReadFile,
    promisifyReadDir
}