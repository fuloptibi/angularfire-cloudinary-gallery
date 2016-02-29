'use strict';

/**
 * Error module for Gallery app
 */
angular.module('gallery.error', [])

/**
 * Error service for Gallery error module
 * 
 * @param {object} $rootScope   AngularJS root scope
 */
.service('error', function($rootScope){
    
    // Name of the global event triggered on error
    var errorEventName = '$galleryError';
    
    return {
        /**
         * Handle an error
         * 
         * @param {string} error
         */
        handle: function(error){
            $rootScope.$broadcast(errorEventName, [error]);
        },
        
        /**
         * Listen to error events
         * 
         * @param {function} callback
         */
        listen: function(callback){
            $rootScope.$on(errorEventName, callback);
        }
    };
});
