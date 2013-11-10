///<reference path="../typings/jquery/jquery.d.ts"/>
///<reference path="../typings/angularjs/angular.d.ts"/>
declare var $resource;
angular.module('app', ['ngResource']);
module Voting{
    export class Index{

        constructor($scope, $resource)
        {
            var data = $resource('/poll/:id');
            $scope.polls = data.get();
        }


    }
}
