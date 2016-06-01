/* Setup general page controller */
MetronicApp.controller('ProgressController', ['$scope', function($scope) {
    var vm = $scope.vm = {};
    vm.config = {
        theme: 'vintage',
        dataLoaded: true
    };
    vm.option = {
        title: {
            text: '公司损益'
        },
        tooltip: {
            trigger: 'axis'
        },
        legend: {
            data: ['主营收入', '主营成本', '营业利润', '净利润']
        },
        grid: {
            left: '3%',
            right: '4%',
            bottom: '3%',
            containLabel: true
        },
        toolbox: {
            feature: {
                saveAsImage: {}
            }
        },
        xAxis: {
            type: 'category',
            boundaryGap: false,
            data: ['', 'Q1', 'Q2', 'Q3', 'Q4']
        },
        yAxis: {
            type: 'value'
        },
        series: [{
            name: '主营收入',
            type: 'line',
            stack: '总量',
            data: [120, -132, 101, 134, -90, 230, 210]
        }, {
            name: '主营成本',
            type: 'line',
            stack: '总量',
            data: [220, -182, -191, 234, 290, 330, 310]
        }, {
            name: '营业利润',
            type: 'line',
            stack: '总量',
            data: [150, 232, 201, 154, -190, 330, 410]
        }, {
            name: '净利润',
            type: 'line',
            stack: '总量',
            data: [320, 332, -301, 334, 390, 330, 320]
        }]
    };


}]);
