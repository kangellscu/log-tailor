var Express = require('express');
var Stream = require('express-stream');
var Tail = require('tail').Tail;
var Ejs = require('ejs');
var Ls = require('ls');
var Path = require('path');
var Config = require('config');

var app = Express();
app.set('views', './views');
app.set('view engine', 'ejs');

var logRoot = Config.get('app.logRoot');
var listenPort = Config.get('server.port');

Stream.useAllAutoTags(true);
Stream.streamBefore('pre-body-view');
Stream.streamAfter('post-body-view');

function tailFile (file, res)
{
  var tail = new Tail(file);

  tail.on("line", function (line) {
    console.log(line);
    res.stream('landing', {"line": line});
  });

  tail.on("error", function (error) {
    console.log("Error: ", error);
  });
}

app.get('/ls', function (req, res) {
  var files = Ls(
      Path.join(logRoot, '*'),
      { recurse: false }
    );
  res.render('ls', { files: files });
});

app.get('/tail/:file', Stream.stream(), function (req, res) {
  var logFile = Path.join(logRoot, req.params.file);
  tailFile(logFile, res);
});

var server = app.listen(listenPort, function () {
  var host = server.address().address;
  var port = server.address().port;

  console.log('Example app listening at http://%s:%s', host, port);
});
