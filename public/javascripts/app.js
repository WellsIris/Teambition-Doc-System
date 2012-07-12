define([
	'jquery',
	'underscore',
	'backbone',
	'json2',
	'models/user',
	'models/article',
	'collections/article',
	'views/user',
	'views/article',
	'views/item',
	'controllers/user',
	'controllers/article'
], function ($, _, Backbone, json2, UserModel, ArticleModel,ArticleCollection,UserView,ArticleView,ItemView,AppUser,AppArticle ){

	

 	

	var initialize = function(){
		console.log("app initialize start");
		

		window.login_user = $("#hidden div").html()||"";

		window.user = new UserModel;

		window.appuser = new AppUser;

		window.articles = new ArticleCollection;

		window.apparticle = new AppArticle;

		

		

		console.log("app initialize end");

	};

	return {
		initialize: initialize
	};
});
