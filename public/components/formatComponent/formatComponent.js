angular.module('app').component('formatComponent', {
    templateUrl: '/components/formatComponent/formatComponent.html',
    bindings: {
        newsData: '=',
        buttonFn: '&',
        buttonLabel: '@',
        redirectFn: '&',
    },
    controller: function ($scope, $window) {
        console.log(this.newsData)
    },
    controllerAs: 'fc'
})