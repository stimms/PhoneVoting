var Voting;
(function (Voting) {
    var Index = (function () {
        function Index() {
        }
        Index.prototype.Init = function () {
            console.log("Index init");
        };
        return Index;
    })();
    Voting.Index = Index;
})(Voting || (Voting = {}));
