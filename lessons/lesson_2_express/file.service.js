const fs = require('fs/promises')
const path = require('node:path')
module.exports = {
    readDB: async ()=>{
        const buffer = await fs.readFile(path.join(__dirname,'db.json'));
        const json = buffer.toString();
        return json ? JSON.parse(json) : [];
    },
    writeDB: async (users)=>{
        await fs.writeFile(path.join(__dirname,'db.json'),JSON.stringify(users))
    }
}
