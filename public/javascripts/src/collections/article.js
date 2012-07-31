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
			var result = [];
			var len = this.models.length;
			var ms = this.models;
			for(var i=0;i<len;i++){
				var l = ms[i].get("index");
				result[l] = ms[i];
			}
			this.models = result;
		},
		_sortByOutline:function(){
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
				var mo = m[atls[i]];console.log("mo:"+mo);
				var caps = mo.get("capters");console.log("caps:"+caps);
				caps = this.mapIt(caps,"title");console.log("caps:"+caps);
				var ol_caps = ol[atls[i]];console.log("ol_caps:"+ol_caps);
				var c_len = ol_caps.length;console.log("c_len:"+c_len);
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
		_sortByIndex:function(){
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