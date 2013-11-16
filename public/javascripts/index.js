///<reference path="../typings/jquery/jquery.d.ts"/>
///<reference path="../typings/angularjs/angular.d.ts"/>
var mod = angular.module('VotingApp', ['ngResource', 'ngRoute', 'votingControllers']).config(function ($routeProvider) {
    $routeProvider.when("/poll/:pollId", { controller: "PollCtrl", templateUrl: "/poll.html" }).when("/polls", { controller: "IndexCtrl", templateUrl: "/polls.html" }).otherwise({ redirectTo: "/polls" });
});

var votingControllers = angular.module('votingControllers', []);
votingControllers.controller('IndexCtrl', [
    '$scope',
    '$resource',
    function IndexCtrl($scope, $resource) {
        var data = $resource('/polls', {}, { 'get': { method: "GET", isArray: true } });
        data.get(function (data) {
            $scope.polls = data;
        });
    }
]);
votingControllers.controller('PollCtrl', [
    '$scope',
    '$resource',
    '$routeParams',
    function PollCtrl($scope, $resource, $routeParams) {
        var data = $resource('/poll/:id', { 'id': $routeParams.pollId }, { 'get': { method: 'GET', isArray: false } });
        data.get(function (data) {
            $scope.poll = data;
        });
    }
]);
//# sourceMappingURL=index.js.map
