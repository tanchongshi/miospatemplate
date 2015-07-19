/*global define */

define([
	'marionette',
	'templates',
    'models/Page',
    'views/PageView'
], function (Marionette, templates, Page, PageView) {
	'use strict';

	return Marionette.ItemView.extend({
		template: templates.menuItem,
        tagName: 'li',
        model: Page,

		ui: {
			link: 'a'
		},

		events: {
			// 'click a': 'activateMenu'
            'click #u-me-id': 'activateToggle',
            'click #u-me-toggle-id': 'hideToggle'
		},
        modelEvents: {
            "change:active": function() {
                this.render();
            }
        },

        activateMenu: function (event) {
            // window.app.vent.trigger('menu:activate', this.model);
            // window.app.main.show(new PageView({model: this.model}));
		},

        activateToggle: function(event) {
            $('#u-me-toggle-id').toggle("normal", function(e) {
                if($(this).is(':visible')) {
                    $('#u-me-id').css('background', 'rgb(90,194,231)');
                }else {
                    $('#u-me-id').css('background', 'transparent');
                }
            });
        },
        hideToggle: function(event) {
            $('#u-me-toggle-id').hide();
            $('#u-me-id').css('background', 'transparent');
        },        

        onRender: function() {
            if(this.model.get('active')) this.$el.addClass('active');
        }

	});
});
