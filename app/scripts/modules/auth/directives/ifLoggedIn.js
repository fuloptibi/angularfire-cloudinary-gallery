'use strict';

angular.module('gallery.auth')

/**
 * Directive to hide/show elements based on authentication status
 * 
 * @param {object} auth         Gallery auth module auth service
 */
.directive('ifLoggedIn', function(auth){
    return {
        restrict: 'A',
        link: function(scope, el, attrs) {
            // Negate the bihaviour if called with a "false" attribute
            var negate = attrs.ifLoggedIn === 'false';
            
            // Monitor authentication changes, and show/hide the element according to the authentication state
            auth.onAuth(function(identity){
                el[identity ? (negate ? 'hide' : 'show') : (negate ? 'show' : 'hide')]();
            });
        }
    };
});