const express = require('express');
var app = express();

app.set('views', __dirname + '/public/views');

app.engine('html', require('ejs').renderFile);
app.set('view engine', 'html');

app.get('/css/*',(req,res)=>{
    res.sendfile('public'+req.originalUrl); 
})
app.get('/js/*',(req,res)=>{
    res.sendfile('public'+req.originalUrl); 
})
app.get('/images/*',(req,res)=>{
    res.sendfile('public'+req.originalUrl); 
})
app.get('/fonts/*',(req,res)=>{
    res.sendfile('public'+req.originalUrl); 
})
app.get('/',(req,res)=>{
    console.log("welcome")
    res.render('index');
})

module.exports = app