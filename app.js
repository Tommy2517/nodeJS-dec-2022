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


fs.mkdir(path.join(__dirname,'lessons',))