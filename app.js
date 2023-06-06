const path = require('path');
const fs = require('fs');

const foo = ()=>{
    fs.rm(path.join(__dirname,'homeWorks'),{recursive:true},(err)=>{
        if (err) throw new Error(err.message);
    })
};
foo();