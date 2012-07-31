/*

*/

define([
'jquery'
],function($){
	function LEES_SHADE(u){
	     this.u = u;
	}
	LEES_SHADE.lcs = ["#fef1ba","#e3fba7","#ffe9e1","#d0edfb","#fff1b6","#d9e9f8","#ede6d6"];
	LEES_SHADE.dcs = ["#fad682","#c7ef60","#f9cdbd","#abdcf4","#f4e192","#b6d5f3","#f5e2b8"];
	LEES_SHADE.PAGE_W = $("html")[0].scrollWidth;
	LEES_SHADE.PAGE_H = $("html")[0].scrollHeight;
	LEES_SHADE.CLIENT_W = document.documentElement.clientWidth;
	LEES_SHADE.CLIENT_H = document.documentElement.clientHeight;
	LEES_SHADE.isArray = function(obj) {
							return Object.prototype.toString.call(obj) === '[object Array]';
	                   } 
	LEES_SHADE.toJquery = function(obj){
		                         var o;
			  					 if(typeof obj == "string"){ o = $("#"+obj);}
			 					 else if(typeof obj =="object"&&typeof obj[0] =="object"){ o = obj;}
			 					 else if(typeof obj =="object"&&typeof obj[0] =="undefined") { o = $(obj);}
			  					 else {o = null;}
			  					 return o;
						 }
	LEES_SHADE.prototype.d = {
		            "evttype":"click",
					"parentobj":$("body"),
					"evtobj":$("body"),
			        "swid":LEES_SHADE.PAGE_W,
					"shei":LEES_SHADE.PAGE_H,
					"sopc":0.7, 
					"scol":"#000",
					"sleft":0,
					"stop":0,
					"sani":false,
					"don":false,
					"dwid":300,
					"dhei":200,
					"dcol":"#fff",
					"dani":false,
					"html":""
					
		         }

	LEES_SHADE.prototype.blind = function(arg,jo){
		                            if(LEES_SHADE.isArray(arg)||arg.length>1){
										var len = arg.length;
										if(jo){
										    var ja = [];
										    for(var va in jo){
											    if(LEES_SHADE.isArray(jo[va])){
													    var l = jo[va].length;
													     l = l>len?len:l;
														for(var i=0;i<l;i++){
															    if(typeof ja[i] == "undefined"){ja[i] = {};}
															    ja[i][va] = jo[va][i];
															}
												}
												else {
												    for(var i=0;i<len;i++){
														if(typeof ja[i] == "undefined"){ja[i] = {};}
													    ja[i][va] = jo[va];	
													}	
												}
											}
									
										    for(var i=0;i<len;i++){
											       this.blind(arg[i],ja[i]);
											   }
									    }
									    else{
										    for(var i=0;i<len;i++){
											       this.blind(arg[i]);
											   }
										
								        }
									}//end if arr
								   else {
				   							var o = LEES_SHADE.toJquery(arguments[0]);
											var d = {};
											if(!jo){var jo ={};}
											if(!this.u){this.u={};}
											//if(jo.callprev){jo.callprev();}
				  						   if(o&&o[0] != $("body")[0]){
											  var padH = parseInt(o.css("padding-top"))+parseInt(o.css("padding-bottom"));
											  var padW = parseInt(o.css("padding-left"))+parseInt(o.css("padding-right"));
				 					         d.swid = o.width()+padW||o.attr("width")+padW||300;
										     d.shei = o.height()+padH||o.attr("height")+padH||200;
										     if(o.css("position") == "static"){o.css("position","relative");}
				 					       }
									   d.parentobj = o||LEES_SHADE.toJquery(this.u.parentobj)||LEES_SHADE.toJquery(this.d.parentobj);
									   d.evttype = jo.evttype||this.u.evttype||this.d.evttype;
									   d.evtobj = LEES_SHADE.toJquery(jo.evtobj)||o||LEES_SHADE.toJquery(this.u.evtobj)
									   ||LEES_SHADE.toJquery(this.u.parentobj)||LEES_SHADE.toJquery(this.d.evtobj)||LEES_SHADE.toJquery(this.d.parentobj);
									   d.swid = jo.swid||d.swid||this.u.swid||this.d.swid;
									   d.shei = jo.shei||d.shei||this.u.shei||this.d.shei;
				 					   d.sopc = jo.sopc||this.u.sopc||this.d.sopc;
				 					   d.scol = jo.scol||this.u.scol||this.d.scol;
				 					   d.sleft = jo.sleft||this.u.sleft||this.d.sleft;
				 					   d.stop = jo.stop||this.u.stop||this.d.stop;
				 					   d.sani = jo.sani||this.u.sani||this.d.sani;
				 					   d.html = jo.html||this.u.html||this.d.html;
									   d.callprev = jo.callprev||this.u.callprev||this.d.callprev||function(){};
									   d.beforeevt = jo.beforeevt||this.u.beforeevt||this.d.beforeevt||function(){};
									   d.afterevt = jo.afterevt||this.u.afterevt||this.d.afterevt||function(){};
				 					   if((typeof jo.don != "undefined"&&jo.don)||(typeof jo.don == "undefined"&&this.u.don)
										   ||(typeof jo.don == "undefined"&&typeof this.u.don == "undefined"&&this.d.don)){
				   						      d.don = true;
											 d.dwid = jo.dwid||this.u.dwid||this.d.dwid;
											 d.dhei = jo.dhei||this.u.dhei||this.d.dhei;
											 d.dcol = jo.dcol||this.u.dcol||this.d.dcol;
											 d.dani = jo.dani||this.u.dani||this.d.dani;
				   						}
										else{d.don = false;}
										var bg = document.createElement("div");

										$(bg).css("position","absolute").css("top",d.stop).css("left",d.sleft).css("width",d.swid)
										.css("height",d.shei).css("opacity",d.sopc).css("filter","alpha(opacity:"+d.sopc*100+")")
										.css("background",d.scol).css("z-index",199);
										
										
										d.parentobj.append(bg);
										$(bg).hide();
										
										if(d.don){
										var dia = document.createElement("div");
										$(dia).html(d.html);
										$(dia).css({width:d.dwid,height:d.dhei,background:d.dcol,border:"5px solid #ccc","z-index":200});
										if(d.parentobj[0] == $('body')[0]){
										$(dia).css("position","fixed").css("top",LEES_SHADE.CLIENT_H/2-d.dhei/2).css("left",LEES_SHADE.CLIENT_W/2-d.dwid/2);
										}
										else {
										$(dia).css("position","absolute").css("top",d.shei/2+d.parentobj.scrollTop()-d.dhei/2)
										.css("left",d.swid/2+d.parentobj.scrollLeft()-d.dwid/2);
										}
										d.parentobj.append(dia);
										$(dia).hide();
										}//end if(d.don)
										
										
										
										function close(){
														$(bg).hide();
														if(dia){$(dia).hide();}
										}
										//function cp(){if(jo.callprev){jo.callprev(arguments[0],arguments[1]);}}
										function resize(){
										    	if(d.parentobj[0] == $('body')[0]){
													  $(bg).css("height",$("html")[0].scrollHeight).css("width",$("html")[0].scrollWidth);
													  if(d.don){
												            $(dia).css("top",document.documentElement.clientHeight/2-d.dhei/2)
															      .css("left",document.documentElement.clientWidth/2-d.dwid/2);	
												      }
												}
												
									    }
										
										if(d.evttype == "click"){
											var closebtn = document.createElement("div");
											$(closebtn).css({width:66,height:22,background:"url(../images/closelabel.gif)",
															position:"absolute",right:0,top:0,color:"red",cursor:"pointer"									
															});
											
											if(dia){$(dia).append(closebtn);}
											  d.callprev(bg,dia);
											if(d.sani){
												  d.evtobj.click(function(){
														//d.beforeevt(bg,dia);
														d.beforeevt.call(this,bg,dia);
														resize();
														$(bg).slideDown(300,function(){
															  if(dia&&d.dani){$(dia).slideDown(300);}
															  else if(dia) {$(dia).show();}
															  else {}
														});
												        d.afterevt.call(this,bg,dia);
												  });
											}
											else { 
												  d.evtobj.click(function(){
															  d.beforeevt.call(this,bg,dia);
															  resize();		  
														      $(bg).show();
															  if(dia&&d.dani){$(dia).slideDown(300);}
															  else if(dia) {$(dia).show();}
															  else {}
														      d.afterevt.call(this,bg,dia);
												  
												  });
											}
											$(closebtn).click(function(){
														close();
														});
											$(bg).click(function(){
														close();
														});
										}//end if(click)
										else if(d.evttype == "hover"){
											  if(d.don){$(dia).css("border","none");}
											   d.callprev(bg,dia);
											  if(d.sani){
													d.evtobj.hover(function(){
														d.beforeevt.call(this,bg,dia);
														$(bg).slideDown(300,function(){
															  if(dia&&d.dani){$(dia).slideDown(300);}
															  else if(dia){$(dia).show();}
															  else {}
														});
													},function(){
														d.afterevt.call(this,bg,dia);
														var t = setTimeout(close,300);
													});
											  }
											  else { 
												   d.evtobj.hover(function(){
														d.beforeevt.call(this,bg,dia);
														$(bg).show();
															  if(dia&&d.dani){$(dia).slideDown(300);}
															  else if(dia){$(dia).show();}
															  else {}
													
													},function(){
														d.afterevt.call(this,bg,dia);
														if(dia&&d.dani){setTimeout(close,300);}
														else{close();}
													});
											  }
										}
										else {alert("evttype error");}
									 }//end else
								
		                       }//end function
		         return LEES_SHADE;
	});
























