'use strict';

angular.module('gallery.auth')

/**
 * Define the login state
 *  
 * @param {object} $stateProvider   ui.router $stateProvider
 */
.config(function($stateProvider) {
    $stateProvider.state('auth.login', {
        url: '/login',
        templateUrl: 'scripts/modules/auth/pages/login/login.html',
        controller: 'Gallery_Auth_LoginPage'
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
.controller('Gallery_Auth_LoginPage', function($scope, $state, auth, error){
    
    // Reset login form data
    $scope.loginUser = {};
    
    /**
     * Login with submitted data
     */
    $scope.login = function(){
        auth.login($scope.loginUser).then(function(){
            $state.go('home');
        }).catch(error.handle);
    };
    
});