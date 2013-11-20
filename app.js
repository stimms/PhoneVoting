
/**
 * Module dependencies.
 */

var express = require('express');
var routes = require('./routes');
var polls = require('./routes/polls');
var http = require('http');
var io = require('socket.io');
var path = require('path');
var azure = require('azure');

var app = express();

// all environments
app.set('port', process.env.PORT || 3000);
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');
app.use(express.favicon());
app.use(express.logger('dev'));
app.use(express.json());
app.use(express.urlencoded());
app.use(express.methodOverride());
app.use(app.router);
app.use(require('less-middleware')({ src: path.join(__dirname, 'public') }));
app.use(express.static(path.join(__dirname, 'public')));

// development only
if ('development' == app.get('env')) {
  app.use(express.errorHandler());
}

app.get('/', routes.index);
app.get('/polls', polls.list);
app.post('/poll', polls.add);
app.post('/recordVote', polls.recordVote);
app.post('/recordPhoneVote', polls.recordPhoneVote);
app.delete('/poll', polls.delete);
app.get('/add.html', polls.htmlAdd);
app.get(/^\/poll\/(.*)/, polls.details);
app.get('/polls.html', polls.htmlList);
app.get('/poll.html', polls.htmlDetail);

var server = http.createServer(app);
server.listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});

var socketio = io.listen(server);
app.locals.socketio = socketio;
