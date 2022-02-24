const fs = require('fs');
const getData=(fileName,firstLetter)=>{
    return new Promise((fulfill,reject)=>{
            fs.readFile(fileName, (error, dataInFile) => {
            if (error){
                return reject(new Error('File cannot be opened'));
            }
            else{
                reterivedData=dataInFile.toString().split('\n').filter((currentElement)=>currentElement!=='');
                if(firstLetter){
                    fulfill(reterivedData.filter((element)=>element[0]===firstLetter));
                }
                fulfill(reterivedData);
            }
        });
    });
}
function appendFiles(file,...argument){
    let s=argument.join('\r\n');
    s='\r\n'+s;
    fs.appendFileSync(file,s);
   // let fruits=await getData('./seed/beverages.txt')
    //console.log(fruits)
}
async function fileReader(firstLetter){
    let fruits=await getData('./seed/fruits.txt',firstLetter)
    let vegetables=await getData('./seed/vegetables.txt',firstLetter)
    //console.log(typeof fruits,fruits)
    let obj={}
    obj['fruits']=fruits
    obj['vegetables']=vegetables
    console.log(obj)
    return obj;
};
async function removeC()
{
    let vegetables=await getData('./seed/vegetables.txt')
    let vegi=vegetables.filter(veg=>veg[0]!='c');
    let s=vegi.join('\n')
    s='\n'+s
   // console.log(s)
    fs.writeFile('./seed/vegetables.txt',s, (err) => {
        if (err) throw err;
    })
    let obj={}
    obj['vegetables']=vegetables
    console.log(obj);
    return obj;
}
fileReader();
//fileReader('a');
//appendFiles('./seed/beverages.txt','tea','hot chocolate','coffee')
//appendFiles('./fruits.txt','strawberry','peach')
//appendFiles('./vegetables.txt','pumpkin')
//removeC();
module.exports={
    getData,
    fileReader,
    appendFiles,
    removeC
}