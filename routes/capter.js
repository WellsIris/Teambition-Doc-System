
/*
* Article Related Routes.
*/
var models = require('../models'),
	querystring = require("querystring"),
	Article = models.Article,
	Document = models.Document,
	Capter = models.Capter;


exports.add = function(req, res){
	var t = req.param("t");
	var cap = req.param("cap")||"";
	var id = req.param("id");
	res.render('add_cap', {layout:false, name: '撰写章节:'+t,title:t,cap:cap,doc_id:id });
};
exports.editarticle = function(req,res){
	var o = {};
	o.title = req.body.title||"";
	o.category = req.body.category||req.body.title||"";
	o.capter = req.body.capter||"";
	o.index = req.body.index||1;
	o.content = req.body.simple_content||"";
	o.layout = false;
	o._id = req.body.id;
	res.render('edit_page', o);
}
exports.update = function(req,res){
	console.log("update invoked");
	var author = req.param("user");
	var date = Date.now;
	var id = req.body.id;
	var title = req.body.title;
	var index = req.body.index||1;
	var detail_content = req.body.detail_content;
	var simple_content = req.body.simple_content;
	Capter.update({"_id":id},{$set:{
			"title":title,
			"author":author,
			"time":time,
			"index":index,
			"datail_content":detail_content,
			"simple_content":simple_content
		}},false,false);
	res.redirect('/');
}
exports.submit = function(req, res){
	
	var doc_id = req.body.doc_id;
	var title = req.body.title;
	Article.find({"doc_id":doc_id,"title":title},function(err,atl){
		var caps = atl[0].capters;
		var c = findIn(caps,req.body.capter);
		console.log("c:"+c);
		if(c){
			c.title = req.body.capter;
			c.detail_content = req.body.detail_content;
			c.simple_content = req.body.simple_content;
			Article.update({"doc_id":doc_id,"title":title},{$set:{
				"capters":atl[0].capters
			}},false,false);
		}else{
			var c  = new Capter();
			c.title = req.body.capter;
			c.detail_content = req.body.detail_content;
			c.simple_content = req.body.simple_content;
			c.save();
			atl[0].capters.push(c);
			Article.update({"doc_id":doc_id,"title":title},{$set:{
				"capters":atl[0].capters
			}},false,false);
			Document.find({"_id":doc_id},function(err,doc){
				console.log(doc);
				var atls = doc[0].outline.split("@");

				var i=0;
				while(atls[i].split("#")[0] != title){
					i++;
				}
				atls[i] += ","+c.title;
				var atls = atls.join("@");
				console.log("new outline:"+atls);
				
				Document.update({"_id":doc_id},{$set:{
				"outline":atls
				}},false,false);
			});
		}

	});
	function findIn(arr,str){
		var len = arr.length;
		for(var i=0;i<len;i++){
			if(arr[i]["title"] == str){
				return arr[i];
			}
		}
		return false;
	}
	res.redirect('/');
};

exports.del = function(req, res){
	console.log("capter.del is invoked");
	var id=req.body.id||req.params.id;
	var title = req.body.a||req.param("a");
	Capter.remove({"_id":id},function(err){console.log("error:"+err);});
	res.redirect('/');
};

