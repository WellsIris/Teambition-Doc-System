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
		ArticleModel 	  : 'src/models/article',
		ArticleCollection : 'src/collections/article',
		UserView		  : 'src/views/user',
		ArticleView		  : 'src/views/article',
		ItemView		  : 'src/views/item',
		UserController    : 'src/controllers/user',
		ArticleController : 'src/controllers/article',
		UserTemp		  : 'text!../../templates/user/user.html',
		LARTemp			  : 'text!../../templates/user/logandreg.html',
		ArticleTemp 	  : 'text!../../templates/article/article.html',
		CapterTemp		  : 'text!../../templates/article/capter.html',
		EditorTemp		  : 'text!../../templates/article/editor.html',
		NavArtTemp		  : 'text!../../templates/navigation/navigationart.html',
		NavItemTemp		  : 'text!../../templates/navigation/navigationitem.html'
	}
});

require([
    'app'
], function(App){
    App.initialize();
});