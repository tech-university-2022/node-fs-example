const fs = require("fs")

// Reads the file names inside a directory
// readDirectory(seed) => ["fruits.txt","beverages.txt","vegetable.txt"]
const readDirectory = async (dirName) => {
    try{
        const fileNames = await fs.promises.readdir(dirName)

        return fileNames
    }catch(err){
        console.log(err)
    }
}

const readDirectoryPromise = (dirname) => {

    return new Promise((resolve , reject) => {
        fs.readdir(dirname, 'utf-8' , (error, data) => {
            if(error)
            {
                reject("ERROR! not a valid path");
            }
            resolve(data);
        })
    })
}


const readFiles = async (dirname,filename) =>{

    try{

        const data = await fs.promises.readFile(`${dirname}/${filename}.txt`,"utf8")

        return data;

    }catch(err){
        console.log("ERROR",err)
    }
}

const appendData = async (dirname,filename,data) =>{

    try{

        await fs.promises.appendFile(`${dirname}/${filename}.txt`,data)

    }catch(err){
        console.log("ERROR",err)
    }

}

const writeToFile = async (dirname,filename,data) =>{

    try{

        await fs.promises.writeFile(`${dirname}/${filename}.txt`,data)

    }catch(err){
        console.log("ERROR",err)
    }

}
module.exports = {
    readDirectory,
    readFiles,
    appendData,
    writeToFile,
    readDirectoryPromise
}
