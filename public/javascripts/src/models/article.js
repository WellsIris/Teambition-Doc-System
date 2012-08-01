define([
	'jquery',
	'underscore',
	'backbone'
],function ($,_, Backbone){
	var ArticleModel = Backbone.Model.extend({
	initialize:function(){
		//console.log(this);
		//console.log($("#wmd-input"));
		 this.set("htmlContent",unescape(this.get("h")));
		 //console.log("htmlContent:"+this.get("htmlContent"));
		 if(!doc_sys.atlsArr){
		 	doc_sys.atlsArr = [];
		 	doc_sys.atlsArr.push(this.get("content"));
		 }else{
		 	doc_sys.atlsArr.push(this.get("content"));
		 }
		 if(!doc_sys.tltsArr){
		 	doc_sys.tltsArr = [];
		 	doc_sys.tltsArr.push(this.get("title"));
		 }else{
		 	doc_sys.tltsArr.push(this.get("title"));
		 }
		 if(!doc_sys.idsArr){
		 	doc_sys.idsArr = [];
		 	doc_sys.idsArr.push(this.get("_id"));
		 }else{
		 	doc_sys.idsArr.push(this.get("_id"));
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
