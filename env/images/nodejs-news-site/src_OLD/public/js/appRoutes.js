// public/js/appRoutes.js
    angular.module('appRoutes', []).config(['$routeProvider', '$locationProvider', function($routeProvider, $locationProvider) {

    $routeProvider

        // home page
        .when('/', {
            templateUrl: 'views/home.html',
            controller: 'MainController'
        })

        // feed page that will use the FeedController
        .when('/feeds', {
            templateUrl: 'views/feed.html',
            controller: 'FeedController'
        })

        // feedentry page that will use the FeedEntryController
        .when('/feedentry', {
            templateUrl: 'views/feedentry.html',
            controller: 'FeedEntryController'
        });

    $locationProvider.html5Mode(true);

}]);
