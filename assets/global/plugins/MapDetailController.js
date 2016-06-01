'use strict';
MetronicApp.controller('MapDetailController', function($scope) {
    var vm = $scope.vm = {};
    vm.radioModel = 'Left';
    vm.productConfig = {
        theme: 'vintage',
        dataLoaded: true
    };
    //冰箱,空调,洗衣机,热水器,小家电,彩电
    vm.productionOption = {
        tooltip: {
            trigger: 'item',
            formatter: "{a} <br/>{b} : {c} ({d}%)"
        },
        legend: {
            orient: 'vertical',
            left: 'left',
            data: ['冰箱', '空调', '洗衣机', '热水器', '小家电', '彩电']
        },
        series: [{
            name: '所占比',
            type: 'pie',
            radius: '55%',
            center: ['50%', '60%'],
            data: [{
                value: 335,
                name: '冰箱',
                selected: true
            }, {
                value: 310,
                name: '空调'
            }, {
                value: 234,
                name: '洗衣机'
            }, {
                value: 135,
                name: '热水器'
            }, {
                value: 1048,
                name: '小家电'
            }, {
                value: 500,
                name: '彩电'
            }],
            itemStyle: {
                emphasis: {
                    shadowBlur: 10,
                    shadowOffsetX: 0,
                    shadowColor: 'rgba(0, 0, 0, 0.5)'
                }
            }
        }]
    };

    vm.dates = ['01月', '02月', '03月', '04月', '05月', '06月', '07月', '08月', '09月', '10月', '11月', '12月'];
    vm.initData = function() {
        vm.countDatas = [];
        _.map(vm.dates, function() {
            vm.countDatas.push(_.random(10, 200))
        })
    };
    // 数据初始化
    vm.initData();

    vm.pointersOption = {
        tooltip: {
            trigger: 'axis'
        },
        toolbox: {
            show: true,
            feature: {
                dataView: {
                    show: true,
                    readOnly: false
                },
                magicType: {
                    show: true,
                    type: ['line', 'bar']
                },
                restore: {
                    show: true
                },
                saveAsImage: {
                    show: true
                }
            }
        },
        calculable: true,
        xAxis: [{
            name: '月份',
            type: 'category',
            data: ['01月', '02月', '03月', '04月', '05月', '06月', '07月', '08月', '09月', '10月', '11月', '12月']
        }],
        yAxis: [{
            type: 'value'
        }],
        series: [{
            name: '结算费用',
            type: 'bar',
            data: vm.countDatas,
            markPoint: {
                data: [{
                    type: 'max',
                    name: '最大值'
                }, {
                    type: 'min',
                    name: '最小值'
                }]
            },
            markLine: {
                data: [{
                    type: 'average',
                    name: '平均值'
                }]
            }
        }]
    };
    vm.renderMap = function() {
        vm.initData();
        vm.productionOption.series = [{
            name: '所占比',
            type: 'pie',
            radius: '55%',
            center: ['50%', '60%'],
            data: [{
                value: _.random(300, 400),
                name: '冰箱',
                selected: true
            }, {
                value: _.random(300, 400),
                name: '空调'
            }, {
                value: _.random(200, 300),
                name: '洗衣机'
            }, {
                value: _.random(1000, 2000),
                name: '热水器'
            }, {
                value: _.random(100, 200),
                name: '小家电'
            }, {
                value: _.random(500, 600),
                name: '彩电'
            }]
        }];
        vm.pointersOption.series = [{
            name: '结算费用',
            type: 'bar',
            data: vm.countDatas,
            markPoint: {
                data: [{
                    type: 'max',
                    name: '最大值'
                }, {
                    type: 'min',
                    name: '最小值'
                }]
            },
            markLine: {
                data: [{
                    type: 'average',
                    name: '平均值'
                }]
            }
        }]
    }

    $scope.$watch('vm.radioModel', function(newValue, oldValue) {
        if (newValue !== oldValue) {
            vm.renderMap()
        }
    });
});
