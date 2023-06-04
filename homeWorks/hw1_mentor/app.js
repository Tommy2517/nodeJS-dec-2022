const fs = require('node:fs/promises');
const path = require('node:path');

const foo = async () => {                                                    //создаем асинхронную функцию
    const basePath = path.join(process.cwd(), 'baseFolder');                 //создаем путь к baseFolder

    await fs.mkdir(basePath, {recursive: true});                          //создаем папку, с опцией рекурсии
    const fileNames = ['file1.txt', 'file2.txt', 'file3.txt', 'file4.txt'];      //создаем массив файлов
    const folderNames = ['folder1', 'folder2', 'folder3', 'folder4',];           //создаем массив папок

    await Promise.all(folderNames.map(async (folder)=>{       //await - останавливаем функцию, пока промис
                                                                    //не вернет результат своих действий. Мапаем масив папок.

        await fs.mkdir(path.join(basePath, folder), {recursive: true});    //останавливаем функцию,создаем каждую папку из массива

        await Promise.all(fileNames.map(async (file) => {                  //останавливаем функцию
            await fs.writeFile(path.join(basePath, folder, file), 'hello'); //создаем в каждой папке, каждый файл из массива и заполняем hello
        }));
    }))

    for (const file of fileNames) {                                                 //
        await fs.writeFile(path.join(basePath, file), 'hello');                  //
    }

    const files = await fs.readdir(basePath);
    for (const file of files) {
        console.log(file)
        const stat = await fs.stat(path.join(basePath,file));//содержит статистику файла
        console.log(path.join(basePath,file),' : ', stat.isDirectory()? 'folder' : 'file');
    }
}
foo();

// -- Опция в mkdir {recursive:true}