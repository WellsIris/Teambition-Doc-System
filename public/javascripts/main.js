require.config({
	paths: {
		jquery       : '/javascripts/libs/jquery/jquery-min',
		underscore   : '/javascripts/libs/underscore/underscore-min',
		backbone     : '/javascripts/libs/backbone/backbone-optamd3-min',
		text         : '/javascripts/libs/require/text',
		doT          : '/javascripts/libs/doT/doT',
		prettify     : '/javascripts/libs/prettify/prettify',
		markitup     : '/javascripts/libs/markitup/jquery.markitup.js',
		markitupsets : '/javascripts/libs/markitup/sets/default/set.js',
		json2		 : '/javascripts/libs/json2/json2',
		LEES_SHADE   : '/javascripts/libs/LEES_SHADE/LEES_SHADE'
	}
});

require([
    'app'
], function(App){
    App.initialize();
});