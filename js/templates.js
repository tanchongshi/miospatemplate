/*global define */

define(function (require) {
	'use strict';

	return {
        pages : {
          home: require('tpl!templates/pages/home.html'),
          search: require('tpl!templates/pages/search.html'),
          group: require('tpl!templates/pages/group.html'),
          activity: require('tpl!templates/pages/activity.html')
        },
        page: require('tpl!templates/page.html'),
        menuItem: require('tpl!templates/menuItem.html'),
		footer: require('tpl!templates/footer.html')
	};
});

