const express = require('express');
const fs = require("fs");
const path = require("path");
const fileService = require('./file.service');


const app = express(); //вызываем как функцыю и получаем app которая будет обрабатывать определенные запросы

app.use(express.json());//что то читает, мб джейсон, обязателен.
app.use(express.urlencoded({extended: true}));//так же

// const reader = () => {
//     return new Promise((resolve,reject)=>{
//         fs.readFile(path.join(__dirname, 'json', 'users.json'), {encoding:"utf-8"},(err, data) => {
//             if (err) {
//                 reject(err);
//             }else {
//                 const users = JSON.parse(data)
//                 resolve(users);
//             }
//         });
//     });
// };
//
// const modifyUsers = async (newUser)=>{
//     try{
//         let users = await reader();
//         fs.truncate(path.join(__dirname,'json', 'users.json'),(err)=>{
//             if (err) throw new Error(err.message)
//         })
//         users.push(newUser)
//         console.log(users);
//         fs.appendFile(path.join(__dirname,'json', 'users.json'), JSON.stringify(users),(err)=>{
//             if (err) throw new Error(err.message)
//         })
//         return users
//     }catch (e){
//         console.error(e)
//         throw e
//     }
// }
// const modifyUsers2 = async (id)=>{
//     try{
//         let users = await reader();
//         if (id === 'last'){
//             console.log('last')
//             return users[users.length-1]
//         }
//         else if (id ==='first'){
//             console.log('first')
//             return users[0]
//         }
//         else if (!id) {
//             return users
//         }
//         else {
//             return users[id]
//         }
//     }catch (e){
//         console.error(e)
//         console.log('юзера с таким айди нет')
//         throw e
//     }
// }


app.get('/users', async (req, res) => {//req - то что получили от клиента; res - то что возвращаем клиенту;
    const users = await fileService.readDB();
    res.json(users);

    // modifyUsers2().then((users) =>{
    //     res.status(200).json(JSON.stringify(users))
    //     console.log(users)
    // })
})

app.get('/users/:id',async (req, res)=>{
    const {id} = req.params;

    const users = await fileService.readDB();

    const user = users.find((user) => user.id === +id);

    if (!user){
        return res.status(422).json('users not found')
    }

    res.json(user)
})

//
// app.get('/users/:id',(req, res)=>{ //принимаем реквест
//     const { id }=req.params;//деструктурируем получаем значение ключа
//     modifyUsers2(id).then((value)=>{
//         res.status(200).json(value);//возвращаем респонс с объектом чей id совпадает с реквестом
//     })
// })
// app.get('users/:id',(req, res) =>{
//         modifyUsers2(req.params).then()
// })
//
app.post('/users',async (req, res)=>{
    const {name, age}=req.body;
    const users = await fileService.readDB();
    const newUser={
        id: users.length ? users[users.length-1].id + 1 : 1,
        name,
        age
    }
    if (!name){
        return res.status(400).json('name is nemae')
    }
    if (!age || age < 10 || age > 150){
        return res.status(400).json('age is nemae')
    }
    users.push(newUser)
    await fileService.writeDB(users);
    res.status(201).json(newUser)
})

app.delete('/users/:id',async (req, res)=>{
    const { id } = req.params;
    const users = await fileService.readDB();
    const index = users.findIndex((user)=>user.id === +id);
    if (index <= -1){
        return res.status(422).json('user not found');
    }
    users.splice(index,1);
    await fileService.writeDB(users);
    res.sendStatus(204);
})

app.patch('/users/:id',async (req, res)=>{
    const { id } = req.params;
    const {name,age}=req.body;

    if (name && name.length<3 || name.length > 30){
        return res.status(400).json('count of simbols is not avalible')
    }
    if (age && (age < 10 || age > 100)){
        return res.status(400).json('age is nemae')
    }

    const users = await fileService.readDB();
    const user = users.find((user)=>user.id === +id);

    if (!user){
        return res.status(422).json('user not found');
    }

    if (name)user.name=name;
    if (age)user.age=age;
    await fileService.writeDB(users);

    res.sendStatus(204);
})





const PORT = 5001;//идентификатор процесса на компьютере
app.listen(PORT, () => { // listen - app мониторит процесс PORT
    console.log(`Server has started on PORT ${PORT} `)
})
