'use strict';

/**
 * Authentication module for Gallery app
 */
angular.module('gallery.auth', [
    'ngSanitize',
    'firebase',
    'ui.router',
    'gallery.error',
    'gallery.templates'
])

/**
 * Configure the module
 * 
 * @param {object} $stateProvider   ui.router $stateProvider
 */
.config(function($stateProvider) {
    
    // Define base route for modue routes
    $stateProvider.state('auth', {
        url: '/auth',
        abstract: true,
        template: '<ui-view/>'
    });
    
});