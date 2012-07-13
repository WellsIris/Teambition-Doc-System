define([
	'jquery',
	'underscore',
	'backbone',
	'doT',
	'LEES_SHADE',
	'text!../../../templates/user/logandreg.html',
	'text!../../../templates/article/editor.html',
	'UserModel',
	'UserView'
],function ($,_, Backbone,doT,LEES_SHADE,logandregTemplate, EditorTemplate ,UserModel,UserView){
	var AppUser = Backbone.View.extend({
		el:$("#header"),
		initialize:function(){
			console.log("appuser is initialized");
			this.model = doc_sys.user;
			this.model.set("user","");
			if(doc_sys.login_user != ""){
					this.model.set("user",doc_sys.login_user);
			}
			this.render(this.model);

			

			if(this.model.get("user") == ""){
				_.bindAll(this, 'login', 'regis','getData');
				this.temp = doT.template(logandregTemplate);
				var lg = new LEES_SHADE();
				lg.blind($("body"),{
	            "evtobj":$("#login"),
		        "don":true,
				"evttype":"click",
				"sani":true,
				"dani":true,
	            "html":this.temp({name:"登陆",title:"欢迎登陆",id:"logsub"})
				});
				var rg = new LEES_SHADE();
				rg.blind($("body"),{
	           "evtobj":$("#regis"),
		        "don":true,
				"evttype":"click",
				"sani":true,
				"dani":true,
	            "html":this.temp({name:"注册",title:"十秒注册",id:"regsub"})
				});
				$("#logsub").click(this.login);
				$("#regsub").click(this.regis);
			}else{
				console.log("user existed.");
				if(!doc_sys.temp_add){
				doc_sys.temp_add = doT.template(EditorTemplate);
				}
				var add = new LEES_SHADE();
				add.blind($("body"),{
	            "evtobj":$("#addarticlebutton"),
		        "don":true,
				"evttype":"click",
				"sani":true,
				"dani":true,
				"dhei":"auto",
				"dwid":800,
	            "html":doc_sys.temp_add({h1:"撰写新文档",title:"文档标题",categroy:"文档所属栏目",capter:"章节标题，文档不分章节此项可略。",index:"章节索引",content:"文档正文，请使用markdown语法撰写"}),
	            "afterevt":function(bg,dia){
	            	$(dia).find("input").one("focus",function(){
	            		$(this).val("");
	            	});
	            }
				});

			}
		},
		events:{
			"click #logsub":"login",
			"click #regsub":"regis"
		},
		render:function(model){
			console.log("appuser is rendered");
	        var view = new UserView(model);
			$(this.el).append(view.render().el);
		},
		login:function(){
			console.log("login is invoked");
			var data = this.getData("logsub");
			Backbone.sync("create",null,{url:"/login?user="+data.user+"&pass="+data.pass});
			//?user="+data.user+"&pass="+data.pass
		},
		regis:function(){
			console.log("register is invoked");
		},
		getData:function(id){
			var prev = $("#"+id);
			var c = 2;
			var o = {user:"",pass:""};
			var a =[];
			prev = prev.prev();
			while(c>0){
				if(prev.hasClass("shade_dialog_input")){
					a.push(prev.val());
					c--;
				}
				prev = prev.prev();
			}
			o.user= a[1];
			o.pass=a[0];
			return o;
		}
});

	return AppUser;
});