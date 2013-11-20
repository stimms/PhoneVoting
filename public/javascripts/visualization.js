var visualization = angular.module('visualization', []).value("visualization", {
    name: null,
    svg: null,
    data: null,
    width: 500,
    height: 500,
    colours: null,
    yScale: null,
    xScale: null,
    activate: function ($scope) {
        this.name = $scope.poll.key;
        console.log($scope.poll.key);
        this.svg = d3.select(".visualizationContainer").append("svg").attr("height", this.height + "px").attr("width", this.width + "px");

        this.colours = d3.scale.category10();

        this.convertData($scope.poll);

        this.render();
        this.socket();
    },
    socket: function () {
        var socket = io.connect('http://' + window.location.hostname + '');
        var me = this;
        socket.on('vote', function (item) {
            if (me.name == item.pollKey) {
                var vote = _.find(me.data, function (d) {
                    return d.key == item.optionKey;
                });
                if (vote)
                    vote.value += 1;
                me.render();
            }
        });
    },
    convertData: function (data) {
        this.data = data.options;
    },
    render: function () {
        var _this = this;
        this.yScale = d3.scale.linear().domain([0, d3.max(this.data, function (d) {
                return d.value;
            })]).range([0, this.height - 30]);
        this.xScale = d3.scale.ordinal().rangeBands([0, this.width], 0.1).domain(this.data.map(function (d) {
            return d.key;
        }));

        var rectangles = this.svg.selectAll("rect").data(this.data);
        rectangles.transition().attr("y", function (d) {
            return _this.height - _this.yScale(d.value);
        }).attr("height", function (d) {
            return _this.yScale(d.value);
        });

        rectangles.enter().append("rect").attr("class", "bar").attr("width", this.xScale.rangeBand()).attr("y", function (d) {
            return _this.height - _this.yScale(d.value);
        }).attr("x", function (d) {
            return _this.xScale(d.key);
        }).style("fill", function (d) {
            return _this.colours(d.name);
        }).transition().attr("height", function (d) {
            return _this.yScale(d.value);
        });

        this.svg.selectAll("text").data(this.data).enter().append("text").style("fill", "black").attr("x", function (d) {
            return _this.xScale(d.key) + (_this.xScale.rangeBand() / 2);
        }).attr("y", 30).attr("font-size", "20px").attr("text-anchor", "middle").attr("width", function (d) {
            return _this.xScale.rangeBand();
        }).attr("height", "30px").text(function (d) {
            return d.name + "(" + d.value + ")";
        });
    }
});
//# sourceMappingURL=visualization.js.map
