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
				$("#addArt").click(function(){
					var out = document.createElement("div");
					$(out).addClass("articleArea");
					var input = document.createElement("input");
					$(input).attr("type","text").addClass("input_article").attr("placeholder","文章名");
					var add = document.createElement("div");
					var add_icon = document.createElement("div");
					$(add_icon).addClass("icons_add float_l");
					var add_text = document.createElement("div");
					$(add_text).addClass("float_l").html("添加章节");
					$(add).addClass("btn_a right_tools").addClass("addcap");
					

					var caps = document.createElement("div");
					$(caps).addClass("capters");
					$(add).click(function(){
						var input = document.createElement("input");
						$(input).attr("type","text").addClass("input_capter").attr("placeholder","章节名");
						$(caps).append(input);
					});
					$(add).append(add_icon).append(add_text);
					$(out).append(input).append(add).append(caps);
					$("#outline").append(out);
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

					var arts = $(".input_article");
					var a_text = [];
					for(var i=0;i<arts.length;i++){
						var a  = $(arts[i]).val();
						var c = getData(arts[i]);
						a_text.push([a,c].join("#"));
					}
					a_text = a_text.join("@");

					$("input[name='partners']").val(p_text);
					$("input[name='outline']").val(a_text);

					function getData(obj){
						var caps = $(obj).next().next().children();

						var text = [];
						for(var i=0;i<caps.length;i++){
							var a = $(caps[i]).val();
							if(a != ""){
								text.push(a); 
							}
						}
						text = text.join(",");
						return text;
					}

				});
			}
		}
});

	return AppUser;
});