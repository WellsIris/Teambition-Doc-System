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
		for(var va in this.views){
			this.views[va].remove();
		}
		
	}
});

	return ArticleModel;
});
