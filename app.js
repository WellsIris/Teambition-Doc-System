
/**
 * Module dependencies.
 */

var express = require('express'), 
    routes = require('./routes'),
    config = require('./config').config;

var app = module.exports = express.createServer();


// Configuration

app.configure(function(){
  app.set('views', __dirname + '/views');
  app.set('view engine', 'jade');
  app.use(express.bodyParser());
  app.use(express.methodOverride());
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
app.get('/login',routes.user.login);
app.get('/logout',routes.user.logout);
app.get('/signup',routes.user.signup);
app.get('/user/:user',routes.index);
app.post('/doc/session*',routes.doc.saveSession);
app.post('/doc/add*',routes.doc.add);
app.get('/docs',routes.doc.getAll);
app.get('/articles', routes.article.getAll);
app.get('/article/add', routes.article.addarticle);
app.get('/article/delete',routes.article.del);
app.post('/article/put', routes.article.update);
app.post('/article/add', routes.article.submitarticle);
app.get('/auth_callback', routes.user.auth_callback);
app.listen(config.port, function(){
  console.log("Express server listening on port %d in %s mode", app.address().port, app.settings.env);
});
