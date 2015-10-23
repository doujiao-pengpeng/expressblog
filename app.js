
/**
 * Module dependencies.
 */

var express = require('express');
var routes = require('./routes');
//var user = require('./routes/user');
var http = require('http');
var path = require('path');
var MongoStore = require('connect-mongo')(express);
var settings = require('./settings');
var flash = require('connect-flash');

var app = express();

// all environments
app.set('port', process.env.PORT || 3000);
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.use(flash());
app.use(express.favicon());
app.use(express.logger('dev'));
// app.use(express.json());  参照实战修改规则
// app.use(express.urlencoded());
app.use(express.bodyParser({keepExtensions:true,uploadDir:'./public/images'}));//保留文件后缀名，上传目录为./public/images
app.use(express.methodOverride());

app.use(express.cookieParser());//设置cookie和session
app.use(express.session({
	secret: settings.cookieSecret,
	key:settings.db,//cookie name
	cookie: {maxAge :1000*60*60*24*30},//30 days
	store: new MongoStore({
		db :settings.db
	})
}));
app.use(app.router);
app.use(express.static(path.join(__dirname, 'public')));

// development only
if ('development' == app.get('env')) {
  app.use(express.errorHandler());
}
/*参照实战修改规则 把路由控制器和实现路由功能的函数放到index.js里面，在app.js中只有一个总的路由接口
app.get('/', routes.index);
app.get('/users', user.list);
*/

http.createServer(app).listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});

// 总路由接口
routes(app);