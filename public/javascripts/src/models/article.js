define([
	'jquery',
	'underscore',
	'backbone'
],function ($,_, Backbone){
	var ArticleModel = Backbone.Model.extend({
	initialize:function(){
		console.log(this.get("content"));
		console.log($("#wmd-input"));
		 this.set("htmlContent",unescape(this.get("html")));
		 console.log("htmlContent:"+this.get("htmlContent"));
		 if(!doc_sys.atls){
		 	doc_sys.atls = [];
		 	doc_sys.atls.push(this.get("content"));
		 }else{
		 	doc_sys.atls.push(this.get("content"));
		 }
	},
	clear:function(){
		Backbone.sync("delete",this,{url:"/article/"+this.attributes._id});
		for(var va in this.views){
			this.views[va].remove();
		}
		
	}
});

	return ArticleModel;
});
