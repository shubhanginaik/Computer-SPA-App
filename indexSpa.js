'use strict';

const http = require('http');
const path = require('path')
const cors = require('cors');
//const fetch = require('node-fetch');
// npm install node-fetch@2
const fetch = require('./fetchlib');

const express = require('express');
const app = express();

const {port,host} = require('./config.json');

const server = http.createServer(app);

app.use(express.json());
app.use(express.static(path.join(__dirname,'public')));

app.get('/', (req,res)=>res.sendFile(path.join(__dirname,'menu.html')))




app.get('/getAll', (req,res)=>{
    fetch('http://localhost:4000/api/computers', {mode:'cors'})
     .then(data=>data.json()) //comment it if u r using version 2 in fetchlib
    .then(result=>res.json(result))
    .catch(err=>res.json(err));
});

server.listen(port,host,
    ()=>console.log(`Server ${host}:${port} running...`));