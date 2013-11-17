var mod = angular.module('VotingApp', ['ngResource', 'ngRoute', 'votingControllers']).config(function ($routeProvider) {
    $routeProvider.when("/poll/:pollId", { controller: "PollCtrl", templateUrl: "/poll.html" }).when("/polls", { controller: "IndexCtrl", templateUrl: "/polls.html" }).when("/add", { controller: "AddCtrl", templateUrl: "/add.html" }).otherwise({ redirectTo: "/polls" });
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
votingControllers.controller('AddCtrl', [
    '$scope',
    '$resource',
    '$location',
    function AddCtrl($scope, $resource, $location) {
        $scope.add = function () {
            var Poll = $resource('/poll', {}, { 'add': { method: 'POST' } });
            var poll = new Poll();
            $.extend(poll, $scope.addItem);
            poll.$save(function () {
                $location.path("/");
            });
        };
    }
]);
