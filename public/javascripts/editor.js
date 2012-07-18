define(function(require, exports, module) {
	require("ace/lib/fixoldbrowsers");
	require("ace/config").init();
	var env = {};
    
    var ace = require("ace/ace");
	var dom = require("ace/lib/dom");
	var net = require("ace/lib/net");

	var event = require("ace/lib/event");
	var theme = require("ace/theme/textmate");
	var EditSession = require("ace/edit_session").EditSession;
	var UndoManager = require("ace/undomanager").UndoManager;

	var vim = require("ace/keyboard/vim").handler;
	var emacs = require("ace/keyboard/emacs").handler;
	var HashHandler = require("ace/keyboard/hash_handler").HashHandler;

	var Renderer = require("ace/virtual_renderer").VirtualRenderer;
	var Editor = require("ace/editor").Editor;
	var MultiSelect = require("ace/multi_select").MultiSelect;

	var jsMode = require("ace/mode/javascript").Mode;


	var editor = ace.edit("maineditor");
    editor.getSession().setMode(new jsMode());
    var doc = editor.getSession().getDocument();
    require("libs/jquery/jquery-min");
    var obj = $("#maineditor");


    

    function resize(){
    	var HEIGHT = 17;
    	var len = doc.getLength();
        var hei = len*HEIGHT+20<200?200:len*HEIGHT+20;
    	obj.height(hei);
    	editor.resize();
    }

    var m = setInterval(resize,1000);

    var form = $("form");
    form.submit(function(){
    	clearInterval(m);
    	var ta = $("#content");
    	var con = $(".ace_text-layer");
        var lines = doc.getAllLines();
    	var len = doc.getLength();
    	var text = con.html();
    	ta.html(text+"##"+len+"@@"+lines.join("\n"));

        console.log(ta.html());
    	$("#maineditor").remove();

    }); 

     
});