require.config({
	paths: {
		jquery       : '/javascripts/libs/jquery/jquery-min',
		text         : '/javascripts/libs/require/text',
		doT          : '/javascripts/libs/doT/doT',
		jqueryui     : '/javascripts/libs/jqueryui-amd/jqueryui'
	}
});

require([
	'jquery',
	'doT',
	'text!/templates/autocomplete/teamitem.html',
	'jqueryui/autocomplete'
], function ($, doT, TeamItemTemplate){

	var valueStatus = {
		email     :false,
		password1 :false,
		password2 :false
	};

	var team_info = {
		team_id   :0,
		team_name :'',
		type      :'',
	};

	var teamitem_tmpl = doT.template(TeamItemTemplate);

	String.prototype.getBytes = function() {   
		return this.replace(/[^\x00-\xff]/g,"**").length;  
	};

	var validateEmail = function (email) { 
		var reg = /^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/;
		return reg.test(email);
	};    

	

	

	var valueValidate = {
		
		emailCheck: function (){
			var email = $('#emailinput').val();

			if(validateEmail(email)){
				$('#emailinputwrapper').children('.typetag').detach();
				$('#emailinputwrapper').siblings('.inputlabel').text('W').css('color','green');

				valueStatus.email = true;

			}else{
				$('#emailinputwrapper').children('.typetag').detach();
				$('#emailinputwrapper').siblings('.inputlabel').text('%').css('color','red');
				$('#emailinputwrapper').append('<div class="typetag">请检查邮箱</div>');

				valueStatus.email = false;

			}
		},

		passwordLengthCheck: function (){
			var password1 = $('#password1').val();
			if(password1.length<6){
				$('#password1wrapper').children('.typetag').detach();
				$('#password1wrapper').siblings('.inputlabel').text('U').css('color','red');
				$('#password1wrapper').append('<div class="typetag">密码过短</div>');

				valueStatus.password1 = false;

			}else{
				$('#password1wrapper').children('.typetag').detach();
				$('#password1wrapper').siblings('.inputlabel').text('W').css('color','green');

				valueStatus.password1 = true;

			}
		},

		passwordMatchCheck: function (){
			var password1 = $('#password1').val();
			var password2 = $('#password2').val();
			if(password1.length>=6){
				if(password1!=password2 ){
					$('#password2wrapper').children('.typetag').detach();
					$('#password2wrapper').siblings('.inputlabel').text('U').css('color','red');
					$('#password2wrapper').append('<div class="typetag">密码不匹配</div>');

					valueStatus.password2 = false;

				}else{
					$('#password2wrapper').children('.typetag').detach();
					$('#password2wrapper').siblings('.inputlabel').text('W').css('color','green');

					valueStatus.password2 = true;

				}
			}
		}

	}

	

	$('#emailinput').blur(function (){
		$('#emailinput').unbind('blur');
		valueValidate.emailCheck();
		setInterval(function(){
			valueValidate.emailCheck();
		},500);
	});

	

	$('#password1').blur(function (){
		$('#password1').unbind('blur');
		valueValidate.passwordLengthCheck();
		setInterval(function(){
			valueValidate.passwordLengthCheck();
		},500);
	});

	$('#password2').blur(function (){
		$('#password2').unbind('blur');
		valueValidate.passwordMatchCheck();
		setInterval(function(){
			valueValidate.passwordMatchCheck();
		},500);
	});

	$("#termchecker").toggle(function(){
		$(this).addClass("checked");	
	},function(){
		$(this).removeClass("checked");
	});

	var validateData = function (){

		
		valueValidate.emailCheck();
		valueValidate.passwordLengthCheck();
		valueValidate.passwordMatchCheck();
		

		if(valueStatus.email&&valueStatus.password1&&valueStatus.password2){
			return true;
		}else{
			return false;
		}

	};

	$('#signupbutton').click(function(){
		var user_data = {
			email     : $('#emailinput').val(),
			password1 : $('#password1').val(),
			password2 : $('#password2').val()
		};

		if(validateData()){
				$.ajax({
					url:'http://api.teambition.com/api/v2/registration/team/',
					type:'POST',
					dataType:'JSON',
					data:{
						email     : user_data.email,
						password1 : user_data.password1,
						password2 : user_data.password2
					},
					success: function (data){
						if(data.success){
							window.location = 'http://localhost:3000/user/'+user_data.name;
						}
					}
				});
		}		
		
	});
});