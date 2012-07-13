define([
	'jquery',
	'underscore',
	'backbone'
],function ($,_, Backbone){
	var UserModel = Backbone.Model.extend({
	urlRoot:'/user',
	initialize:function(){}
});

	return UserModel;
});
