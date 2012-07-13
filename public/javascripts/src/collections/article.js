define([
	'jquery',
	'underscore',
	'backbone',
	'models/article'
],function ($,_, Backbone, ArticleModel){
	var ArticleCollection = Backbone.Collection.extend({
	    model:ArticleModel,
		articlesperpage:10,
		url:'/articles',
		total:function(){
			return this.length;
		},
		sortByIndex:function(){
			console.log("sortByIndex is invoked");
			var m = this.models;
			var len =m.length;
			var c = 0;
			var map = {};
	
			for(var i=0;i<len;i++){
				var title = m[i].get("title");
				var index = parseInt(m[i].get("index"))-1;
				if(!map[title]){
					map[title] = new Array("a"+c++);
					map[title][index] = m[i];
				}
				else{
					map[title][index] = m[i];
				}
			}
	
			var result = [];
			for(var va in map){
				result = result.concat(map[va]);
			}
	
			this.models = result;
			return result;
		}
	});


	return ArticleCollection;
});