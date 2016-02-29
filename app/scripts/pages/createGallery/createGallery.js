'use strict';

angular.module('gallery')

/**
 * Define the createGallery state
 *  
 * @param {object} $stateProvider   ui.router $stateProvider
 */
.config(function($stateProvider) {
    $stateProvider.state('createGallery', {
        url: '/create-gallery',
        templateUrl: 'scripts/pages/createGallery/createGallery.html',
        controller: 'Gallery_CreateGalleryPage',
        resolve: {
            currentAuth: function(auth){
                return auth.requireAuth();
            }
        }
    });
})

/**
 * Controller of the create gallery page
 * 
 * @param {object} $scope       Page scope
 * @param {object} $state       ui.router $state service
 * @param {object} database     Gallery database module database service
 * @param {object} currentAuth  The currently authenticated user
 */
.controller('Gallery_CreateGalleryPage', function($scope, $state, database, currentAuth){
    
    $scope.gallery = {};
    
    /**
     * Create the gallery instance
     */
    $scope.createGallery = function(){
        var galleries = database.getArray('galleries/' + currentAuth.uid);
        galleries.$add($scope.gallery).then(function(ref){
            $state.go('editGallery', {id: ref.key()});
        });
    };
});