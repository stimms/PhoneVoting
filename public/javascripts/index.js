var Voting;
(function (Voting) {
    var Index = (function () {
        function Index($scope) {
            $scope.polls = [
                { id: 'fdsafd', name: "poll one" },
                { id: 'wfefda', name: "poll two" }
            ];
        }
        return Index;
    })();
    Voting.Index = Index;
})(Voting || (Voting = {}));
