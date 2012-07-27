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
		var partners = self.mo.partners;
		if(this.model.get("founder")==doc_sys.login_user||this.findIn(partners,doc_sys.login_user)){
			this.mana = true;
		}else{
			this.mana = false;
		}

		if(doc_sys.login_user!=""){
			self.mo = _.extend(self.mo,{user:doc_sys.login_user});
		}
		$(this.el).html(this.template(self.mo));
		this.doc_go = $(this.el).find(".doc_go");
		$(this.el).find(".doc-title").click(function(){
			$("#mainMiddle").html("");
			$("#mainRight").html("");
			doc_sys.doc_id = self.model.get("_id");
			doc_sys.outline = self.model.get("outline");
			doc_sys.appatl = new AppArticle;
			self.resize();
			self.showLeft();
		});
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
		if(doc_sys.resize){
			return ;
		}
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
		doc_sys.resize = true;
	},
	showLeft:function(){
		window.doc_sys.tree = {};
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
			var a = this.renderArticle(arts[i],ol[arts[i]],i);
			$("#mainRight").append(a);
		}
		$("#mainRight").animate({"right":0})
					   .addClass("shadow");

		
	},
	renderArticle:function(art,caps,index){
		window.doc_sys.tree[art] = [];
		var out = document.createElement("div");
		$(out).addClass("main-right-out");
		var a = document.createElement("div");
		if(this.mana){
			var tool =this.makeTool(art,this.model.get("_id"),["add","up","down","delete"]);
		}
		$(tool).addClass("main-right-tool");
		var c = document.createElement("div");
		$(c).addClass("clear");
		$(a).attr("index",[index]).addClass("main-right-article").html(art).append(tool).append(c)			
			.hover(function(){
				$(this).css("background","#ddd")
					   .css("color","#333");
				$(tool).css("display","block");
			},function(){
				$(this).css("background","#eee")
					   .css("color","#666");
				$(tool).css("display","none");
			});
		var cs = this.renderCapter(art,caps,index);
		
		$(out).append(a).append(cs);
		
		
		return out;
	},
	renderCapter:function(art,caps,index){
		var len = caps.length;
		var result = document.createElement("div");
		$(result).css("width","100%");
		for(var i=0;i<len;i++){
			var c = document.createElement("div");
			//var text = document.createElement("div");
			//$(text).html(caps[i]).addClass("main-right-capter-text");
			if(this.mana){
				var tool =this.makeTool(art,this.model.get("_id"),["edit","up","down","delete"]);
			}
			$(tool).addClass("main-right-tool");
			var clear = document.createElement("div");
			$(clear).addClass("clear");

			$(c).attr("index",[index,i]).addClass("main-right-capter").html(caps[i]).append(tool).append(clear)
				.hover(function(){
					$(".hoverd").css("background","#eee")
												   .css("color","#aaa")
												   .removeClass("hoverd")
												   .find(".main-right-tool")
												   .css("display","none");
					$(this).css("background","#ddd")
						   .css("color","#666");
					$(this).find(".main-right-tool").css("display","block");
				},function(){
					$(this).css("background","#eee")
						   .css("color","#aaa");
					$(this).find(".main-right-tool").css("display","none");
					
				})
				.click(function(){
					window.doc_sys.isClick = true;
					var index = $(this).attr("index").split(",");
					var as = $(".art_content");
					
					if(!as){
						return ;
					}
					var cs = $(as[index[0]]).find("li");
					
					
					if(!cs){
						return ;
					}

					var tag = cs[index[1]];
					var top = document.documentElement.scrollTop;
					var tag_top = $(tag).offset();
					console.log(top);
					var change = tag_top.top - top;
					var step = change/25;
					var t = setInterval(go,1000/25);
					var frames = 25;
					function go(){
						if(frames<=0){
							clearInterval(t);
							window.doc_sys.isClick = false;
							return ;
						}
						document.documentElement.scrollTop += step;
						frames --;
						
					}
				});

			$(result).append(c);
		}
		return result;
	},
	makeTool:function(art,id,arr){
		var len = arr.length;
		var tool = document.createElement("div");
		for(var i=0;i<len;i++){
			var c = document.createElement("a");
			var type = arr[i];
			$(c).attr("_type",type).addClass("icons_"+type+"_b").addClass("float_l")
				.hover(function(){
					var type = $(this).attr("_type");
					$(this).removeClass("icons_"+type+"_b").addClass("icons_"+type+"_y");
				},function(){
					var type = $(this).attr("_type");
					$(this).removeClass("icons_"+type+"_y").addClass("icons_"+type+"_b");
				});
			if(arr[i] == "add"){
				var href = '/capter/add?t='+art+'&id='+id;
				$(c).attr("href",href);
			}else if(arr[i] == "delete"){
				$(c).click(function(){
					var p = $(this).parent().parent();
					if($(p).hasClass("main-right-article")){

					}else{
						var cap = $(p).html().split("<div")[0];
						var index = $(p).attr("index");
						console.log(index);
						var as = $(".capterList");
						var c = $(as[index[0]]).find("li")[index[1]];
						console.log(c);
						$(as[index[0]]).remove(c);
						$(p).parent().remove(p);
						$.ajax({
							url:'/capter/delete?a='+art+'&id='+id
						});
					}
					
				});
			}

			$(tool).append(c);
		}
		var cl = document.createElement("div");
		$(cl).addClass("clear");
		$(tool).append(cl).css("width",len*16+4);
		return tool;
	},
	findIn:function(arr,str){
		for(var i=0;i<arr.length;i++){
			if(arr[i] == str){
				return true;
			}
		}
		return false;
	}
});

	return DocView;
});