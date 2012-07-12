$(function(){
	  
    
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