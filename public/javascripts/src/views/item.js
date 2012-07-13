define([
	'jquery',
	'underscore',
	'backbone',
	'doT',
	'collections/article',
	'text!../../../templates/navigation/navigationart.html',
	'text!../../../templates/navigation/navigationitem.html'
],function ($, _, Backbone, doT,ArticleCollection, NavArtTemplate,NavItemTemplate){
	window.ItemView = Backbone.View.extend({
		tagName:"li",
		events:{
			"click":"show"
		},
		initialize:function(model){
			model = model.model;
			if(parseInt(model.get("index")) == 1){
				this.template = doT.template(NavArtTemplate);	
			}else{
				this.template = doT.template(NavItemTemplate);
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

	return ItemView;
});