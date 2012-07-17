
/**
 * Module dependencies.
 */

var express = require('express')
  , routes = require('./routes');

var app = module.exports = express.createServer();


// Configuration

app.configure(function(){
  app.set('views', __dirname + '/views');
  app.set('view engine', 'jade');
  app.use(express.bodyParser());
  app.use(express.cookieParser());
  app.use(express.session({ secret: "keyboard cat" }));
  app.use(express.methodOverride());
  app.use(require('stylus').middleware({ src: __dirname + '/public' }));
  app.use(app.router);
  app.use(express.static(__dirname + '/public'));
});
  

app.configure('development', function(){
  app.use(express.errorHandler({ dumpExceptions: true, showStack: true }));
});

app.configure('production', function(){
  app.use(express.errorHandler());
});

// Routes

app.get('/', routes.index);
app.get('/quit',routes.user.quit);
app.post('/login*',routes.user.login);
app.post('/register',routes.user.regis);
app.post('/user',routes.user.regis);
app.get('/user/:user',routes.index);
app.get('/articles', routes.article.getarticles);
app.get('/article/add', routes.article.addarticle);
app.post('/article/edit', routes.article.editarticle);
app.post('/article/put', routes.article.update);
app.post('/article/add', routes.article.submitarticle);
app.delete('/article/:id',routes.article.del);
app.listen(7000, function(){
  console.log("Express server listening on port %d in %s mode", app.address().port, app.settings.env);
});
