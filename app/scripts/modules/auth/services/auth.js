'use strict';

angular.module('gallery.auth')

/**
 * Authentication service for Gallery module
 * 
 * @param {object} database         Gallery database module database service
 * @param {object} $firebaseAuth    AngularFire authentication service
 * @param {object} $timeout         AngularJS timeout service
 * @param {object} $q               AngularJS queue service
 */
.service('auth', function(database, $firebaseAuth, $timeout){
    
    // create an instance of the AngularFire authentication service
    var auth = $firebaseAuth(database.getRef());
    
    var authService = {
        /**
         * Login a user
         * 
         * @param {object} user
         * @returns {promise}
         */
        login: function(user){
            return auth.$authWithPassword(user);
        },
        
        /**
         * Create new user
         * 
         * @param {object} user
         * @returns {promise}
         */
        signup: function(user){
            return $q(function(resolve, reject){
                auth.$createUser(user).then(function(userData){
                    authService.login(user);
                    resolve(userData);
                }).catch(reject);
            });
        },
        
        /**
         * Log the current user out
         */
        logout: function(){
            auth.$unauth();
        },
        
        /**
         * Listen for authentication state change
         * 
         * @param {function} callback
         */
        onAuth: function(callback){
            
            // Create wrapper for performance reasons
            var callbackWrapper = function(authData){
                $timeout(function(){
                    callback(authData);
                }, 0);
            };
            
            auth.$onAuth(callbackWrapper);
        },
        
        /**
         * Waith for the authentication state to be resolved
         * 
         * @returns {queue}
         */
        waitForAuth: function(){
            return auth.$waitForAuth();
        },
        
        /**
         * Waith for the authentication state to be resolved and fail if not authenticated
         * 
         * @returns {queue}
         */
        requireAuth: function(){
            return auth.$requireAuth();
        }
    };
    return authService;
});