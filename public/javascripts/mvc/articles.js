
$(function(){

//templates

window.article_content = '<article class="doc"><div class="article_tools"><a class="icons_close"></a><a class="icons_email"></a></div><h2 class="art_title">{{=it.title}}</h2><p class="art_author">author:{{=it.author}}&nbsp;&nbsp;创建时间:{{=it.create_at}}</p><ul id="art_{{=it.title}}" class="capterList"><li class="art_content"><h4><a id="{{=it.capter}}">{{=it.capter}}</a></h4><div class="article_tools">{{ if(it.author==it.user){ }}<a class="icons_delete"></a><a class="icons_edit"></a>{{ } }}</div>{{=it.content}}</li></ul></article>';
window.capter_content = '<h4 ><a id="{{=it.capter}}">{{=it.capter}}</a></h4><div class="article_tools">{{ if(it.author==it.user){ }}<a class="icons_delete"></a><a class="icons_edit"></a>{{ } }}</div>{{=it.content}}';
window.navigationart = '<h2 class="_blue">{{=it.title}}</h2><ul id="{{=it.title}}"><li class="navigationitem"><a href="#{{=it.capter}}">--{{=it.capter}}</a></li></ul>';
window.navigationitem = '<a href="#{{=it.capter}}">--{{=it.capter}}</a>';

window.addArticle = '<div class="commonbg"><h1>{{=it.h1}}</h1><section id="editor"><form action="/article/add" method="post"><input type="text" name="title" value="{{=it.title}}" placeholder="文档标题" /><input type="text" name="categroy" placeholder="文档所属栏目" value="{{=it.categroy}}" /><input type="text" name="capter" placeholder="章节标题，文档不分章节此项可略。" value="{{=it.capter}}" /><input type="text" name="index" placeholder="章节索引(数字，如1，2，3)，文档不分章节此项可略。" value="{{=it.index}}" /><textarea id="maineditor" type="text" name="content" placeholder="文档正文，请使用markdown语法撰写" /><button type="submit"><span>确认无误，提交文档</span></button></form></section></div>';

window.login_user = $("#hidden div").html()||"";

window.Article = Backbone.Model.extend({
	initialize:function(){
		 this.on("destroy",function(){console.log("destroy is on");});
	},
	defaults:{
		title:"no tittle",
		category:"none",
		content:"nothing...",
		author:"someone",
	},
	urlRoot:'/article',
	clear:function(){
		Backbone.sync("delete",this,{url:"/article/"+this.attributes._id});
		this.view.remove();
	}
});

window.ArticleList = Backbone.Collection.extend({
	model:Article,
	articlesperpage:10,
	url:'/articles',
	total:function(){
		return this.length;
	},
	sortByIndex:function(){
		console.log("sortByIndex is invoked");
		var m = this.models;
		var len =m.length;
		var c = 0;
		var map = {};

		for(var i=0;i<len;i++){
			var title = m[i].get("title");
			var index = parseInt(m[i].get("index"))-1;
			if(!map[title]){
				map[title] = new Array("a"+c++);
				map[title][index] = m[i];
			}
			else{
				map[title][index] = m[i];
			}
		}

		var result = [];
		for(var va in map){
			result = result.concat(map[va]);
		}

		this.models = result;
		return result;
	}
});

window.articles = new ArticleList;

window.ArticleView = Backbone.View.extend({
	tagName:"li",
	events:{
		
		"click .icons_delete" : "delete",
		"click .icons_close"  : "clear"
	},
	initialize:function(model){
		var model = model.model;
		if(parseInt(model.get("index")) == 1){
				this.template =doT.template(article_content);	
			}else{
				this.template = doT.template(capter_content);
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
			window.temp_add = doT.template(addArticle);
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
		console.log("delete invoked.");
		this.model.clear();
	},
	clear:function(){
		console.log("clear invoked.");
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

window.ItemView = Backbone.View.extend({
		tagName:"li",
		events:{
			"click":"show"
		},
		initialize:function(model){
			model = model.model;
			if(parseInt(model.get("index")) == 1){
				this.template = doT.template(navigationart);	
			}else{
				this.template = doT.template(navigationitem);
				$(this.el).addClass("navigationitem");
			}
			
			console.log(this.el);
			this.model.on("change",this.render,this);
			this.model.view = this;

		},
		render:function(){
			$(this.el).html(this.template(this.model.toJSON()));

			if(!$(this.el).hasClass("navigationitem")){
				$(this.el).find("h2").toggle(function(){
					$(this).next().slideUp();
				},function(){
					$(this).next().slideDown();
				});
			}

			

			return this;
		},
		clear:function(){
			this.remove();
		},
		show:function(){
			$("#"+this.model.get("capter")).parent().parent().parent().show();
		}

});

window.appView = Backbone.View.extend({
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
window.app = new appView;



});