'use strict';

/**
 * Database module for Gallery app
 */
angular.module('gallery.database', [
    'firebase'
])

/**
 * Database service for Gallery database module
 * 
 * @param {object} $firebaseObject    AngularFire object service
 * @param {object} $firebaseArray     AngularFire array service
 */
.service('database', function($firebaseObject, $firebaseArray){
    
    var appName, ref;
    
    return {
        /**
         * Set the name of the FireBase application
         * 
         * @param {string} app
         */
        setApplicationName: function(app){
            appName = app;
            ref = new Firebase("https://" + appName + ".firebaseio.com");
        },
        
        /**
         * Get Firebase object
         * 
         * @param {string} path     Optional path
         */
        getRef: function(path){
            if (path){
                return new Firebase("https://" + appName + ".firebaseio.com/" + path);
            }
            return ref;
        },
        
        /**
         * Get reference to an array by path
         * 
         * @param {string} path
         * @returns {array}
         */
        getArray: function(path){
            return $firebaseArray(this.getRef(path));
        },
        
        /**
         * Get reference to an object by path
         * 
         * @param {string} path
         * @returns {array}
         */
        getObject: function(path){
            return $firebaseObject(this.getRef(path));
        }
    };
});