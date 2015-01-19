var express = require('express'),
    http = require('http'),
    path = require('path'),
    bodyParser = require('body-parser'),
    server = require('./server/server'),
    data  = require('./server/database');

var app = express();

app.set('port', 8080);
app.use(express.static(__dirname + '/public'));
app.use(express.static(__dirname + '/bower_components'));
app.use(express.static(__dirname + '/node_modules'));
app.use(bodyParser.json());

app.get('/findall', server.getUserList);
app.get('/find/:id', server.getUserById);
app.post('/remove/:id', server.deleteUserById);
app.post('/edit/:id', server.editUserById);

http.createServer(app).listen(app.get('port'), function () {
    console.log('Express server listening on port ' + app.get('port'));
});
