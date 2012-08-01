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
	'text!../../../templates/article/doc-create.html',
	'text!../../../templates/article/atl_edit.html'
],function ($, _, Backbone, doT,LEES_SHADE,ArticleModel,ArticleCollection,AppArticle,DocTemplate,DocCreateTemp,AtlEditTemp){
	var DocView = Backbone.View.extend({
	tagName:"li",
		
		"click .delete" : "delete",
		"click .close"  : "clear",
	events:{
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
			$("#mainMiddle>ul").html("");
			$("#mainRight").html("");
			doc_sys.doc_id = self.model.get("_id");
			if(doc_sys.appatl){
				console.log("appatl existed");
				self.app = doc_sys.appatl;
				doc_sys.appatl.initialize();
			}else{console.log("appatl not existed");
				self.app =doc_sys.appatl = new AppArticle();
			}
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
			if(doc_sys.appatl){
				self.app = doc_sys.appatl;
				doc_sys.appatl.initialize();
			}else{
				self.app =doc_sys.appatl = new AppArticle;
			}
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
		var len = this.model.get("atls");
		var width = document.documentElement.clientWidth;
		var self = this;
		var end_w = width*0.2;
		var href = "/article/add?user="+doc_sys.login_user+"&id="+doc_sys.doc_id;
		$("#mainRight").html('<div class="h20"></div><div class="btn_b headBtn_l" id="createAtl"><a>创建新文章</a></div>')
					   .css("right",-end_w);
		var createAtl = new LEES_SHADE();
		this._template = doT.template(AtlEditTemp);
		var html = this._template({header:"撰写新文章"
								   ,author:self.mo.user
								   ,doc_id:self.mo._id
								   ,content:""
								   ,id:""});

		createAtl.blind($("body"),{
			evtobj:$("#createAtl"),
			don:true,
			dwid:"auto",
			dhei:"auto",
			html:html,
			callprev:function(bg,dia){
				$(dia).find("#button-bar").append($("#wmd-button-bar").removeClass("hidden"));
				$(dia).find("#textarea").append($("#wmd-input").removeClass("hidden").val(""));
				$(dia).find("#preview").append($("#wmd-preview").removeClass("hidden"));
				$(dia).css({"min-width":document.documentElement.clientWidth,
							"min-height":document.documentElement.clientHeight,
							
							"left":0,"top":0,"border":"none"});

			},
			afterevt:function(bg,dia){
				$(dia).find("input[name='title']").focus();
				$(dia).find("#submit").click(function(){
					var that = self;
					var inputs = $(dia).find("input");
					var len = inputs.length;
					var result = [];
					for(var i=0;i<len;i++){
						result.push($(inputs[i]).val());
					}
					var title = result[0];
					var author = result[1];
					var doc_id = result[2];
					var id = result[3];
					var content = $(dia).find("textarea").val();
					var l = content.indexOf("\n");
					var es = escape(content);
					var html = $("#wmd-preview").html();
					console.log(typeof html);
					console.log("html:"+html);
					var html = escape(html);
					$.ajax({
						url:"/article/add?t="+title+"&a="+author+"&d="+doc_id+"&i="+id+"&c="+es+"&h="+html,
						success:function(data){
							console.log("success");
							$(bg).hide();
							$(dia).hide();
							if(this.len){
								this.len++;
							}else{
								this.len = that.model.get("atls")+1;
							}
							$("#mainMiddle>ul").html("");
							$("#mainRight").find(".main-right-out").remove();
							that.app.initialize();
							that.initArticle(this.len);
						},
						error:function(){
							console.log("error");
							
						}
					});
				});
			}
		});
		
		var tree = this.initArticle(len);
		//console.log(tree);

		
	},
	ajax:function(){

	},
	initArticle:function(len){
		//console.log(1);
		var self = this;
		if($(".art_title").length<len){
			//console.log($(".art_title").length);
			setTimeout(function(){
				return self.initArticle(len);
			},500);
			return "null";
		}
		var titles = $(".art_title");
		var caps = $(".doc");
		var ts = [];
		var tree = {};
		var ts_len = titles.length
		for(var i=0;i<ts_len;i++){
			ts.push($(titles[i]).html());
			var cs = [];
			var c_ts = $(caps[i]).find("h2");
			var cs_len = c_ts.length;
			for(var j=0;j<cs_len;j++){
				cs.push($(c_ts[j]).html());
			}
			tree[ts[i]] = cs;
		}
		console.log("tree:"+tree);
		var index=0;
		for(var va in tree){
			var out = this.renderArticle(va,tree[va],index++);
			$("#mainRight").append(out);
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
			var tool =this.makeTool(art,this.model.get("_id"),["edit","up","down","delete"]);
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
		console.log(cs);
		$(out).append(a).append(cs);
		
		
		return out;
	},
	renderCapter:function(art,caps,index){
		var len = caps.length;
		var result = document.createElement("div");
		$(result).css("width","100%");
		for(var i=0;i<len;i++){
			var c = document.createElement("div");
			
			$(c).attr("index",[index,i]).addClass("main-right-capter").html(caps[i])
				.hover(function(){
					$(".hoverd").css("background","#eee")
												   .css("color","#aaa")
												   .removeClass("hoverd");
					$(this).css("background","#ddd")
						   .css("color","#666");
					
				},function(){
					$(this).css("background","#eee")
						   .css("color","#aaa");
					
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
					var tag_top = $(tag).offset()||{top:top,left:0};
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
		var self = this;
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
				console.log("is add");
				var href = '/capter/add?t='+art+'&id='+id;
				$(c).attr("href",href);
			}else if(arr[i] == "delete"){
				$(c).click(function(){
					var p = $(this).parent().parent();
					var index = $(p).attr("index");
					var id = doc_sys.idsArr[index];
					
					$.ajax({
						url:'/article/delete?id='+id,
						success:function(){
							$($(".art_content")[index]).remove();
							$(p).remove();
						},
						error:function(){
							console.log("error");
						}
					});
				});
			}else if(arr[i] == "edit"){
				$(c).click(function(){
					var p = $(this).parent().parent();
					var index = $(p).attr("index");
					var tlt = doc_sys.tltsArr[index];
					$("input[name='title']").val(tlt);
					console.log(doc_sys.atls[index]);
					$("#wmd-input").val(doc_sys.atlsArr[index]);
					$("input[name='id']").val(doc_sys.idsArr[index]);
					$("#createAtl").click();
					$(".commonbg h1").html("编辑文章");

				});				
				//var index = $(p).attr("index")[2];
				//console.log("index:"+index);
				//$(c).attr("href","/capter/edit?index="+index+"&a="+art+"&id="+id);
			}else if(arr[i]=="up"){

			}else if(arr[i]=="down"){

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