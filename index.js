const express = require('express');
const app = express();
const port = 8000;

app.listen(port, (err)=>{
    if(err){
        console.log(`There is an error: ${err}`);
        return;
    }
    console.log(`The server is running on port: ${8000}`);
})