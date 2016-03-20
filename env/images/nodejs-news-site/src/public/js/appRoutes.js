angular.module('appRoutes', []).config(['$routeProvider', '$locationProvider', function($routeProvider, $locationProvider) {

	$routeProvider

		// home page
		.when('/', {
			templateUrl: 'views/home.html',
			controller: 'MainController'
		})

		.when('/feeds', {
			templateUrl: 'views/feed.html',
			controller: 'FeedController'
		})

		.when('/feedentrys', {
			templateUrl: 'views/feedentry.html',
			controller: 'FeedentryController'	
		});

	$locationProvider.html5Mode(true);

}]);