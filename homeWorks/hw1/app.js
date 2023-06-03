// ДЗ:
//     Створіть папку
// В тій папці створіть 5 папок і 5 файлів
// І за допомогою модулю fs виведіть в консоль, чи це папка чи це файл
//
// FILE: {fileName}
// FOLDER: {folderName}
//
// !руками нічого не робимо, все через f


const fs = require('fs');
const path = require('path');

//link to folder
const folder  = path.join(__dirname,'folder');




//create dir
 // fs.mkdir(folder,(err)=>{
 //  if (err) throw new Error(err.message)
 // })

//delete file
// for (let i = 0; i < 5; i++) {
//  fs.unlink(path.join(__dirname,'file'+i),(err)=>{
//   if (err) throw new Error(err.message);
//  })
// }

//create files and directs

// for (let i = 1; i <= 5; i++) {
//  fs.mkdir(path.join(folder,'direct-'+i),(err)=>{
//   if (err) throw new Error(err.message);
//  });
//  fs.writeFile(path.join(folder,'file-'+i+'.txt'),'hello from file - '+i,(err)=>{
//   if (err) throw new Error(err.message);
//  })
// }

for (let i = 1; i <= 5; i++) {
 fs.unlink(path.join(folder,'file-'+i+'.txt'),(err)=>{
  if (err) throw new Error(err.message);
 })
}







 //////////////////////////////////////////////////////////////
 //  Винести базу даних в json.file, при створенні записувати туда нових юзерів через fs, при видаленні - видаляти
// При створенні валідацію на імія і вік, імя повинно бути більше 3 символів, вік – не менше нуля
// На гет, пут, деліт юзерів перевірити чи такий юзер є

