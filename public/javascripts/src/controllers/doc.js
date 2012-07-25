define([
	'jquery',
	'underscore',
	'backbone',
	'doT',
	'DocView'
],function ($, _, Backbone, doT, DocView ){
	var AppDoc = Backbone.View.extend({
		el:$("#main-left-body ul"),
		initialize:function(){
			var self = this;
			this.collection = doc_sys.docs;
			
			this.collection.fetch({
				success:function(){
					console.log("fetch success");
					
					self.render();
				},
				error:function(){
					console.log("error");
				},
				url:'/docs?user='+doc_sys.login_user
			});
		},
		events: {
			"click .add_art":"showOne",
			"refresh":"showAll"
		},
		render:function(){
			console.log("apparticle render start");
			var self = this;
			_.each(this.collection.models, function (model, index){
				self.showOne(model);
			});
			
		},
		showOne:function(model){
			console.log("showOne is invoked");
			var dView = new DocView({
				model: model
			});
			var d = dView.render();
			$(this.el).append(d.el);
		},
		showAll:function(){
			console.log("showAll is invoked");
			doc_sys.articles.each(this.showOne);
		},
		editArticle:function(){
		}
		
});

	return AppDoc;
});