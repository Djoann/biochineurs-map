var express = require('express');
var path = require('path');
var http = require('http');
//var twitter = require('./routes/twitterClient');
var node = require('./routes/graphdb');

var app = express();

app.configure(function() {
    app.set('port', process.env.PORT || 3000);
    app.use(express.logger('dev')); /* 'default', 'short', 'tiny', 'dev' */
    app.use(express.bodyParser()), app.use(express.static(path.join(__dirname,
            'public')));
    // app.use(express.bodyParser()),
    // app.use(express.static(path.join(__dirname,
    // '../')));
});

//app.get('/tw', twitter.getLastTweet);

app.get('/hello', function(req,res){
var body = 'Hello World';
  res.setHeader('Content-Type', 'text/plain');
  res.setHeader('Content-Length', body.length);
  res.end(body);
});
app.get('/graphdb', node.findAll);
// This line should be commented to work with static file.
//app.get('/data/data.json', node.findAll);

//app.get('/graphdb/geo', node.findByBounds);
app.post('/graphdb', node.addnode);
app.get('/graphdb/:id', node.findById);
// app.put('/graphdb/:id', node.updatenode);
// app.delete('/graphdb/:id', node.deletenode);
app.use(express.static('./public'));

http.createServer(app).listen(app.get('port'), function() {
    console.log("Express server listening on port " + app.get('port'));
});
