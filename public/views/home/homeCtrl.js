angular.module('app')
.controller('homeCtrl', function ($scope, $window, $state, $stateParams, homeService, savedService) {
    $scope.newsChoice = function (redditSearch) {
        if (!redditSearch) {
            redditSearch = 'catloaf'
        }
        homeService.getArticle(redditSearch)
        .then(function (response) {
            console.log(response)
            $scope.newsData = response;
            savedService.getSavedArticles()
            .then(function(results) {
                for (var article of $scope.newsData) {
                    for (var savedArticle of results.data) { 
                        if (article.url === savedArticle.url) {
                            article.saved = true;
                        }
                    }
                }
            })
        })
        .catch(function(err) {
            console.error(err)
        })
        
    }
    $scope.newsChoice($stateParams.redditSearch)

    $scope.redirectToUrl = function (article) {
        $window.open(article.url)
    }

    $scope.saveArticle = function (article) {
        console.log("Saving", article)
        article.saved = true;
        savedService.saveArticle(article);
    }
})