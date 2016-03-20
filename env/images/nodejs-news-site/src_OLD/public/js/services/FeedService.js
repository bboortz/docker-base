// public/js/services/FeedService.js
angular.module('FeedService', []).factory('Feed', ['$http', function($http) {

    return {
        // call to get all feeds
        get : function() {
            return $http.get('http://localhost:8080/api/feed');
        },


                // these will work when more API routes are defined on the Node side of things
        // call to POST and create a new feed
        create : function(feedData) {
            return $http.post('http://localhost:8080/api/feed', feedData);
        },

        // call to DELETE a feed
        delete : function(id) {
            return $http.delete('http://localhost:8080//api/feeds/' + id);
        }
    }       

}]);
