const dotenv = require('dotenv');
const mongoose = require('mongoose');
const express = require('express');
const app = express()
dotenv.config({path: './config.env'})

require('./db/conn')
//const User = require('./model/userSchema');  // to link the schema to this app js page


//to get the json data compiled and to show to us in json complied form
app.use(express.json());

// we link the router files to make our route to this page easily and not lots of code;
app.use(require('./router/auth'));






const PORT = process.env.PORT;
app.get('/', (req, res)=>{
    res.send("hello wrold :eehheehhe")
})

app.listen(PORT, ()=>{
    console.log(`server is running at port ${PORT}`)
})

