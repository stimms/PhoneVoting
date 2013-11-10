angular.module('app', ['ngResource']);
var Voting;
(function (Voting) {
    var Index = (function () {
        function Index($scope, $resource) {
            var data = $resource('/poll/:id');
            $scope.polls = data.get();
        }
        return Index;
    })();
    Voting.Index = Index;
})(Voting || (Voting = {}));
