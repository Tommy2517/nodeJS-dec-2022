// const {lesson1} = require("./lessons/lesson_1-module-path-os-fs/lesson1");
// lesson1();
const fs = require("fs");
const path = require("path");
console.log('hello okten - homeWork');
// ДЗ:
//     Створіть папку
// В тій папці створіть 5 папок і 5 файлів
// І за допомогою модулю fs виведіть в консоль, чи це папка чи це файл
//
// FILE: {fileName}
// FOLDER: {folderName}
//
// !руками нічого не робимо, все через f

//make dir
// fs.mkdir(path.join(__dirname,'homeWorks','hw1'),(err)=>{
//     if (err) throw new Error(err.message);
// })

//link to hw1
const hw1 = path.join(__dirname,'homeWorks','hw1',)

//make 5 dirs and 5 files
// for (let i =0;i<5;i++){
//     fs.mkdir(path.join(hw1,'dir'+i,),(err)=>{
//         if (err) throw new Error(err.message);
//     })
//     fs.writeFile(path.join(hw1,'file'+i),'hola',(err)=>{
//         if (err) throw new Error(err.message);
//     })
// }
//remove 5 files
// for (let i =0;i<5;i++){
//     fs.unlink(path.join(hw1+'file'+i),(err)=>{
//         if (err) throw new Error(err.message);
//     })
// }

//remove 5 dir
// for (let i =0;i<5;i++){
//     fs.rmdir(path.join(__dirname,'homeWorks','dir'+i,),(err)=>{
//         if (err) throw new Error(err.message);
//     })
// }

//log file insides
fs.readdir(hw1,{withFileTypes:true},(err,files)=>{
    files.forEach(file=>{
        if (file.isFile()){
            console.log(file,'це файл')
        }
        else {
            console.log(file,"це папка")
        }
    })
})