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
		sortByOutline:function(){
			if(!doc_sys.outline){
				return "error:doc_sys.outline is not existed";
			}
			var ol = doc_sys.outline;
			var len = ol.articles.length;
			if(len != this.models.length){
				return "error:length not match";
			}
			var m = this.mapIt(this.models,"title");
			var atls = ol.articles;
			var result = [];
			
			for(var i=0;i<len;i++){
				var mo = m[atls[i]];
				var caps = mo.get("capters");
				caps = this.mapIt(caps,"title");
				var ol_caps = ol[atls[i]];
				var c_len = ol_caps.length;
				if(c_len != mo.get("capters").length){
					return "error:length not match in caps";
				}
				var new_caps = [];
				for(var j=0;j<c_len;j++){
					new_caps.push(caps[ol_caps[j]]);
				}
				mo.set("capters",new_caps);
				result.push(mo);
			}
			this.models = result;

		},
		mapIt:function(arr,str){
			console.log(arr);
			var result = {};
			var len = arr.length;
			for(var i=len-1;i>=0;i--){
				if(arr[i].get){
					var t = arr[i].get(str);
				}else{
					var t = arr[i][str];
				}
				result[t] = arr[i];
			}
			return result;
		},
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