'use strict';

angular.module('gallery.auth')

/**
 * Define the login state
 *  
 * @param {object} $stateProvider   ui.router $stateProvider
 */
.config(function($stateProvider) {
    $stateProvider.state('auth.signup', {
        url: '/signup',
        templateUrl: 'scripts/modules/auth/pages/signup/signup.html',
        controller: 'Gallery_Auth_SignupPage'
    });
})

/**
 * Define the controller of the login page
 * 
 * @param {object} $scope    Controller scope
 * @param {object} $state    ui.router $state service
 * @param {object} auth      Gallery auth module auth service
 * @param {object} error     Gallery error module error service
 */
.controller('Gallery_Auth_SignupPage', function($scope, $state, auth, error){
    
    // Reset signup form data
    $scope.signupUser = {};
    
    /**
     * Sign up with submitted data
     */
    $scope.signup = function(){
        auth.signup($scope.signupUser).then(function(){
            $state.go('home');
        }).catch(error.handle);
    };
    
});