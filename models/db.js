var settings   = require('../settings'),
    Db         = require('mongodb').Db,
    Connection = require('mongodb').Connection,
    Server     = require('mongodb').Server;
module.exports = new Db(settings.db, new Server(settings.host,27017),{safe:true});
//设置数据库名，数据库地址。数据库端口，创建了一个数据库连接实例，
//这样可以通过require这个文件对数据库进行读/写了