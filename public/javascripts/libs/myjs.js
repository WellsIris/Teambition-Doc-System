$(function(){
	  var aaa = "<div class='cleaner h10'></div><div class='pad30'><h3>��ӭ��¼</h3><form name='login' action='/login' method='post'><label class='float_l pad5'>�û�����</label><input type='text' name='user' class='required shade_dialog_input' /><br><label class='float_l pad5'>����&nbsp;&nbsp;&nbsp;��</label><input type='password' name='pass' class='required shade_dialog_input' /><input type='submit' name='loginsub' value='ȷ��' class='submit_btn' /><a>�������룿</a></form></div>";
	var bbb = "<div class='cleaner h10'></div><div class='pad30'><h3>ʮ��ע��</h3><form name='login' action='/register' method='post'><label class='float_l pad5'>�û�����</label><input type='text' name='user' class='required shade_dialog_input' /><br><label class='float_l pad5'>����&nbsp;&nbsp;&nbsp;��</label><input type='password' name='pass' class='required shade_dialog_input' /><input type='submit' name='loginsub' value='ȷ��' class='submit_btn' /></form></div>";
   var lg = new LEES_SHADE();
  
  lg.blind($("body"),{
           "evtobj":$("#login"),
	        "don":true,
			"evttype":"click",
			"sani":true,
			"dani":true,
            "html":aaa
			});
	
	 var rg = new LEES_SHADE();
  
     rg.blind($("body"),{
           "evtobj":$("#regis"),
	        "don":true,
			"evttype":"click",
			"sani":true,
			"dani":true,
            "html":bbb
			});
	 $(".art_content").hide();
	$(".art_tittle").toggle(function(){
			if(!this.tag){
				var d = this.nextSibling;
			    while(!$(d).hasClass("art_content")){
					 d = d.nextSibling;
					}	
				
				this.tag = d;
			}
			
			$(this.tag).slideDown();
			
			},function(){
			if(!this.tag){
				var d = this.nextSibling;
			    while(d.nodetype != 1){
					 d = d.nextSibling;
					}	
				alert($(d).html());
				this.tag = d;
			}
			$(this.tag).slideUp();
			
			});
	});