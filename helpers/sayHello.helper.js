function sayHello() {
    console.log("Hello okten");
    console.log(__dirname);
    console.log(__filename);
    console.log(process.cwd());
}
module.exports = {
    sayHello,
};