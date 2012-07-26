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
    console.log("editor start");

    var modeMap = {
        'javascript' : 'ace/mode/javascript',
        'css'        : 'ace/mode/css',
        'java'       : 'ace/mode/java',
        'perl'       : 'ace/mode/perl',
        'php'        : 'ace/mode/php',
        'html'       : 'ace/mode/html',
        'ruby'       : 'ace/mode/ruby',
        'python'     : 'ace/mode/python',
        'xml'        : 'ace/mode/xml'
    };
    var modes = {};
    modes.javascript = require("ace/mode/javascript").Mode;
    modes.css = require("ace/mode/css").Mode;
    modes.java = require("ace/mode/java").Mode;
    modes.perl = require("ace/mode/perl").Mode;
    modes.php = require("ace/mode/php").Mode;
    modes.html = require("ace/mode/html").Mode;
    modes.ruby = require("ace/mode/ruby").Mode;
    modes.python = require("ace/mode/python").Mode;
    modes.xml = require("ace/mode/xml").Mode;

    var counter = 0;

    var editors = {},
        docs = {},
        intervals = {},
        langs=[];

    $(".ace_print_margin").css("visibility","hidden");
     


    require("libs/jquery/jquery-min");
    var obj = $("#maineditor");

    
    $("input").focus(function(){
        $(this).css({"border-color":"#aaa","background-color":"#F7F7F7"});
    });
    $("input").blur(function(){
        $(this).css({"border-color":"#ccc","background-color":"white"});
    });

    $("#fortext").click(function(){
        var p = editor.getSession().getSelection().getCursor();
        
        doc.insert(p,"$text$ ");
        editor.focus();
        var w = {};
        w.row = p.row;
        w.column = p.column+8;
        doc.insert(w," $/text$");
    
    });

  
    //for codeBtn behavior
    $("#codeBtn").hover(function(){
        $("#modeSelection").css("display","block");
        $(this).css({"border":"1px solid #aaa","background":"#f7f7f7","border-radius":"5px"});
    },function(){
        $("#modeSelection").css("display","none");
        $(this).css({"border":"none","background":"none","border-radius":"none"});

    });

    // for modeBtn behavior
    $(".modeBtn").hover(function(){
        $(this).css("color","#666");
    },function(){
        $(this).css("color","#999");
    }).click(function(){
        var c = counter++;
        var e = document.createElement("div");
        var _e = document.createElement("div");
        var ta = document.createElement("textarea");
        $(e).attr("id","editor_"+c).addClass("maineditor");
        $(_e).addClass("_maineditor");
        $(ta).addClass("text_part");
        $("#contentArea").append(e).append(_e).append(ta);
        var edi = editors["editor_"+c] = ace.edit("editor_"+c);
        docs["editor_"+c] = edi.getSession().getDocument();
        var modeType = $(this).html().toString();
        edi.getSession().setMode(new modes[modeType]());
        langs.push(modeType);
        intervals["editor_"+c] = setInterval(function(){
            resize(e,_e);
        },1000);
        
    });

    // resize the editor to make all content visible
    function resize(obj,_obj){
            var id = $(obj).attr("id");
            var HEIGHT = 17;
            var len = docs[id].getLength();
            var hei = len*HEIGHT+20<200?200:len*HEIGHT+20;
            $(obj).height(hei);
            $(_obj).height(hei);
            editors[id].resize();
    }
    

    // when srcoll , make sure that code button is visible
    window.onscroll = function(){
        console.log(document.body.scrollTop);
        if(document.body.scrollTop >= 400){
            var l = $("#editor").offset().left+$("#editor").width();
            $("#codeBtn").css("position","fixed").css("left",l);

        }
        if(document.body.scrollTop < 400){
            $("#codeBtn").css('position','absolute').css('left','auto');
        }
    }

    // for edit page , if maineditor is already existed ,
    // render them
   if($(".maineditor")[0]){
        console.log("maineditor existed");
        var es = $(".maineditor");
        var len = $(".maineditor").len;
        counter = len;
        for(var i=0;i<len;i++){
            var modeType = $(es[i]).attr("mode");
            var editor = editors["editor_"+i] = ace.edit(es[i]);
            docs["editor_"+i] = edi.getSession().getDocument();
            editor.getSession().setMode(new modes[modeType]());
        }
   }

    // for submit
    var form = $("form");
    form.submit(function(){
        for(var va in intervals){
            clearInterval(intervals[va]);
        }
    	var code = $(".ace_text-layer");
        var cs = [] ;
        for(var i=0;i<counter;i++){
            cs.push($(code[i]).html());
        }
        var codes = cs.join("$code$");

        var lines = [];
        for(var va in docs){
            var len = docs[va].getLength();
            lines.push(docs[va].getAllLines().join("\n")+"$length$"+len);
        }
        var lines = lines.join("$line$");
       
        var text = $(".text_part");
        var texts = [];
        for(var i=0;i<counter+1;i++){
            texts.push($(text[i]).val());
        }
        texts = texts.join("$text$");

        langs = langs.join("$lang$");

        var ta = $("#detail_content");
    	ta.html([texts,codes].join("$part$"));
        var _ta = $("#simple_content");
        _ta.html([lines,langs].join("$part$"));
        
        console.log(ta.html());
        console.log(_ta.html());
    	$("#contentArea").remove();
    }); 

     
});