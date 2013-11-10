var Voting;
(function (Voting) {
    var Vizualization = (function () {
        function Vizualization() {
        }
        Vizualization.prototype.Init = function () {
            alert("init");
        };
        return Vizualization;
    })();
    Voting.Vizualization = Vizualization;
})(Voting || (Voting = {}));
