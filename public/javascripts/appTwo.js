define(function(require, exports, module) {
	require("libs/ace/lib/fixoldbrowsers");
	require("libs/ace/config").init();
	var env = {};
    
    var ace = require("libs/ace/ace");
	var dom = require("libs/ace/lib/dom");
	var net = require("libs/ace/lib/net");

	var event = require("libs/ace/lib/event");
	var theme = require("libs/ace/theme/textmate");
	var EditSession = require("libs/ace/edit_session").EditSession;
	var UndoManager = require("libs/ace/undomanager").UndoManager;

	var vim = require("libs/ace/keyboard/vim").handler;
	var emacs = require("libs/ace/keyboard/emacs").handler;
	var HashHandler = require("libs/ace/keyboard/hash_handler").HashHandler;

	var Renderer = require("libs/ace/virtual_renderer").VirtualRenderer;
	var Editor = require("libs/ace/editor").Editor;
	var MultiSelect = require("libs/ace/multi_select").MultiSelect;
	console.log($("#maineditor")+"maineditor");

	var initialize = function(){
	var editor = ace.edit("maineditor");
	new MultiSelect(editor);
    editor.session.setUndoManager(new UndoManager());
}
   
   return {
   	  initialize:initialize
   }
})