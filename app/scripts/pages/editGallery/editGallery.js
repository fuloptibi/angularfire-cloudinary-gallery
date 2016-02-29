'use strict';

angular.module('gallery')

/**
 * Define the editGallery state
 *  
 * @param {object} $stateProvider   ui.router $stateProvider
 */
.config(function($stateProvider) {
    $stateProvider.state('editGallery', {
        url: '/edit-gallery/:id',
        templateUrl: 'scripts/pages/editGallery/editGallery.html',
        controller: 'Gallery_EditGalleryPage',
        resolve: {
            currentAuth: function(auth){
                return auth.requireAuth();
            }
        }
    });
})

/**
 * Controller of the edit gallery page
 * 
 * @param {object} $scope       Page scope
 * @param {object} $stateParams ui.router $stateParams service
 * @param {object} database     Gallery database module database service
 * @param {object} currentAuth  The currently authenticated user
 * @param {object} uploader     Gallery uploader module upoader service
 */
.controller('Gallery_EditGalleryPage', function($scope, $stateParams, database, currentAuth, uploader){
    
    $scope.gallery = database.getObject('galleries/' + currentAuth.uid + '/' + $stateParams.id);
    $scope.galleryImages = database.getArray('galleries/' + currentAuth.uid + '/' + $stateParams.id + '/images');

    /**
     * The files to be uploaded
     */
    $scope.files = [];
    
    /**
     * Upload files proxy
     * 
     * @param {array} files
     */
    $scope.uploadFiles = function(files){
        uploader.uploadFiles(files).then(function(files){
            angular.forEach(files, function(file){
                $scope.galleryImages.$add(file);
            });
        });
    };

});