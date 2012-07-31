define([
	'jquery',
	'underscore',
	'backbone',
	'json2',
	'WMD',
	'Showdown',
	'UserModel',
	'DocModel',
	'ArticleModel',
	'DocCollection',
	'ArticleCollection',
	'UserView',
	'DocView',
	'ArticleView',
	'ItemView',
	'UserController',
	'DocController',
	'ArticleController'
], function ($, _, Backbone, json2,WMD,Showdown, UserModel,DocModel, ArticleModel,DocCollection,ArticleCollection,UserView,DocView,ArticleView,ItemView,AppUser,AppDoc,AppArticle){

	
	var setUpOauth = function (){
		$(document).ajaxSend(function(event, xhr, settings) {
			function getCookie(c_name){
				if (document.cookie.length>0)
				{
					c_start=document.cookie.indexOf(c_name + "=")
					if (c_start!=-1)
					{ 
						c_start=c_start + c_name.length+1 
						c_end=document.cookie.indexOf(";",c_start)
						if (c_end==-1) c_end=document.cookie.length
						return unescape(document.cookie.substring(c_start,c_end))
					} 
				}
				return ""
			}
			var header = 'OAuth oauth_consumer_key=BxmnaJMEEPuyDPxFxv,'+ 
						 'oauth_token=' + getCookie("oauth_access_token") + ',' + 
						 'oauth_signature='+ getCookie("oauth_access_signature") + ',' + 
						 'oauth_nonce=' + Math.floor(new Date().getTime()).toString() + ',' + 
						 'oauth_timestamp=' + Math.floor(new Date().getTime()/1000).toString() + ',' +
						 'oauth_signature_method=PLAINTEXT,' + 
						 'oauth_version=1.0 ';
			xhr.setRequestHeader('AUTHORIZATION',header);
		});
	};
 	

	var initialize = function(){
		console.log("app initialize start");
		
		setUpOauth();



		window.doc_sys = {};	
		doc_sys.docCache = [];
			
		function init(){
			
			doc_sys.user = new UserModel;
			doc_sys.docs = new DocCollection;
			
			doc_sys.appuser = new AppUser;
			doc_sys.appdoc = new AppDoc;
			
			doc_sys.atls = new ArticleCollection;

			//doc_sys.apparticle = new AppArticle;
		}
		doc_sys.login_user = "李磊";
		init();
/*
		$.ajax({
					url:'http://api.teambition.com/v2/user/info/',
					type:'get',
					dataType:'JSON',
					success: function (data){
						doc_sys.login_user = data.name||"";
						init();
					},
					error:function(){
						console.log("ajax error");
						doc_sys.login_user = "李磊";
						init();
					}
				});
		
*/
	};

	return {
		initialize: initialize
	};
});
