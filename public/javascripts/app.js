define([
	'jquery',
	'underscore',
	'backbone',
	'json2',
	'UserModel',
	'ArticleModel',
	'ArticleCollection',
	'UserView',
	'ArticleView',
	'ItemView',
	'UserController',
	'ArticleController'
], function ($, _, Backbone, json2, UserModel, ArticleModel,ArticleCollection,UserView,ArticleView,ItemView,AppUser,AppArticle){

	

 	

	var initialize = function(){
		console.log("app initialize start");
		
		window.doc_sys = {};	

		doc_sys.login_user = $("#hidden div").html()||"";

		doc_sys.user = new UserModel;

		doc_sys.appuser = new AppUser;

		doc_sys.articles = new ArticleCollection;

		doc_sys.apparticle = new AppArticle;

		
		//ace.edit('maineditor');

		console.log("app initialize end");

	};

	return {
		initialize: initialize
	};
});
