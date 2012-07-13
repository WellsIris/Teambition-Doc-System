define([
	'jquery',
	'underscore',
	'backbone',
	'json2',
	'doT',
	'UserModel',
	'text!../../../templates/user/user.html',
],function ($, _, Backbone,json2 ,doT,UserModel, UserTemplate){
	var UserView = Backbone.View.extend({
	tagName:"div",
	events:{

	},
	initialize:function(model){
		console.log("user view initialized");
		this.model = model;
		this.template = doT.template(UserTemplate);
		this.model.on('change', this.render);
		this.model.view = this;
	},
	render:function(){
		console.log("user view rendered");
		$(this.el).html(this.template(this.model.toJSON()));
		return this;
	}
});

	return UserView;
});