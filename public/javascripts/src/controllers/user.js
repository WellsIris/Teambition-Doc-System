define([
	'jquery',
	'underscore',
	'backbone',
	'doT',
	'LEES_SHADE',
	'text!../../../templates/article/editor.html',
	'text!../../../templates/article/doc-create.html',
	'UserModel',
	'UserView'
],function ($,_, Backbone,doT,LEES_SHADE, EditorTemplate,DocCreateTemp ,UserModel,UserView){
	var AppUser = Backbone.View.extend({
		el:$("#main-left-header"),
		initialize:function(){
			console.log("appuser is initialized");
			var self = this;
			this.model = doc_sys.user;
			this.model.set("user","");
			if(doc_sys.login_user != ""){
				self.model.set("user",doc_sys.login_user);
			}
			self.render(self.model);

			
		},
		
		render:function(model){
			console.log("appuser is rendered");
	        var view = new UserView(model);
			$(this.el).append(view.render().el);

			var dcb = $("#docCreateBtn");
			if(doc_sys.login_user != ""){
				console.log("user existed and dcb is "+$(dcb).html());
				var aaa = doT.template(DocCreateTemp)({founder:doc_sys.login_user});
				console.log(aaa);
				var dc = new LEES_SHADE();
				dc.blind($("body"),{
					evtobj:dcb,
					don:true,
					dwid:500,
					dhei:600,
					html:aaa,
					callprev:function(b,d){
						$(d).css("overflow","scroll");
					}
				});

				$("#addPartner").click(function(){
					var input = document.createElement("input");
					$(input).attr("type","text").addClass("input_partner");
					$("#partners").prepend(input);
				});
				

				$("#docCreateSubmit").click(function(){
					$("#doc-create-form").submit();
				});

				$("#doc-create-form").submit(function(){
					var partners = $(".input_partner");
					var p_text = [];
					for(var i=0;i<partners.length;i++){
						var a = $(partners[i]).val();
						if(a !=""){
							p_text.push(a);
						}
					}
					p_text = p_text.join(",");

					

					$("input[name='partners']").val(p_text);
					
				});
			}
		}
});

	return AppUser;
});