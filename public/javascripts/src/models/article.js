define([
	'jquery',
	'underscore',
	'backbone'
],function ($,_, Backbone){
	var ArticleModel = Backbone.Model.extend({
	initialize:function(){
		 this.on("destroy",function(){console.log("destroy is on");});
	},
	defaults:{
		title:"no tittle",
		category:"none",
		content:"nothing...",
		author:"someone",
	},
	urlRoot:'/article',
	clear:function(){
		Backbone.sync("delete",this,{url:"/article/"+this.attributes._id});
		this.view.remove();
	}
});

	return ArticleModel;
});
