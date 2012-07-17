define([
	'jquery',
	'underscore',
	'backbone',
	'doT',
	'LEES_SHADE',
	'ArticleModel',
	'ArticleCollection',
	//'markitup',
	//'markitupsets',
	'text!../../../templates/article/article.html',
	'text!../../../templates/article/capter.html',
	'text!../../../templates/article/editor.html'
],function ($, _, Backbone, doT,LEES_SHADE,ArticleModel,ArticleCollection,ArticleTemplate, CapterTemplate,EditorTemplate){
	var ArticleView = Backbone.View.extend({
	tagName:"li",
	events:{
		
		"click .delete" : "delete",
		"click .close"  : "clear",
		"click .edit"   : "edit"
	},
	initialize:function(model){
		console.log("articleview initialized");
		var model = model.model;
	
		this.template = doT.template(CapterTemplate);
		$(this.el).addClass("art_content");
		
		this.model.on('change', this.render, this);
		if(!this.model.views){
				this.model.views = {};
			}
			this.model.views.article = this;

	},
	render:function(){
		var self = this;
		self.mo = this.model.toJSON();

		if(doc_sys.login_user!=""){
			self.mo = _.extend(self.mo,{user:doc_sys.login_user});
		}
		if(self.mo.order == 1){
			self._temp = doT.template(ArticleTemplate);
			this._el = document.createElement("li");
			$(this._el).html(self._temp(self.mo));
		}
		var con_arr = self.mo.content.split("##");
		self.mo.content = con_arr[0];

		var list = this.makeNumList(parseInt(con_arr[1]));
		self.mo = _.extend(self.mo,{list:list});
		$(this.el).html(this.template(self.mo));
		


		return this;
	},
	delete:function(){
		console.log("delete invoked."+this.model.get("index"));
		this.model.clear();
	},
	clear:function(){
		console.log("clear invoked."+this.model.get("index"));
		this.remove();
	},
	edit:function(){
		console.log("edit is invoked");
		if(!doc_sys.editTemp){
			doc_sys.editTemp = doT.template(EditorTemplate);
		}
		var d = document.createElement("div");
		$(d).html(doc_sys.editTemp(this.mo));
		$(this.el).append(d);
		$(d).find("form").submit();
		console.log($(d).find("form"));
		console.log("edit end");
	},
	showArticle:function(){
		var self = this;
		console.log("show article is invoked");
		this.tag = $(this.el).find(".art_title");
		this.tag.toggle(function(){
			console.log("slideDown is invoked");
			self.content.slideDown();
		},function(){
			self.content.slideUp();
		});
	},
	makeNumList:function(num){
		var result="" ;
		for(var i=1;i<=num;i++){
			result = result+"<div>"+i+"</div>";
		}
		console.log("result:"+result);
		return result;
	}
});

	return ArticleView;
});