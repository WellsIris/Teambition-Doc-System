require.config({
	paths: {
		jquery       	  : 'libs/jquery/jquery-min',
		underscore   	  : 'libs/underscore/underscore-min',
		backbone     	  : 'libs/backbone/backbone-optamd3-min',
		text         	  : 'libs/require/text',
		doT          	  : 'libs/doT/doT',
		prettify     	  : 'libs/prettify/prettify',
		markitup     	  : 'libs/markitup/jquery.markitup.js',
		markitupsets 	  : 'libs/markitup/sets/default/set.js',
		json2		 	  : 'libs/json2/json2',
		LEES_SHADE   	  : 'libs/LEES_SHADE/LEES_SHADE',
		UserModel	 	  : 'src/models/user',
		DocModel		  : 'src/models/doc',
		ArticleModel 	  : 'src/models/article',
		DocCollection	  : 'src/collections/doc',
		ArticleCollection : 'src/collections/article',
		UserView		  : 'src/views/user',
		DocView			  : 'src/views/doc',
		ArticleView		  : 'src/views/article',
		CapterView		  : 'src/views/capter',
		ItemView		  : 'src/views/item',
		UserController    : 'src/controllers/user',
		DocController	  : 'src/controllers/doc',
		ArticleController : 'src/controllers/article',
		WMD				  : 'libs/wmd/wmd',
		Showdown		  : 'libs/wmd/showdown',
		Ace 			  : 'ace',
		JsMode			  : 'libs/ace/mode/javascript',
		Fixold			  : 'libs/ace/lib/fixoldbrowsers',
		Dom				  : 'libs/ace/lib/dom',
		Event			  : 'libs/ace/lib/event',
		Editor 			  : 'libs/ace/editor',
		EditSession       : 'libs/ace/edit_session',
		UndoManager		  : 'libs/ace/undomanager',
		VirtualRenderer   : 'libs/ace/virtual_renderer',
		MultiSelect	      : 'libs/ace/muti_select',
		WorkerClient	  : 'libs/ace/worker/worker_client',
		HashHandler		  : 'libs/ace/keyboard/hash_handler',
		StateHandler	  : 'libs/ace/keyboard/state_handler',
		Placeholder		  : 'libs/ace/placeholder',
		Config 			  : 'libs/ace/config',
		TextMate		  : 'libs/ace/theme/textmate',
		UserTemp		  : 'text!../../templates/user/user.html',
		LARTemp			  : 'text!../../templates/user/logandreg.html',
		DocTemp			  : 'text!../../templates/article/doc.html',
		ArticleTemp 	  : 'text!../../templates/article/article.html',
		CapterTemp		  : 'text!../../templates/article/capter.html',
		EditorTemp		  : 'text!../../templates/article/editor.html',
		NavArtTemp		  : 'text!../../templates/navigation/navigationart.html',
		NavItemTemp		  : 'text!../../templates/navigation/navigationitem.html',

	}
});

require([
    'app'
], function(App){
	console.log("main end");
    App.initialize();
});
