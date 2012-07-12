define([
	'jquery',
	'underscore',
	'backbone',
	'doT',
	'LEES_SHADE',
	'models/article',
	'collections/article',
	//'markitup',
	//'markitupsets',
	'text!../../../templates/article/article.html',
	'text!../../../templates/article/capter.html',
	//'text!../../../templates/article/editor.html'
],function ($, _, Backbone, doT,LEES_SHADE,ArticleModel,ArticleCollection,ArticleTemplate, CapterTemplate){
	var ArticleView = Backbone.View.extend({
	tagName:"li",
	events:{
		
		"click .icons_delete" : "delete",
		"click .icons_close"  : "clear"
	},
	initialize:function(model){
		console.log(model);
		var model = model.model;
		if(parseInt(model.get("index")) == 1){
				this.template =doT.template(ArticleTemplate);	
			}else{
				this.template = doT.template(CapterTemplate);
				$(this.el).addClass("art_content");
			}
		this.model.on('change', this.render, this);
		this.model.view = this;

	},
	render:function(){
		var mo = this.model.toJSON();
		if(window.login_user!=""){
			var mo = _.extend(mo,{user:window.login_user});
			console.log("mo:"+mo);
		}
		$(this.el).html(this.template(mo));
		var icons_edit =  $(this.el).find(".icons_edit");
		if(!window.temp_add){
			window.temp_add = doT.template(EditorTemplate);
			}
		if(icons_edit){
			var edit = new LEES_SHADE();
			console.log(mo.content);
			edit.blind($("body"),{
            "evtobj":icons_edit,
	        "don":true,
			"evttype":"click",
			"sani":true,
			"dani":true,
			"dhei":"auto",
			"dwid":800,
            "html":window.temp_add({h1:"编辑文档",title:mo.title||" ",categroy:mo.categroy||" ",capter:mo.capter||" ",index:mo.index||1}),
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