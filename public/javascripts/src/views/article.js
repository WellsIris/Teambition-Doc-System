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
		self.mo.create_at=self.mo.create_at.substr(0,19).replace("T","&nbsp;");
		if(doc_sys.login_user!=""){
			self.mo = _.extend(self.mo,{user:doc_sys.login_user});
		}
		if(self.mo.order == 1){
			self._temp = doT.template(ArticleTemplate);
			this._el = document.createElement("li");
			$(this._el).html(self._temp(self.mo));
		}
		var data = this.data = self.analysis(self.mo.content,self.mo.simple_content);
		var result = [];
		var len = data.texts.length;
		result.push('<div class="cap_text">'+data.texts[0]+'</div>');
		for(var i=0;i<len-1;i++){
			var list = self.makeNumList(data.lens[i]);
			var code = '<div class="cap_code"><div class="numList">'+list+'</div>'
					  +'<div class="lineList">'+data.codes[i]+'</div>'
					  +'<div class="clear"></div></div>';
			var text = '<div class="cap_text">'+data.texts[i]+'</div>';
			result.push(code);
			result.push(text);
		}

		result = result.join("");
		console.log(result);
		self.mo = _.extend(self.mo,{result:result});
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