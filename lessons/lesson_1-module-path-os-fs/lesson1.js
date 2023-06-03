// // --Node.js---


const {sayHello} = require("./helper/sayHelloHelper");
const path = require("path");
const os = require("os");
const fs = require("fs");
let nodeJS = {
    Core_js_api: '',
    V8: "js -> machine code",
    libuv: [
        'запускает eventLoop'
        , 'предоставляет некоторые модули, написанные на С++ (terminal: node Tab Tab)'
        , 'например такие как os, fs, path, и тд']}
function lesson1(){

    // // --modules-- //
    // //импорты экспорты
    //     const {sayHello} = require('./helper/sayHelloHelper')   //глобальная функция require находит файл
    //     sayHello();     //теперь можем использовать функцию из другого файла так же как она была бы здесь.
    //
    //
    // //GLOBAL VARIABLES
    // //__dirmane, __filename, process.cwd();
    //     console.log('lesson1')
    //     console.log(__dirname); //возвращает путь к директории в которой находится файл запустивший функцию
    //     console.log(__filename);//возвращает путь к файлу (включительно) запустившему конкретную функцию
    //     console.log(process.cwd()); //CWD - Current working directory путь к директории файла который запускает программу (app.js)
    //
    //
    // // библиотека path
    //     const path = require('path'); //path предназначен для того, что бы на юникс системах (mac & linux) и виндоус не возникало
    // // ошибок изза слешей "\" в юникс-/; в винде-"\"
    //
    //     const joinedPath = path.join(__dirname,'folder', 'folder2', 'text.txt')//метод join соединяет пути через запятую
    //     console.log(joinedPath);
    //
    //
    //     const normalizedPath = path.normalize('////test////test2////sets3')//normalize - убирает лишние слеши
    //     console.log(normalizedPath);
    //
    //     const resolvedPath = path.resolve('folder', 'folder2', 'text.txt')//то же самое что join только dirname уже есть под капотом
    //     console.log(resolvedPath);
    //
    //
    // //OS - модуль который тянется с node > libuv он написан на с++ и дает доступ к операционной системе
    //
    //     const os = require('os'); //details - 'https://nodejs.org/api/os.html'
    //     console.log(os.version());
    // //exec - дает доступ ко всем процессам компьютера, можно управлять системой, включать выключать пк и тд
    //     const {exec} = require('child_process'); //метод exec дает возможность запускать в ноде баш скрипты
    // //баш скрипты это скрипты которые используются в юникс системах для того что бы как то манипулировать ОС
    //
    //
    // //FS - file sistem дает полный доступ к файловой системе, удалять создавать копировать и тд
    // const text2Path = path.join(__dirname, 'folder', 'folder2','dota23.exe')
    //     fs.writeFile(text2Path, 'Hello from Ok ten, writeFile', (err)=>{
    //         if (err) throw new Error(err.message);
    //     }); // writeFile - создает файл. первый аргумент - путь и название файла, второй - (data) чем наполнить файл,
    // // третий-колбэк функция, в которую логаем ошибку если она есть
    //
    //
    //     fs.readFile(text2Path,{encoding:"utf-8"}, (err,data)=>{
    //         if (err) throw new Error(err.message);
    //         console.log(data.toString());//здесь мы логаем содержимое файла дота23.ехе преобразуя в строку.(либо чертез опцию encoding)
    //     }); // readFile - читает файл, первый аргумент - путь к файлу, второй - callback(eror,data)
    //
    //
    //     fs.appendFile(text2Path,'\nasdasdsadsa1323123121',(err)=>{
    //         if (err) throw new Error(err.message)
    //     });//добавляет наши данные в конец файла (1-путь,2-дата,3-колбэк);
    //
    //
    //     fs.truncate(text2Path, (err)=>{
    //         if (err) throw new Error(err.message);
    //     });//truncate - очищает файл
    //
    //
    //     // fs.unlink(text2Path, (err)=>{
    //     //     if (err) throw new Error(err.message);
    //     // });//unlink - стирает файл
    //
    //     fs.readdir(path.join(__dirname, 'folder'),{withFileTypes:true},(err,files)=>{
    //         if (err) throw new Error(err.message);
    //         console.log(files);//возвращает массив с названиями вех папок и файлов внутри указанной директории
    //         //что бы проверить является ли содержимое папки файлом или директорией есть опция withFileTypes
    //         //withFileTypes - возвращает массив с объектами файлов внутри с name"имя папки" и значением
    //         files.forEach(file=>{
    //             console.log(file.isFile());//возвращает  тру если содерживое-файл иначе фолс.
    //         })
    //     })
    //
    //
        fs.mkdir(path.join(__dirname,'folder','folder4'),(err)=>{//создали папку
            if (err) throw new Error(err.message);
        }) //создает папку, ,

        fs.rmdir(path.join(__dirname,'folder','folder4'),(err)=>{//удалили папку
            if (err) throw new Error(err.message);
        })//удаляет папку
}

////////////////////////видео на 1.10 рекурсия рм удаление содержимого рекурсивно
module.exports = {
    lesson1,
}


