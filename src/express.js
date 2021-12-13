const express = require('express');
const app = express();

app.use('/',(req,res) => {
    res.send(`<h1> Hello, From the NODE Backend. How are You ? Hoping for good.<h1>`)
})

module.exports=app;