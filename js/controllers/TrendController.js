/* Setup general page controller */
MetronicApp.controller('TrendController', ['$scope', '$state', function($scope, $state) {
    var vm = $scope.vm = {};
    vm.img = '<img alt="100%x200" src="data:image/png;base64,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">';
    vm.trendClick = function() {
        $state.go('info');
    };
    vm.config = {
        theme: 'vintage',
        dataLoaded: true,
        event: [{
            click: vm.trendClick
        }]
    };
    vm.itemStyle = {
        normal: {
            opacity: 0.8,
            shadowBlur: 2,
            shadowOffsetX: 0,
            shadowOffsetY: 0,
            shadowColor: 'rgba(0, 0, 0, 0.5)'
        }
    };

    vm.option = {
        title: {
            text: '孵化进度',
            textStyle: {
              fontSize: 12
            }
        },
        color: [
            '#dd4444', '#fec42c', '#80F1BE'
        ],
        tooltip: {
            padding: 10,
            backgroundColor: '#222',
            borderColor: '#777',
            borderWidth: 1,
            position: ['50%', '50%'],
            formatter: function(obj) {
                var value = obj.value;
                return '<div style="text-align: center;border-bottom: 1px solid rgba(255,255,255,.3); font-size: 18px;padding-bottom: 7px;margin-bottom: 7px">小帅影院</div>' + vm.img;
            }
        },
        xAxis: {
            type: 'value',
            name: '估值',
            nameGap: 20,
            splitLine: {
                show: false
            },
            axisLabel: {
                formatter: '{value}万元'
            }
        },
        yAxis: {
            type: 'category',
            name: '轮次',
            nameLocation: 'end',
            splitLine: {
                show: false
            },
            axisLabel: {
                formatter: '{value}轮'
            },
            data: ['A', 'B', 'C', 'D', 'IPO']
        },
        visualMap: [{
            left: 'right',
            top: '10%',
            dimension: 2,
            min: 0,
            max: 500,
            itemWidth: 30,
            itemHeight: 120,
            calculable: true,
            precision: 0.1,
            text: ['估值范围: 万元'],
            textGap: 30,
            inRange: {
                symbolSize: [10, 70]
            },
            outOfRange: {
                symbolSize: [10, 70],
                color: ['rgba(255,255,255,.2)']
            },
            controller: {
                inRange: {
                    color: ['#c23531']
                },
                outOfRange: {
                    color: ['#444']
                }
            }
        }],
        series: [{
            name: '小微项目',
            type: 'scatter',
            itemStyle: vm.itemStyle,
            data: [
                [100, 'A', 4],
                [200, 'B', 8],
                [340, 'C', 17],
                [370, 'C', 17],
                [390, 'C', 17],
                [405, 'D', 27],
                [430, 'D', 27],
                [450, 'D', 27],
                [430, 'IPO', 34]
            ]
        }]
    };

    vm.lineOption = {
        title: {
            text: '小微评分',
            textStyle: {
              fontSize: 12
            }
        },
        tooltip: {
            trigger: 'axis'
        },
        xAxis: {
            type: 'value',
            boundaryGap: false,
            max: 100
        },
        yAxis: {
            type: 'value',
            max: 100,
            axisLabel: {
                formatter: '{value} 分'
            }
        },
        series: [{
            name: '最高气温',
            type: 'line',
            data: [
                [10, 0],
                [20, 13],
                [30, 30],
                [40, 40],
                [50, 50],
                [60, 60],
                [70, 46],
                [80, 36],
                [90, 20],
                [100, 0]
            ]
        }]
    };

    $scope.$on('$viewContentLoaded', function() {
        // initialize core components
    });
}]);
