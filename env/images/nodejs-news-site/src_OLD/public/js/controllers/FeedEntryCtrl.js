// public/js/controllers/FeedEntryCtrl.js
angular.module('FeedEntryCtrl', ['ngResource']).
factory('AngularEntrys', function ($resource) {
	return $resource('http://localhost:8081/api/feedentry', {})
}).
controller('FeedEntryController', ['$scope', 'AngularEntrys', function (scope, AI) {
    scope.myData = {
        currentEntry: null,
        entryList: [],
        entryListState: 'open',
        entryListSort: 'created',
        entryListDirection: 'desc',
        entryListPage: 1
    };

    scope.setEntryList = function () {
        AI.query({
            state: scope.myData.entryListState,
            //labels: scope.myData.labels,
            sort: scope.myData.entryListSort,
            direction: scope.myData.entryListDirection
        }, function (data) {
            scope.myData.entryList = data;
        });
    };

    scope.setSort = function (sort) {
        var oldSort = angular.copy(scope.myData.entryListSort);
        scope.myDataeListSort = sort;
        if (oldSort == sort) {
            scope.setDirection(scope.myData.entryListDirection == 'desc' ? 'asc' : 'desc');
        } else {
            scope.setDirection('desc');
        }
    };

    scope.setDirection = function (direction) {
        scope.myData.entryListDirection = direction;
        scope.setEntryList();
    };

    scope.sortClass = function (column) {
        return column == scope.myData.entryListSort && 'sort-' + scope.myData.entryListDirection;
    };

    scope.setCurrentEntry = function (number) {
        AI.getEntry({
            number: number
        }, function (data) {
            scope.myData.currentEntry = data;
        });
    };

    scope.showAll = function () {
        scope.myData.currentEntry = null;
    };

    scope.setEntryList();
}]);
