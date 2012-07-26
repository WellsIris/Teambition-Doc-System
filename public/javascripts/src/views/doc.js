define([
	'jquery',
	'underscore',
	'backbone',
	'doT',
	'LEES_SHADE',
	'ArticleModel',
	'ArticleCollection',
	'ArticleController',
	'text!../../../templates/article/doc.html',
	'text!../../../templates/article/doc-create.html'
],function ($, _, Backbone, doT,LEES_SHADE,ArticleModel,ArticleCollection,AppArticle,DocTemplate,DocCreateTemp){
	var DocView = Backbone.View.extend({
	tagName:"li",
	events:{
		
		"click .delete" : "delete",
		"click .close"  : "clear",
		"click .edit"   : "edit"
	},
	initialize:function(model){
		console.log("articleview initialized");
		var model = model.model;
	
		this.template = doT.template(DocTemplate);
		
		this.model.on('change', this.render, this);
		if(!this.model.views){
				this.model.views = {};
			}
			this.model.views.doc = this;
		

	},
	render:function(){
		var self = this;
		self.mo = this.model.toJSON();
		self.mo.partners = self.mo.partners.join(",");
		if(doc_sys.login_user!=""){
			self.mo = _.extend(self.mo,{user:doc_sys.login_user});
		}
		$(this.el).html(this.template(self.mo));
		this.doc_go = $(this.el).find(".doc_go");
		this.go(this.doc_go);
		return this;
	},
	create:function(){
		
		
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
	go:function(ob){
		var self = this;
		$(ob).click(function(){
			doc_sys.doc_id = self.model.get("_id");
			doc_sys.outline = self.model.get("outline");
			doc_sys.appatl = new AppArticle;
			self.resize();
			self.showLeft();

		});
	},
	resize:function(){
		var width = document.documentElement.clientWidth;
		var height = document.documentElement.clientHeight;
		var self = this;
		var end_w = width*0.2;
		$("#mainLeft").animate({"margin-left":0,width:end_w})
		.removeClass("main").addClass("left shadow");
		$(".doc_go").css("display","none");
		$(".doc_detail").css("margin","5px auto");
		$("#main-left-header ul").css("display","none");
		$("span.time").css("display","none");
		$("#body_go").css({display:"block",position:"fixed",top:height/2-8
							,left:end_w-8,"z-index":100});

	},
	showLeft:function(){
		var ol = this.model.get("outline");
		var arts = ol.articles;
		var len = arts.length;
		var width = document.documentElement.clientWidth;
		var self = this;
		var end_w = width*0.2;
		var href = "/article/add?user="+doc_sys.login_user+"&id="+doc_sys.doc_id;
		$("#mainRight").html('<div class="h20"></div><div class="btn_b headBtn_l"><a href='+href+'>创建新文章</a></div>')
					   .css("right",-end_w);
		for(var i=0;i<len;i++){
			var a = this.renderArticle(arts[i],ol[arts[i]]);
			$("#mainRight").append(a);
		}
		$("#mainRight").animate({"right":0})
					   .addClass("shadow");

	},
	renderArticle:function(art,caps){
		var out = document.createElement("div");
		$(out).addClass("main-right-out");
		var a = document.createElement("div");
		$(a).html(art).addClass("main-right-article")
			.hover(function(){
				$(this).css("background","#ddd")
					   .css("color","#333");
			},function(){
				$(this).css("background","#eee")
					   .css("color","#666");
			});

		var len = caps.length;
		$(out).append(a);
		for(var i=0;i<len;i++){
			var c = document.createElement("div");
			$(c).addClass("main-right-capter").html(caps[i])
				.hover(function(){
					$(this).css("background","#ddd")
						   .css("color","#666");
				},function(){
					$(this).css("background","#eee")
						   .css("color","#aaa");
				});
			$(out).append(c);
		}
		
		return out;
	}
});

	return DocView;
});