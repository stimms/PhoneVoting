///<reference path="../typings/jquery/jquery.d.ts"/>
///<reference path="../typings/angularjs/angular.d.ts"/>
///<reference path="../typings/underscore/underscore.d.ts"/>

var mod = angular.module('VotingApp', ['ngResource', 'ngRoute', 'votingControllers']).
    config(($routeProvider)=>
    {
        $routeProvider
            .when("/poll/:pollId", {controller:"PollCtrl", templateUrl: "/poll.html"})
            .when("/polls",{controller:"IndexCtrl", templateUrl: "/polls.html"})
            .when("/add", {controller:"AddCtrl", templateUrl: "/add.html"})
            .otherwise({redirectTo: "/polls"});
    });


var votingControllers = angular.module('votingControllers', ['visualization']);
votingControllers.controller('IndexCtrl', ['$scope', '$resource', function IndexCtrl($scope, $resource)
    {
        var data = $resource('/polls',{}, {'get': {method: "GET", isArray: true}});
        data.get(function(data){
            $scope.polls = data;
        });

        $scope.delete = function(id)
        {
            console.log("id" +  id);
            var Poll:any = $resource('/poll', {'id': id }, {'delete': {method: 'DELETE'}});
            var poll:any = new Poll();
            poll.$delete();
            $scope.polls = _.reject($scope.polls, x => x.id == id);
        };
    }]
);
votingControllers.controller('PollCtrl', ['$scope', '$resource', '$routeParams', 'visualization', function PollCtrl($scope, $resource, $routeParams, visualization)
    {
        var data = $resource('/poll/:id', {'id': $routeParams.pollId}, {'get': {method: 'GET', isArray: false}});
        data.get(function(data){
            $scope.poll = data;
            visualization.activate($scope);
        });
    }]);
votingControllers.controller('AddCtrl', ['$scope', '$resource', '$location', function AddCtrl($scope, $resource, $location)
{
    $scope.add = function()
    {
        var Poll:any = $resource('/poll', {}, {'add': {method: 'POST'}});
        var poll:any = new Poll();
        $.extend(poll, $scope.addItem);
        poll.$save(function(){
            $location.path("/");
        });
    }
}]);