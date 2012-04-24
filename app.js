
/**
 * Module dependencies.
 */

var express = require('express')
  , routes = require('./routes');

var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/test');
var Schema = mongoose.Schema
  , ObjectId = Schema.ObjectId;

var BlogPost = new Schema({
    author    : ObjectId
  , title     : String
  , body      : String
  , date      : Date
});

var Post = mongoose.model('Post', BlogPost);

var instance = new Post();
instance.title = '11';
instance.save(function (err) {
  
});
Post.find({}, function (err, docs) {
  console.log(docs);
});

var app = module.exports = express.createServer();


// Configuration

app.configure(function(){
  app.set('views', __dirname + '/views');
  app.set('view engine', 'jade');
  app.use(express.bodyParser());
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
app.get('/article/add', routes.article.addarticle);
app.post('/article/add', routes.article.submitarticle);

app.listen(7000, function(){
  console.log("Express server listening on port %d in %s mode", app.address().port, app.settings.env);
});
