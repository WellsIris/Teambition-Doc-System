define([
	'jquery',
	'underscore',
	'backbone'
],function ($,_, Backbone){
	var ArticleModel = Backbone.Model.extend({
	initialize:function(){
		 this.set("total_art",this.total_art());
		 this.set("total_cap",this.total_cap());
	},
	clear:function(){
		Backbone.sync("delete",this,{url:"/article/"+this.attributes._id});
		for(var va in this.views){
			this.views[va].remove();
		}
		
	},
	total_art:function(){
		return this.articles.length;
	},
	total_cap:function(){
		var len = this.articles.length;
		var c = 0;
		var as = this.articles;
		for(var i=0;i<len;i++){
			c += as[i].capters.length;
		}
		return c;
	}
});

	return ArticleModel;
});
