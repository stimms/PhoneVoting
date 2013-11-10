var Voting;
(function (Voting) {
    var Visualization = (function () {
        function Visualization($scope) {
            $scope.polls = [
                { id: 'fdsafd', name: "poll one" },
                { id: 'wfefda', name: "poll two" }
            ];
        }
        return Visualization;
    })();
    Voting.Visualization = Visualization;
})(Voting || (Voting = {}));
