//-----EVENTS--------------EVENTS--------------EVENTS--------------EVENTS--------------EVENTS--------------EVENTS---------//
// const events = require('events');                   //импортируем ивенты
//
// const eventEmitter = new events();                  //создаем класс от ивентов
//
//
// //метод on - декларирует события. можно задекларировать несколько
// eventEmitter.on('click', (data) => {      //первый аргумент декларируем имя
//     console.log('click', 'click', 'click',)   //второй аргумент - функция, может принимать аргумент
// })
//
// //Для генерации события и вызова связанных с ним обработчиков выполняется функция eventEmitter.emit, в которое передается название события.
// //второй аргумент ивента отвечает за данные которые можно передать в колбэк
// eventEmitter.emit('click',{data:'hello'});  //вызываем click click click
// eventEmitter.emit('click')                  //вызываем click click click
// eventEmitter.emit('click')                  //вызываем click click click
// eventEmitter.emit('click')                  //вызываем click click click можно много раз
//
// console.log(eventEmitter.eventNames());     //показывает какие функции подключены к эмиттеру
//
//
// //метод once - декларирует так же как on только выполняется один раз
// eventEmitter.once('clickordie', () => {   //де
//     console.log('click or die');                           //
// })
//
// console.log(eventEmitter.eventNames());                   //показывает какие функции подключены к эмиттеру
//
// eventEmitter.emit('clickordie') // выполняется
// eventEmitter.emit('clickordie') // не выполняется
// eventEmitter.emit('clickordie') // не выполняется
// eventEmitter.emit('clickordie') // не выполняется
//
// console.log(eventEmitter.eventNames());                   //показывает какие функции подключены к эмиттеру
//-----EVENTS--------------EVENTS--------------EVENTS--------------EVENTS--------------EVENTS--------------EVENTS---------//




// //------STREAM------STREAM------STREAM------STREAM------STREAM------STREAM------STREAM------STREAM------STREAM------STREAM//
// //// clear file
// // const q = path.join(__dirname,'text.txt')
// // function foo(){
// //     fs.truncate(q, (err)=>{
// //         if (err) throw new Error(err.message);
// //     })
// // }
// // foo();
//
//
// ///Существует 4 типа стримов :
// // read - читает
// // write - записывает
// // duplex - и читает и записывает но для исполльзования нужно экспортнуть zlib = require('zlib');
// // transform - hz
//
// const fs = require('node:fs');
// const path  = require('node:path');
// //createReadStream - считывает файл и возвращает содержимое частями (chunks)
// const readStream = fs.createReadStream('text.txt',{highWaterMark: 128*1024}); // опция highWaterMark - позволяет выбрать размер чанков
// const writeStream = fs.createWriteStream('text2.txt',);//createWriteStream - создает файл
//
// readStream.on('data',(chunk)=>{ //считываем данные с readStream записываем в буфер чанк и
//     writeStream.write(chunk) //с помощью метода write записываем чанк в text2
// }) // но есть более простой способ реализации этого примера - pipe >
// readStream.pipe(writeStream); // таким образом мы перетащили данные с одного в другой файл
//
//
//
// //ошибки в readStream
// readStream
//     .on('error',(err)=>{//ловим ошибку
//         console.log(err+'AREMON');
//         readStream.destroy();//останавливает работу функции в случае ошибки
//         writeStream.end('ERROR ON READING FILE'); //добавляет данные в конец файла
//     })
//     .pipe(writeStream);//перетащили данные с readStream в writeStream
//
// //------STREAM------STREAM------STREAM------STREAM------STREAM------STREAM------STREAM------STREAM------STREAM------STREAM//




//------EXPRESS------EXPRESS------EXPRESS------EXPRESS------EXPRESS------EXPRESS------EXPRESS------EXPRESS------EXPRESS------EXPRESS
//express - это фрэймворк позволяет node.js поднять сервер, однако он устарел и его заменяет Nest он построен на express

const express = require('express')
const fs = require("fs");
const path = require("path");
const {json} = require("express");
const e = require("express"); //затягиваем express

// let users = [
//     {name: 'vasya', age: 31, status: false},
//     {name: 'petya', age: 30, status: true},
//     {name: 'kolya', age: 29, status: true},
//     {name: 'olya', age: 28, status: false},
//     {name: 'max', age: 30, status: true},
//     {name: 'anya', age: 31, status: false},
//     {name: 'oleg', age: 28, status: false},
//     {name: 'andrey', age: 29, status: true},
//     {name: 'masha', age: 30, status: true},
//     {name: 'olya', age: 31, status: false},
//     {name: 'max', age: 31, status: true}
// ];

const reader = () => {
    return new Promise((resolve,reject)=>{
        fs.readFile(path.join(__dirname, 'json', 'users.json'), {encoding:"utf-8"},(err, data) => {
            if (err) {
                reject(err);
            }else {
                const users = JSON.parse(data)
                resolve(users);
            }
            // let newData = JSON.parse(data.toString());
        });
    });
};



const app = express(); //вызываем как функцыю и получаем app которая будет обрабатывать определенные запросы

app.use(express.json());//что то читает, мб джейсон, обязателен.
app.use(express.urlencoded({extended: true}));//так же


const modifyUsers = async (newUser)=>{
    try{
        let users = await reader();
        fs.truncate(path.join(__dirname,'json', 'users.json'),(err)=>{
            if (err) throw new Error(err.message)
        })
        users.push(newUser)
        console.log(users);
        fs.appendFile(path.join(__dirname,'json', 'users.json'), JSON.stringify(users),(err)=>{
            if (err) throw new Error(err.message)
        })
        return users
    }catch (e){
        console.error(e)
        throw e
    }
}
// modifyUsers().then()

app.post('/users',(req, res)=>{
    modifyUsers(req.body).then()
    console.log(req.body);
    // users.push(req.body)



    res.status(201).json({message:'user created'})

})


app.get('/users', (req, res) => {//req - то что получили от клиента; res - то что возвращаем клиенту;
    //обрабатываем полученный запрос req
    // console.log('Hello World!')
    //отправляем результат клиенту
    // res.send(users) отправляет строку
    //достаем данные с базы и отправляем клиенту
    res.status(200).json(users)//коды ответа это коды которые сервер возвращает клиенту что бы было понятно все ли отработало хорошо
     // 100-199 информативные.. 200-299 успешеные..300-399 перенаправления.. клиентские ошибки 400-499.. серверные ошибки 500-599
        //отправляет объект

})

//отправляем юзеров по айди
//params - метод который возвращает объект {id:2}
//id который запросит клиент, те то что будет после слеша будет находиться в объекте как значение с ключем который мы указываем в get
const modifyUsers2 = async (id)=>{
    try{
        let users = await reader();
        // fs.truncate(path.join(__dirname,'json', 'users.json'),(err)=>{
        //     if (err) throw new Error(err.message)
        // })

        // console.log(users);
        // fs.appendFile(path.join(__dirname,'json', 'users.json'), JSON.stringify(users),(err)=>{
        //     if (err) throw new Error(err.message)
        // })
        if (id === 'last'){
            console.log('last')
            return users[users.length-1]
        }
        else if (id ==='first'){
            console.log('first')
            return users[0]
        }
        else {
        return users[id]
        }
    }catch (e){
        console.error(e)
        console.log('юзера с таким айди нет')
        throw e
    }
}
app.get('/users/:id',(req, res)=>{ //принимаем реквест
    const { id }=req.params;//деструктурируем получаем значение ключа

    modifyUsers2(id).then((value)=>{
        // console.log(value)
        res.status(200).json(value);//возвращаем респонс с объектом чей id совпадает с реквестом
    })
    // console.log(JSON.stringify(q));
    // console.log(JSON.parse(q))
})
app.get('users/:id',(req, res) =>{
        modifyUsers2(req.params).then()
})

//так как браузер может обрабатывать только GET запросы, для POST запросов нужно использовать альтернативные инструменты на подобии postman
//для того что бы отправить с клиента на сервер какой то объект


// users.map((user) =>{
//     let newUser = JSON.stringify(user)
//     fs.appendFile(path.join(__dirname,'json','users.json'),`${newUser}`,(err)=>{//создали папку
//         if (err) throw new Error(err.message);
//     })
//
//
// })


// fs.appendFile(path.join(__dirname,'json','users.json'),JSON.stringify(users),(err)=>{
//     if (err) throw new Error(err.message);
// })





const PORT = 5001;//уникальный идентификатор определенного процесса который запускается на нашем компьютере
app.listen(PORT, () => { // listen - метод обращается к app и говорит что бы app мониторил процесс с PORT
    console.log(`Server has started on PORT ${PORT} `)
})











//------EXPRESS------EXPRESS------EXPRESS------EXPRESS------EXPRESS------EXPRESS------EXPRESS------EXPRESS------EXPRESS------EXPRESS
