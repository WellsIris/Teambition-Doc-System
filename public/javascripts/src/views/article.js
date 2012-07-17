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
		
		"click .icons_delete" : "delete",
		"click .icons_close"  : "clear"
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
		var mo = this.model.toJSON();
		if(doc_sys.login_user!=""){
			var mo = _.extend(mo,{user:doc_sys.login_user});
		}
		if(mo.order == 1){
			self._temp = doT.template(ArticleTemplate);
			this._el = document.createElement("li");
			$(this._el).html(self._temp(mo));
		}
		$(this.el).html(this.template(mo));
		var icons_edit =  $(this.el).find(".icons_edit");
		if(!doc_sys.temp_add){
			doc_sys.temp_add = doT.template(EditorTemplate);
			}
		if(icons_edit){
			var edit = new LEES_SHADE();
			edit.blind($("body"),{
            "evtobj":icons_edit,
	        "don":true,
			"evttype":"click",
			"sani":true,
			"dani":true,
			"dhei":"auto",
			"dwid":800,
            "html":doc_sys.temp_add({h1:"编辑文档",title:mo.title||" ",categroy:mo.categroy||" ",capter:mo.capter||" ",index:mo.index||1}),
            "afterevt":function(bg,dia){

            	$(dia).find("textarea").focus().val(mo.content);
            
            }
			});
		}
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
	}
});

	return ArticleView;
});