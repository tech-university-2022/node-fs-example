const fs=require('fs');
const getFileNames=(directoryPath)=>{
    return new Promise((resolve,reject)=>{
        fs.readdir(directoryPath,'utf-8',(err,file)=>{
            if(err){
                reject(err);
            }
            resolve(file);
    });
});
}
module.exports=
{
    getFileNames
};