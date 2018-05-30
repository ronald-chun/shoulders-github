const http = require('http');
const app = require('./app');
const normalizePort = require('normalize-port');
const port = normalizePort(process.env.PORT || '3000');

app.set('port', port)

http.createServer(app).listen(port, function() {
	console.log('Server start running at port' + port);
});


