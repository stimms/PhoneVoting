var mod = angular.module('VotingApp', ['ngResource', 'ngRoute', 'votingControllers']).config(function ($routeProvider) {
    $routeProvider.when("/", { controller: "IndexCtrl", templateUrl: "/index.html" }).when("/poll/:pollId", { controller: "PollCtrl", templateUrl: "/poll.html" }).otherwise({ redirectTo: "/" });
});

var votingControllers = angular.module('votingControllers', []);
votingControllers.controller('IndexCtrl', [
    '$scope',
    '$resource',
    function IndexCtrl($scope, $resource) {
        var data = $resource('/polls/:id', {}, { 'get': { method: "GET", isArray: true } });
        data.get(function (data) {
            $scope.polls = data;
        });
    }
]);
