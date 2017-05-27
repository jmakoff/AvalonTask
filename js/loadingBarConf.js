(function () {
    angular
        .module('avalonApp', ['angular-loading-bar'])
        .config(['cfpLoadingBarProvider', function(cfpLoadingBarProvider) {
            cfpLoadingBarProvider.parentSelector = '#loading-bar-container';
            cfpLoadingBarProvider.spinnerTemplate = '<div><span class="fa fa-spinner">Custom Loading Message...</div>';
            cfpLoadingBarProvider.latencyThreshold = 0;
        }])

})();