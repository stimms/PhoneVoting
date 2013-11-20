///<reference path="../typings/jquery/jquery.d.ts"/>
///<reference path="../typings/angularjs/angular.d.ts"/>
///<reference path="../typings/d3/d3.d.ts"/>
///<reference path="../typings/underscore/underscore.d.ts"/>

declare var io: any;

var visualization:any = angular.module('visualization', []).value("visualization", {
    name: null,
    svg: null,
    data: null,
    width: 500,
    height: 500,
    colours: null,
    yScale: null,
    xScale: null,
    activate : function($scope)
    {
        this.name=$scope.poll.key;
        console.log($scope.poll.key);
        this.svg = d3.select(".visualizationContainer")
                    .append("svg")
                    .attr("height", this.height + "px")
                    .attr("width", this.width + "px");

        this.colours = d3.scale.category10();

        this.convertData($scope.poll);

        this.render();
        this.socket();
    },
    socket: function()
    {
        var socket = io.connect('http://localhost:3000');
        var me = this;
        socket.on('vote',  (item) => {
            if(me.name == item.pollKey)
            {
                var vote = _.find(me.data, d => d.key == item.optionKey);
                if(vote)
                    vote.value += 1;
                me.render();
            }
        });

    },
    convertData : function(data)
    {
        this.data = data.options;
    },
    render : function()
    {
        this.yScale = d3.scale.linear()
                                .domain([0, d3.max(this.data, d=>d.value)])
                                .range([0,this.height-30]);
        this.xScale = d3.scale.ordinal()
            .rangeBands([0, this.width], .1)
            .domain(this.data.map(d => d.key));

        var rectangles = this.svg.selectAll("rect")
            .data(this.data);
        rectangles.transition()
            .attr("y", d => this.height - this.yScale(d.value))
            .attr("height", d => this.yScale(d.value));

        rectangles
            .enter()
            .append("rect")
            .attr("class", "bar")
            .attr("width", this.xScale.rangeBand())
            .attr("y", d => this.height - this.yScale(d.value))
            .attr("x", d => this.xScale(d.name))
            .style("fill", d => this.colours(d.name))
            .transition()
            .attr("height", d => this.yScale(d.value));

    }
});