define([
	'jquery',
	'underscore',
	'backbone'
],function ($,_, Backbone){
	var DocModel = Backbone.Model.extend({
	initialize:function(){
		 this.set("outline",this.initOutline());
		 this.set("partners",this.get("partners").split(","));
		 this.set("total_art",this.total_art());
		 this.set("total_cap",this.total_cap());
		 var ca = this.get("create_at");
		 ca = ca.substr(0,19).replace("T","&nbsp;");
		 this.set("create_at",ca);
	},
	clear:function(){
		Backbone.sync("delete",this,{url:"/doc/"+this.attributes._id});
		for(var va in this.views){
			this.views[va].remove();
		}
		
	},
	total_art:function(){
		return this.get('outline').articles.length;
	},
	total_cap:function(){
		var len = this.total_art();
		var c = 0;
		var ol = this.get('outline');
		console.log("ol:"+ol);
		for(var i=0;i<len;i++){
			var va = ol.articles[i];
			c += ol[va].length;
			console.log("va:"+va+"  ol[va].length:"+ol[va]);
		}
		return c;
	},
	initOutline:function(){
		ol = this.get("outline");
		console.log(ol);
		var result = {};
		var atl = result.articles = [];
		var arts = ol.split("@");
		for(var i=0;i<arts.length;i++){
			var a = arts[i].split("#");
			var cs = a[1].split(",");
			atl.push(a[0]);
			result[a[0]] = cs;
		}
		for(var va in result){
			console.log("result:"+va+":"+result[va]);
		}
		return result;
	}
});

	return DocModel;
});
