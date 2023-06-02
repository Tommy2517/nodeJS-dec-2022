function sayHello(){
    console.log('hello dec-2022');
    console.log(__dirname);
    console.log(__filename);
    console.log(process.cwd());

}

module.exports = {//экспорт функции
    sayHello,
}