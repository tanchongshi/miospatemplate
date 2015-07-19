/*global define */

define([
	'marionette',
	'templates',
    'underscore',
    'Iscroll'
], function (Marionette, templates, _, iScroll) {
	'use strict';

	return Marionette.ItemView.extend({
		template: templates.page,

        ui: {
            header: 'h2'
        },

        events: {
            'click #notify' : 'notify',
            'click #modal' : 'showSampleModal',
            'click #confirm' : 'showSampleConfirm'
        },

        onBeforeRender: function(){
            console.log('sfsaf', this.model.get('name'));
            this.model.set('content', _.result(templates.pages, this.model.get('name')))
        },

        onRender: function() {
            this.ui.header.remove();
        },
        onShow: function() {
            var myScroll;

            function loaded () {
                //myScroll = new IScroll('#wrapper', { mouseWheel: true, tap: true });

                // document.getElementById('me').addEventListener('tap', function () {
                //     this.style.background = !this.style.background ? '#a00' : '';
                // }, false);
            }
            loaded();
            document.addEventListener('touchmove', function (e) { e.preventDefault(); }, false);
        },

        // Event handlers
        notify: function(e) {
            app.commands.execute('app:notify', {
                type: 'warning',
                title: 'A Warning',
                description: 'Something important happened! Let the user know it.'
            });
        },
        showSampleModal: function(e) {
            app.commands.execute("app:dialog:simple", {
                title: 'Dialog title!', // Optional
                message: 'The important message for user!'
            });
        },

        showSampleConfirm: function(e) {
            app.commands.execute("app:dialog:confirm", {
                icon: 'info-sign',
                title: 'Action confirmation!',
                message: 'Are you sure to perform this serious action?',
                confirmNo: function() {
                    app.commands.execute('app:notify', {
                        type: 'warning',
                        title: 'You\'ve choosed No',
                        description: 'No problem. No action was taken.'
                    }
                )},
                confirmYes: function() {
                    app.commands.execute('app:notify', {
                        type: 'success',
                        title: 'You\'ve choosed Yes',
                        description: 'You\'ve agreed! Thanks :)'
                    }
                )}
            });
        }

	});
});
