'use strict';

angular.module('gallery.auth')

/**
 * Directive to match the input value against another input's value
 */
.directive('sameAs', function(){
    return {
        require: 'ngModel',
        scope: {
            otherModelValue: "=sameAs"
        },
        link: function(scope, element, attributes, ngModel) {
            
            /*
             * SameAs validator
             */
            ngModel.$validators.sameAs = function(modelValue) {
                return modelValue === scope.otherModelValue;
            };
 
            /**
             * Monitor other model value for changes
             */
            scope.$watch("otherModelValue", function() {
                ngModel.$validate();
            });
        }
    };
});