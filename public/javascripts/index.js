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
        var data = $resource('/poll/:id', {}, { 'get': { method: "GET", isArray: true } });
        data.get(function (data) {
            $scope.polls = data;
        });
    }
]);
votingControllers.controller('PollCtrl', [
    '$scope',
    function PollCtrl($scope) {
        $scope.name = "";
        alert('poll ctrl');
    }
]);
//# sourceMappingURL=index.js.map
