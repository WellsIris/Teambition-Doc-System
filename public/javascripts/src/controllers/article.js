define([
	'jquery',
	'underscore',
	'backbone',
	'doT',
	'ArticleModel',
	'ArticleView',
	'ItemView'
],function ($, _, Backbone, doT,ArticleModel ,ArticleView , ItemView ){
	var AppView = Backbone.View.extend({
		el:$("#mainMiddle>ul"),
		initialize:function(){
			console.log("article init");
			var self = this;
			this.collection = doc_sys.atls;
			
			this.collection.fetch({
				success:function(){
					console.log("fetch success");
					var that = self.collection.models;
					console.log(that);
					self.collection.sortByIndex();
					console.log("sorted");
					self.render();
				},
				error:function(){
					console.log("error");
				},
				url:'/articles?doc_id='+doc_sys.doc_id
			});
		

			console.log("init end");
		},
		render:function(){
			console.log("apparticle render start");
			var self = this;
			console.log(this.collection);
			_.each(this.collection.models, function (model, index){
				self.showOne(model);
			});

			var cs = $(".doc h2");
			
			var len = cs.length;
			var oss = [];
			for(var i=0;i<len;i++){
				var h = $(cs[i]).offset().top-25;
				oss.push(h);
			}
			console.log(oss);
			window.onscroll = function(){
				if(window.doc_sys.isClick){
					return ;
				}
				var len = oss.length -1;
				var top = document.documentElement.scrollTop;
				
				var items = $(".main-right-capter");
				for(var i=0;i<len;i++){
					if(top>=oss[i]&&top<oss[i+1]){
						if(items[i+1]){
							$(items[i+1]).css("background","#eee")
										 .css("color","#aaa")
										 .removeClass("hoverd")
									 	 .find(".main-right-tool")
									 	 .css("display","none");
							
						}
						if(items[i-1]){
							$(items[i-1]).css("background","#eee")
										 .css("color","#aaa")
										 .removeClass("hoverd")
									 	 .find(".main-right-tool")
									 	 .css("display","none");
						}
						$(items[i]).css("background","#ddd")
								   .css("color","#666")
								   .addClass("hoverd")
							 	   .find(".main-right-tool")
							 	   .css("display","block");
						return ;
					}

				}
			}

			
		},
		showOne:function(model){
			console.log("showOne is invoked");
			var aView = new ArticleView({
				model: model
			});
			
			var a = aView.render();
			
			$(this.el).append(a.el);
			
		},
		showAll:function(){
			console.log("showAll is invoked");
			doc_sys.atls.each(this.showOne);
		},
		editArticle:function(){
		}
		
});

	return AppView;
});