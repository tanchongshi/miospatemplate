/*global define */

define([
	'app',
    'views/HomeView',
    'views/PageView'
], function (app, HomeView, PageView) {
	'use strict';

	return {
		showPage: function (pageName) {
            if(pageName == null) pageName = 'home';

            console.log('Router => Showing page: ' + pageName);
			var pageModel = app.pages.findWhere({name: pageName});
            document.title = pageName;

            //app.vent.trigger('menu:activate', pageModel); //状态栏切换
            app.chevronLeftI.removeClass('fa-chevron-left');

            if(pageName == 'home') { //发起运动
                app.commands.execute('app:backHome');
                app.main.show(new HomeView({model: pageModel}));
            } else { //寻找运动
                app.main.show(new PageView({model: pageModel}));
            } 

            if(pageName == 'search') {
                console.log('Example of on demand module loading..');
                require(['modules/Example'], function(Example) {
                    Example.start();
                });
            }
		},
        hello: function() {
            console.log('In route /hi');
        },
        showPageChild: function(pageName) {
            app.chevronLeftI.addClass('fa-chevron-left');
            app.chevronLeft.attr('href', '#');
            document.title = pageName;
            var pageModel = app.pagesChild.findWhere({name: pageName});
            app.main.show(new PageView({model: pageModel}));
            app.footer.$el.hide();
        }
	};
});
