"use strict";

//See: https://github.com/pablojim/highcharts-ng
var cockpit = angular.module("cockpit", ["highcharts-ng"]);

cockpit.controller("CockpitController", function ($scope) {

    //$scope.toggleLoading = function () {
    //    this.chartConfig.loading = !this.chartConfig.loading
    //}

    $scope.chartConfig = {
        options: {
            chart: {
                type: "gauge",
                plotBackgroundColor: null,
                plotBackgroundImage: null,
                plotBorderWidth: 0,
                plotShadow: false
            },
            pane: {
                startAngle: -150,
                endAngle: 150,
                background: [{
                    backgroundColor: {
                        linearGradient: {x1: 0, y1: 0, x2: 0, y2: 1},
                        stops: [
                            [0, '#FFF'],
                            [1, '#333']
                        ]
                    },
                    borderWidth: 0,
                    outerRadius: '109%'
                }, {
                    backgroundColor: {
                        linearGradient: {x1: 0, y1: 0, x2: 0, y2: 1},
                        stops: [
                            [0, '#333'],
                            [1, '#FFF']
                        ]
                    },
                    borderWidth: 1,
                    outerRadius: '107%'
                }, {
                    // default background
                }, {
                    backgroundColor: '#DDD',
                    borderWidth: 0,
                    outerRadius: '105%',
                    innerRadius: '103%'
                }]
            },
            yAxis: {
                min: 0,
                max: 2800,

                minorTickInterval: 'auto',
                minorTickWidth: 1,
                minorTickLength: 10,
                minorTickPosition: 'inside',
                minorTickColor: '#666',

                tickPixelInterval: 30,
                tickWidth: 2,
                tickPosition: 'inside',
                tickLength: 10,
                tickColor: '#666',
                labels: {
                    step: 2,
                    rotation: 'auto'
                },
                title: {
                    text: 'rpm'
                },
                plotBands: [{
                    from: 0,
                    to: 500,
                    color: '#DDDF0D' // yellow
                }, {
                    from: 500,
                    to: 2300,
                    color: '#55BF3B' // green
                }, {
                    from: 2300,
                    to: 2550,
                    color: '#DDDF0D' // yellow
                }, {
                    from: 2550,
                    to: 2800,
                    color: '#DF5353' // red
                }]
            }
        },

        title: {
            text: "Tachometer (rpm)"
        },

        series: [{
            name: "Rounds per minute",
            data: [800],
            tooltip: {
                valueSuffix: " rpm"
            }
        }]
    }

    $scope.update = function () {
        var value = parseInt($scope.rpm);
        //$scope.chartConfig.series[0].setData(value, true);

        $scope.chartConfig.getHighcharts().series[0].points[0].update(value);
        //var start = $scope.chartConfig.series[0].data[0];
        //
        //for (var i = start; i < value; i++) {
        //    window.setTimeout(function () {
        //        $scope.chartConfig.series[0].data[0] = value;
        //    }, 10);
        //
        //}


        //var point = $scope.chartConfig.series[0].points[0];
        //point.update(parseInt($scope.rpm));
    };
});
