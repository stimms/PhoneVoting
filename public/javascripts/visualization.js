///<reference path="../typings/jquery/jquery.d.ts"/>
///<reference path="../typings/angularjs/angular.d.ts"/>
///<reference path="../typings/d3/d3.d.ts"/>
var visualization = angular.module('visualization', []).value("visualization", {
    svg: null,
    data: null,
    width: 500,
    height: 500,
    colours: null,
    yScale: null,
    xScale: null,
    activate: function ($scope) {
        this.svg = d3.select(".visualizationContainer").append("svg").attr("height", this.height + "px").attr("width", this.width + "px");
        this.convertData($scope.poll);
        this.render();
    },
    convertData: function (data) {
        this.data = data.options;
    },
    render: function () {
        var _this = this;
        this.yScale = d3.scale.linear().domain([0, d3.max(this.data, function (d) {
                return d.value;
            })]).range([0, this.height]);
        this.xScale = d3.scale.ordinal().rangeBands([0, this.width], .1);

        this.colours = d3.scale.category10();

        this.svg.selectAll("rect").data(this.data).enter().append("rect").attr("class", "bar").attr("width", this.xScale.rangeBand()).attr("y", function (d) {
            return _this.height - _this.yScale(d.value);
        }).attr("x", function (d) {
            return _this.xScale(d.name);
        }).attr("height", function (d) {
            return _this.yScale(d.value);
        }).style("fill", function (d) {
            return _this.colours(d.name);
        });
    }
});
//# sourceMappingURL=visualization.js.map
