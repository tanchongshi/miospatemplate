/*global define */

define([
    'backbone',
	'marionette',
    'regions/notification',
    'regions/dialog',
	'collections/Nav',
	'views/MenuView',
	'views/Footer'
], function (Backbone, Marionette, NotifyRegion, DialogRegion, Nav, MenuView, Footer) {
	'use strict';
    console.log('main:App => Loading...');
    // 初始化我们应用
	var app = new Marionette.Application();

    // 初始化各个模块使用的model
    app.pages = new Nav([
        {title: '发起运动', name: 'home', active: true, cls: 'clock-o'},
        {title: '寻找运动', name: 'search', cls: 'search'},
        {title: '我', name: 'me', cls: 'user'}
    ]);


    // 初始化我下面两个字栏目
    app.pagesChild = new Nav([
        {title: '我的圈子', name: 'group'},
        {title: '我的活动', name: 'activity'}
    ]);

    // 初始化导航栏
    var menu = new MenuView({collection: app.pages});

    // 初始化index各个dom节点对应的对象
	app.addRegions({
		main: '#main',
		footer: '#footer',
        notification: {
            selector: "#notification",
            regionType: NotifyRegion
        },
        dialog: {
            selector: "#dialog",
            regionType: DialogRegion
        }
	});

    // 给我们应用加入当start时执行的方法
	app.addInitializer(function () {
        app.footer.show(menu); // 先加的模块或者方法首先执行
        this.chevronLeft = $('#chevronLeftId'); //    全局dom
        this.chevronLeftI = this.chevronLeft.find('i'); //    全局dom
        console.log('在应用nitialize:before和after之间执行');
	///app.footer.show(new Footer());
	});

    // 应用启动时 首先执行的方法
    app.on('initialize:before', function(options) {
      console.log('before');
    });

    app.on("initialize:after", function(options){
        console.log('after');
        if (Backbone.history){
            Backbone.history.start();
        }
    });

    app.on('start', function(options) {
      console.log('start');
    });

    // 状态栏切换事件监听
	// app.vent.on('menu:activate', function (activePageModel) {
 //        menu.collection.findWhere({active: true})
 //            .set('active', false);
 //        activePageModel.set('active', true);
 //        menu.render();
	// });

    /**
     * Sample JSON Data
     * app.commands.execute("app:notify", {
     *           type: 'warning'    // Optional. Can be info(default)|danger|success|warning
     *           title: 'Success!', // Optional
     *           description: 'We are going to remove Team state!'
     *       });
     */
    app.commands.setHandler("app:notify", function(jsonData) {
        require(['views/NotificationView'], function(NotifyView) {
            app.notification.show(new NotifyView({
                model: new Backbone.Model(jsonData)
            }));
        });
    });

    /**
     * @example
     * app.commands.execute("app:dialog:simple", {
     *           icon: 'info-sign'    // Optional. default is (glyphicon-)bell
     *           title: 'Dialog title!', // Optional
     *           message: 'The important message for user!'
     *       });
     */
    app.commands.setHandler("app:dialog:simple", function(data) {
        require(['views/DialogView', 'models/Dialog', 'tpl!templates/simpleModal.html'],
            function(DialogView, DialogModel, ModalTpl) {

                app.dialog.show(new DialogView({
                    template: ModalTpl,
                    model: new DialogModel(data)
                }));
            });
    });

    /**
     * @example
     * app.commands.execute("app:dialog:confirm", {
     *           icon: 'info-sign'    // Optional. default is (glyphicon-)bell
     *           title: 'Dialog title!', // Optional
     *           message: 'The important message for user!'
     *           'confirmYes': callbackForYes, // Function to execute of Yes clicked
     *           'confirmNo': callbackForNo, // Function to execute of No clicked
     *       });
     */
    app.commands.setHandler("app:dialog:confirm", function(data) {
        require(['views/DialogView', 'models/Dialog', 'tpl!templates/confirmModal.html'],
            function(DialogView, DialogModel, ModalTpl) {

                app.dialog.show(new DialogView({
                    template: ModalTpl,
                    model: new DialogModel(data),
                    events: {
                        'click .dismiss': 'dismiss',
                        'click .confirm_yes': data.confirmYes,
                        'click .confirm_no': data.confirmNo
                    }
                }));
            });
    });

    // 返回主页
    app.commands.setHandler('app:backHome', function() {
        app.footer.$el.show();
    })

	return window.app = app;
});
