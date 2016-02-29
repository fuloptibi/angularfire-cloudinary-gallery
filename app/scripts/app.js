'use strict';

/**
 * Gallery AngularJS module
 * 
 * Main module of the application.
 */
angular.module('gallery', [
    'ngAnimate',
    'ngCookies',
    'ngResource',
    'ngRoute',
    'ngSanitize',
    'ngTouch',
    'ui.router',
    'ui.bootstrap',
    'ngFileUpload',
    'cloudinary',
    'gallery.error',
    'gallery.database',
    'gallery.templates',
    'gallery.uploader',
    'gallery.auth'
])

/**
 * Configure the application
 */
.config(function($urlRouterProvider) {
    
    $urlRouterProvider.otherwise('/');
    
})

/**
 * Set up database and cloudinary connection
 * 
 * @param {object} database      Gallery database module database service
 * @param {object} uploader      Gallery uploader module uploader service
 */
.run(function(database, uploader){
    database.setApplicationName('angularfire-cloudinary-gallery');
    uploader.setCloudName('fuloptibi');
})

/**
 * Global actions performed after the application has been bootstrapped
 * 
 * @param {object} $rootScope    AngularJS $rootScope
 * @param {object} $state        ui.router $state service
 * @param {object} error         Gallery error module error service
 * @param {object} auth          Gallery auth module auth service
 */
.run(function($rootScope, $state, error, auth){
    
    // Make $state available in all the views
    $rootScope.$state = $state;
    
    // Listen for errors and display the error message to the user
    error.listen(function(event, err){
        var errObj = typeof(err.error) === 'object' ? err.error : err;
        var errorMessage = errObj.message || errObj.error || errObj;
        alert(errorMessage);
    });
    
    // Handle state change errors
    $rootScope.$on("$stateChangeError", function(event, next, previous, error) {
        if (error === "AUTH_REQUIRED") {
            $state.go("auth.login");
        } else {
            $state.go("home");
        }
    });
    
    /**
     * Logout proxy function
     */
    $rootScope.logout = function(){
        auth.logout();
        $state.go("home");
    };
});