const http = require('http');
const app = require('./app');
const process = require('dotenv').config()
//create a server object:
const server = http.createServer(app);

server.listen(process.parsed.PORT||"2000",function(){
    console.log('server start running at '+process.parsed.PORT||"2000");
});


