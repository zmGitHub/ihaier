/* Setup general page controller */
MetronicApp.controller('InfoController', ['$scope', '$state', function($scope, $state) {
    var vm = $scope.vm = {};
    vm.config = {
        theme: 'vintage',
        dataLoaded: true
    };

    vm.infoOption = {
        tooltip: {
            formatter: "{a} <br/>{b} : {c}%"
        },
        series: [{
            name: '小帅智能科技有限公司',
            type: 'gauge',
            detail: {
                formatter: '{value}%'
            },
            data: [{
                value: 78,
                name: '信息完善度'
            }]
        }]
    };

    vm.moneyOption = {
        tooltip : {
            trigger: 'axis',
            axisPointer : {            // 坐标轴指示器，坐标轴触发有效
                type : 'shadow'        // 默认为直线，可选为：'line' | 'shadow'
            },
            formatter: function (params) {
                var tar;
                if (params[1].value != '-') {
                    tar = params[1];
                }
                else {
                    tar = params[0];
                }
                return tar.name + '<br/>' + tar.seriesName + ' : ' + tar.value;
            }
        },
        legend: {
            data:['支出','收入']
        },
        grid: {
            left: '3%',
            right: '4%',
            bottom: '3%',
            containLabel: true
        },
        xAxis: {
            type : 'category',
            splitLine: {show:false},
            data :  function (){
                var list = [];
                for (var i = 1; i <= 11; i++) {
                    list.push('11月' + i + '日');
                }
                return list;
            }()
        },
        yAxis: {
            type : 'value'
        },
        series: [
            {
                name: '辅助',
                type: 'bar',
                stack: '总量',
                itemStyle: {
                    normal: {
                        barBorderColor: 'rgba(0,0,0,0)',
                        color: 'rgba(0,0,0,0)'
                    },
                    emphasis: {
                        barBorderColor: 'rgba(0,0,0,0)',
                        color: 'rgba(0,0,0,0)'
                    }
                },
                data: [0, 900, 1245, 1530, 1376, 1376, 1511, 1689, 1856, 1495, 1292]
            },
            {
                name: '收入',
                type: 'bar',
                stack: '总量',
                label: {
                    normal: {
                        show: true,
                        position: 'top'
                    }
                },
                data: [900, 345, 393, '-', '-', 135, 178, 286, '-', '-', '-']
            },
            {
                name: '支出',
                type: 'bar',
                stack: '总量',
                label: {
                    normal: {
                        show: true,
                        position: 'bottom'
                    }
                },
                data: ['-', '-', '-', 108, 154, '-', '-', '-', 119, 361, 203]
            }
        ]
    };


}]);
