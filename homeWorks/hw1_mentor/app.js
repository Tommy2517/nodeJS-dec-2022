const fs = require('node:fs/promises');
const path = require('node:path');

const foo = async () => {
    const basePath = path.join(process.cwd(), 'baseFolder');

    await fs.mkdir(basePath, {recursive: true});
    const fileNames = ['file1.txt', 'file2.txt', 'file3.txt', 'file4.txt'];
    const folderNames = ['folder1', 'folder2', 'folder3', 'folder4',];

    console.log(folderNames.map(async (folder)=>{
        await fs.mkdir(path.join(basePath, folder), {recursive: true});
        for (const file of fileNames) {
            await fs.writeFile(path.join(basePath,folder, file), 'hello');
        }

    }))

    for (const file of fileNames) {
        await fs.writeFile(path.join(basePath, file), 'hello');
    }

    const files = await fs.readdir(basePath);
    for (const file of files) {
        console.log(file)
        const stat = await fs.stat(path.join(basePath,file));//содержит статистику файла
        console.log(path.join(basePath,file),' : ', stat.isDirectory()? 'folder' : 'file');
    }
}
foo();