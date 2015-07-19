var	gulp = require('gulp'),
	rl = require('readline-sync'),
	fs = require('fs');

var	config = {
		mongo	: './mongoconfig.js'
	};

gulp.task('init', function(){
	// TODO: use nconf
	if (!fs.existsSync(config.mongo)){
		console.log('Create mongodb configuration file');
		var mongo = {
			server	: '127.0.0.1',
			port	: '27017',
			db	: 'shareKeyDB',
			user	: 'shareKeyUser',
			password: 'shareKeyUserPwd'
		}; 

		mongo.server	= rl.question('Mongodb host (' + mongo.server + '): ') || mongo.server;
		mongo.port	= rl.question('Mongodb port (' + mongo.port + '): ') || mongo.port; 
		mongo.db	= rl.question('Mongodb database (' + mongo.db + '): ') || mongo.db; 
		mongo.user	= rl.question('Database user (' + mongo.user + '): ') || mongo.user; 
		mongo.password	= rl.question('User password (' + mongo.password + '): ', { hideEchoBack: true}) || mongo.password;
		
		fs.writeFileSync(config.mongo, 'module.exports = { connectionstring : \'mongodb://' + mongo.user + ':' + mongo.password + '@' + mongo.server + ':' + mongo.port + '/' + mongo.db + '\'}');
	}
});

gulp.task('watch', function(){

});

gulp.task('scripts', function(){

});

gulp.task('default', ['init', 'watch', 'scripts']);
