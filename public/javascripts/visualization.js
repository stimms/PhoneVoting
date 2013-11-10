var Voting;
(function (Voting) {
    var Visualization = (function () {
        function Visualization() {
        }
        Visualization.prototype.Init = function () {
            alert("init");
        };
        return Visualization;
    })();
    Voting.Visualization = Visualization;
})(Voting || (Voting = {}));
