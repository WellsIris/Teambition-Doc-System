define([
	'jquery',
	'underscore',
	'backbone',
	'doT',
	'views/article',
	'views/item'
],function ($, _, Backbone, doT, ArticleView , ItemView ){
	var AppView = Backbone.View.extend({
		el:$("#content_ul"),
		_el:$("#navigationlist"),
		initialize:function(){
			var self = this;
			this.collection = window.articles;
			window.articles.bind("sync",this.showAll,this);
			window.articles.bind("reset",this.showAll,this);
			this.collection.fetch({
				success:function(){
					console.log("fetch success");
					var that = self.collection.models;
					self.collection.sortByIndex();
					self.render();
				},
				error:function(){
					console.log("error");
				}
			});
		},
		events: {
			"click .add_art":"showOne",
			"refresh":"showAll"
		},
		render:function(){
			console.log("apparticle render start");
			var self = this;
			_.each(this.collection.models, function (model, index){
				self.showOne(model);
			});
			var content = $(this.el).find("h2");
			var len = content.length;
			for(var i=0;i<len;i++){
				$(content[i]).nextAll(".capterList").hide();
				$(content[i]).toggle(function(){
					if(!this.tag){
						this.tag = $(this).nextAll(".capterList");
					}
					this.tag.slideDown();
					
				},function(){
					if(!this.tag){
						this.tag = $(this).nextAll(".capterList");
					}
					this.tag.slideUp();
				});
			}
		},
		showOne:function(model){
			console.log("showOne is invoked");
			var aView = new ArticleView({
				model: model
			});
			var iView = new ItemView({
				model:model
			});
			var a = aView.render();
			var i = iView.render();
			if(parseInt(a.model.get("index"))==1){
				$(this.el).append(a.el);
			}else{
				$("#art_"+a.model.get("title")).append(a.el);
			}
			if(parseInt(i.model.get("index"))==1){
				$(this._el).append(i.el);
			}else{
				$("#"+i.model.get("title")).append(i.el);
			}
			
		},
		showAll:function(){
			console.log("showAll is invoked");
			articles.each(this.showOne);
		},
		editArticle:function(){
		}
		
});

	return AppView;
});