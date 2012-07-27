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
	
		this.template = doT.template(ArticleTemplate);
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
		self.mo.create_at=self.mo.create_at.substr(0,19).replace("T","&nbsp;");
		
		
		$(this.el).html(this.template(this.mo));
		
		var c = $(this.el).find("ul.capterList");
		var caps = this.mo.capters;
		var len = caps.length;
		for(var i=0;i<len;i++){
			$(c).append(this.makeCap(caps[i]));
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
	makeCap:function(Cap){
		var t = document.createElement("h4");
		var t_a = document.createElement("a");
		$(t_a).attr("id",Cap.title).html(Cap.title);
		$(t).append(t_a);
		var l = document.createElement("li");
		var c = document.createElement("div");
		$(c).addClass("article_content");
		$(l).append(t).append(c);

		if(Cap.detail_content == ""||typeof Cap.detail_content == "undefined"){
			var id = this.model.get("doc_id");
			var title = this.model.get("title");
			var cap = Cap.title;
			var href = '/capter/add?t='+title+'&id='+id+'&cap='+cap;
			var btn = document.createElement("a");
			$(btn).attr("href",href).addClass("btn_a").css("color","#666");
			var icon = document.createElement("div");
			$(icon).addClass("icons_add_b float_l");
			var text = document.createElement("div");
			$(text).addClass("float_l").html("点此编辑该章节");
			var clear = document.createElement("div");
			$(clear).addClass("clear");
			$(btn).append(icon).append(text).append(clear);
			$(c).append(btn);
		}else{
			var src = this.analysis(Cap.detail_content,Cap.simple_content);
			var texts = src.texts;
			var codes = src.codes;
			var lens = src.lens;
			var len = codes.length;
			for(var i=0;i<len;i++){
				$(c).append(this.makeText(texts[i]))
					.append(this.makeCode(codes[i],lens[i]));
			}
			$(c).append(this.makeText(texts[len]));
		}
		return l;
	},
	makeText:function(text){
		var t = document.createElement("div");
		$(t).addClass("cap_text").html(text);
		return t;
	},
	makeCode:function(code,num){
		if(code == ""){
			return "";
		}
		var c = document.createElement("div");
		$(c).addClass("cap_code");
		var nl = document.createElement("div");
		$(nl).addClass("numList").html(this.makeNumList(num));
		var ll = document.createElement("div");
		$(ll).addClass("lineList").html(code);
		var clear = document.createElement("div");
		$(clear).addClass("clear");
		$(c).append(nl).append(ll).append(clear);

		return c;
	},
	makeNumList:function(num){
		console.log("num:"+num);
		var result="" ;
		for(var i=1;i<=num;i++){
			result = result+"<div>"+i+"</div>";
		}
		console.log("result:"+result);
		return result;
	},
	analysis:function(con,sim){
		
		var parts = con.split("$part$");
		console.log(con);
		var texts = parts[0].split("$text$");
		var codes = parts[1].split("$code$");

		var parts = sim.split("$part$");
		var lines = parts[0].split("$line$");
		var langs = parts[1].split("$lang$");
		var lines_len = lines.length;
		var _lines = [];
		var lens = [];
		for(var i=0;i<lines_len;i++){
			var line = lines[i].split("$length$");
			_lines.push(line[0]);
			lens.push(line[1]);
		}
		lines = _lines;

		return {
			texts : texts,
			codes : codes,
			lines : lines,
			langs : langs,
			lens  : lens
		}

	}
});

	return ArticleView;
});