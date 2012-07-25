define([
	'jquery',
	'underscore',
	'backbone',
	'DocModel'
],function ($,_, Backbone, DocModel){
	var DocCollection = Backbone.Collection.extend({
	    model:DocModel,
		docsperpage:10,
		url:'/docs',
		
	});


	return DocCollection;
});