
$(function(){

window.Article = Backbone.Model.extend({
	initialize:function(){
		 
	},
	defaults:{
		tittle:"no tittle",
		category:"none",
		content:"nothing...",
		author:"someone"
	},
	urlRoot:'/article',
	clear:function(){
		this.destory();
		this.view.remove();
	}
});

window.ArticleList = Backbone.Collection.extend({
	model:Article,
	articlesperpage:10,
	url:'/articles',
	total:function(){
		return this.length;
	}
});

window.articles = new ArticleList;

window.ArticleView = Backbone.View.extend({
	tagname:"li",
	template:_.template($("#article-template").html()),
	events:{
		"click .art_tittle"  : "showArticle",
		"click .icons_close" : "clear",
	},
	initialize:function(){
		_.bindAll(this, 'render', 'clear');
		this.model.bind('change', this.render);
		this.model.view = this;
	},
	render:function(){
		console.log(this.model.toJSON());
		$(this.el).html(this.template(this.model.toJSON()));
		console.log(this.el);
		return this;
	},
	clear:function(){
		this.model.destroy();
	},
	showArticle:function(){
		this.tag = this.el.$(".art_content");
		$(this.el).toggle(function(){
			$(this.tag).slideDown();
		},function(){
			$(this.tag).slideUp();
		});
	}
});

window.appView = Backbone.View.extend({
	el:$("#content"),

	initialize:function(){
		var self = this;
		this.collection = window.articles;
		window.articles.bind("sync",this.showAll,this);
		window.articles.bind("reset",this.showAll,this);
		 //console.log("appView initialize");
		this.collection.fetch({
			success:function(){
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
		var self = this;
		_.each(this.collection.models, function (model, index){
			self.showOne(model);
		});
	},
	showOne:function(model){
		console.log("showOne is invoked");
		var view = new ArticleView({
			model: model
		});
		$(this.el).append(view.render().el);
	},
	showAll:function(){
		console.log("showAll is invoked");
		articles.each(this.showOne);
	},
	editArticle:function(){
	}
	
});
window.app = new appView;


window.User = Backbone.Model.extend({
	urlRoot:'/user',
	initialize:function(){}
});



});