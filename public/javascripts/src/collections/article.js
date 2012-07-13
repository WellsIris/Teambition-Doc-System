define([
	'jquery',
	'underscore',
	'backbone',
	'ArticleModel'
],function ($,_, Backbone, ArticleModel){
	var ArticleCollection = Backbone.Collection.extend({
	    model:ArticleModel,
		articlesperpage:10,
		url:'/articles',
		sortByIndex:function(){
			console.log("sortByIndex is invoked");
			var m = this.models;
			var len =m.length;
			var map = {};
	
			for(var i=0;i<len;i++){
				var title = m[i].get("title");
				var index = parseInt(m[i].get("index"))-1;
				if(!map[title]){
					map[title] = new Array();
					map[title][index] = m[i];
				}
				else{

					map[title][index] = m[i];
				}
			}

			var result = [];
			for(var va in map){
				var l = map[va].length;
				var order = 1;
				for(var i=0;i<l;i++){
					if(map[va][i]){
						
						map[va][i].set("order",order);
						order++;
					}
				}
				result = result.concat(map[va]);
			}
	
			this.models = result;
			return result;
		}
	});


	return ArticleCollection;
});