define([
	'jquery',
	'underscore',
	'backbone',
	'doT',
	'ArticleCollection',
	'text!../../../templates/navigation/navigationart.html',
	'text!../../../templates/navigation/navigationitem.html'
],function ($, _, Backbone, doT,ArticleCollection, NavArtTemplate,NavItemTemplate){
	var ItemView = Backbone.View.extend({
		tagName:"li",
		events:{
			"click":"show"
		},
		initialize:function(model){
			model = model.model;
			if(parseInt(model.get("order")) == 1){
				this.template = doT.template(NavArtTemplate);	
			}else{
				this.template = doT.template(NavItemTemplate);
				$(this.el).addClass("navigationitem");
			}
			
			this.model.on("change",this.render,this);
			if(!this.model.views){
				this.model.views = {};
			}
			this.model.views.item = this;
			

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

	return ItemView;
});