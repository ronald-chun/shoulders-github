const mongoose = require('mongoose')
const connStr = 'mongodb+srv://shoulders:IFOKL0DR12VeUisi@shoulders-neuyi.mongodb.net/test';
mongoose.connect(connStr, function(err) {
	if (err)
		throw err;
	console.log('Successfully connected to MongoDB');
});
module.exports.User = require('./user')