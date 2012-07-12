
$(function(){
window.user_content = '<div class="float_l" id="header_left"><a>Teambition.com</a></div><div class="float_l" id="header_mid"><input type="text" name="search" id="search" class="float_l"  /><button  class="float_l" >Search</button></div><div class="float_r" id="header_right">{{ if(it.user){ }}欢迎您，{{=it.user}}!<a href="/quit">退出登陆</a><a id="addarticlebutton">撰写新文档</a>  {{ } }}{{ else { }} <a id="login">登陆</a><a id="regis">注册<a/>{{ } }}</div>';
window.logandreg = '<div class="cleaner h10"></div><div class="pad30"><h3>{{=it.title }}</h3><form method="post" action="/login"><label class="float_l pad5">用户名:</label><input type="text" name="user" class="shade_dialog_input" /><br><label class="float_l pad5">密码&nbsp;&nbsp;&nbsp;:</label><input type="password" name="pass" class="required shade_dialog_input" /><input type="submit"  value="{{=it.name}}" class="submit_btn"/></form></div>';

window.User = Backbone.Model.extend({
	urlRoot:'/user',
	initialize:function(){}
});
window.user = new User;

window.UserView = Backbone.View.extend({
	tagName:"div",
	events:{

	},
	initialize:function(model){
		this.model = model;
		this.template = doT.template(user_content);
		this.model.on('change', this.render);
		this.model.view = this;
	},
	render:function(){
		$(this.el).html(this.template(this.model.toJSON()));
		return this;
	}
});
window.appUser = Backbone.View.extend({
	el:$("#header"),
	initialize:function(){
		this.model = window.user;
		this.model.set("user","");
		if(window.login_user != ""){
			console.log("ini:window.login_user:"+window.login_user);
			this.model.set("user",window.login_user)
		}
		this.render(this.model);

		

		if(this.model.get("user") == ""){
			console.log("this.model.user is null");
			_.bindAll(this, 'login', 'regis','getData');
			this.temp = doT.template(logandreg);
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
			if(!window.temp_add){
				console.log(addArticle);
			window.temp_add = doT.template(addArticle);
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
            "html":temp_add({h1:"撰写新文档",title:"文档标题",categroy:"文档所属栏目",capter:"章节标题，文档不分章节此项可略。",index:"章节索引",content:"文档正文，请使用markdown语法撰写"}),
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
        var view = new UserView(model);
		$(this.el).append(view.render().el);
	},
	login:function(){
		console.log("login is invoked");
		console.log(this);
		var data = this.getData("logsub");
		Backbone.sync("create",null,{url:"/login?user="+data.user+"&pass="+data.pass});
		//?user="+data.user+"&pass="+data.pass
	},
	regis:function(){
		console.log("register is invoked");
	},
	getData:function(id){
		console.log(id);
		var prev = $("#"+id);
		console.log(prev);
		var c = 2;
		var o = {user:"",pass:""};
		var a =[];
		prev = prev.prev();
		console.log(prev);
		while(c>0){
			if(prev.hasClass("shade_dialog_input")){
				a.push(prev.val());
				c--;
			}
			console.log(prev);
			prev = prev.prev();
		}
		o.user= a[1];
		o.pass=a[0];
		console.log(o);
		return o;
	}
});
window.au = new appUser;
});