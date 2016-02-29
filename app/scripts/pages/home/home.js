'use strict';

angular.module('gallery')

/**
 * Define the home state
 *  
 * @param {object} $stateProvider   ui.router $stateProvider
 */
.config(function($stateProvider) {
    $stateProvider.state('home', {
        url: '/',
        templateUrl: 'scripts/pages/home/home.html',
        controller: 'Gallery_HomePage',
        resolve: {
            currentAuth: function(auth){
                return auth.waitForAuth();
            }
        }
    });
})

/**
 * Controller of the home page
 * 
 * @param {object} $scope       Scope of the home page
 * @param {object} database     Gallery database module database service
 * @param {object} currentAuth  The currently authenticated user
 */
.controller('Gallery_HomePage', function($scope, database, currentAuth){
 
    if (currentAuth) {
        $scope.galleries = database.getArray('galleries/' + currentAuth.uid);
    }
    
});