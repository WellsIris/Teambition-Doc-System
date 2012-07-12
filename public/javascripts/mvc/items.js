$(function(){
	window.navigationitem = '<a>{{=it.title}}</a>';


	window.Item = Backbone.Model.extend({
		initialize:function(){

		},
		urlRoot:'/article',
		clear:function(){
			this.view.remove();
		}
	});

	window.ItemList = Backbone.Collection.extend({
		model:Item,
		url:'/articles',
		sort:function(){

		}
	});
    
	window.items = new ItemList;

	window.ItemView = Backbone.View.extend({
		
		events:{

		},
		initialize:function(model){
			if(model.get("capter") == 1){
				this.tagName = "li";
				this.template = doT.template(navigationArt);	
			}else{
				this.tagName = "div";
				this.template = doT.template(navigationitem);
			}
			this.model.on("change",this.render,this);
			this.model.view = this;

		},
		render:function(){
			$(this.el).html(this.template(this.model.toJSON()));
		},
		clear:function(){
			this.remove();
		},
		focus:function(){

		}

	});
});