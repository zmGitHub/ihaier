/***
GLobal Directives
***/

// Route State Load Spinner(used on page or content load)
MetronicApp.directive('ngSpinnerBar', ['$rootScope',
    function($rootScope) {
        return {
            link: function(scope, element, attrs) {
                // by defult hide the spinner bar
                element.addClass('hide'); // hide spinner bar by default

                // display the spinner bar whenever the route changes(the content part started loading)
                $rootScope.$on('$stateChangeStart', function() {
                    element.removeClass('hide'); // show spinner bar
                    Layout.closeMainMenu();
                });

                // hide the spinner bar on rounte change success(after the content loaded)
                $rootScope.$on('$stateChangeSuccess', function() {
                    element.addClass('hide'); // hide spinner bar
                    $('body').removeClass('page-on-load'); // remove page loading indicator
                    Layout.setMainMenuActiveLink('match'); // activate selected link in the sidebar menu

                    // auto scorll to page top
                    setTimeout(function () {
                        Metronic.scrollTop(); // scroll to the top on content load
                    }, $rootScope.settings.layout.pageAutoScrollOnLoad);
                });

                // handle errors
                $rootScope.$on('$stateNotFound', function() {
                    element.addClass('hide'); // hide spinner bar
                });

                // handle errors
                $rootScope.$on('$stateChangeError', function() {
                    element.addClass('hide'); // hide spinner bar
                });
            }
        };
    }
])

// Handle global LINK click
MetronicApp.directive('a',
    function() {
        return {
            restrict: 'E',
            link: function(scope, elem, attrs) {
                if (attrs.ngClick || attrs.href === '' || attrs.href === '#') {
                    elem.on('click', function(e) {
                        e.preventDefault(); // prevent link click for above criteria
                    });
                }
            }
        };
    });

// Handle Dropdown Hover Plugin Integration
MetronicApp.directive('dropdownMenuHover', function () {
  return {
    link: function (scope, elem) {
      elem.dropdownHover();
    }
  };
});

MetronicApp.directive('ngEcharts', [function() {
  return {
    link: function(scope, element, attrs, ctrl) {
      function refreshChart() {
        var theme = (scope.config && scope.config.theme) ? scope.config.theme : 'default';
        var chart = echarts.init(element[0], theme);
        if (scope.config && scope.config.dataLoaded === false) {
          chart.showLoading();
        }

        if (scope.config && scope.config.dataLoaded) {
          chart.setOption(scope.option);
          chart.resize();
          chart.hideLoading();
        }

        if (scope.config && scope.config.event) {
          if (angular.isArray(scope.config.event)) {
            angular.forEach(scope.config.event, function(value, key) {
              for (var e in value) {
                chart.on(e, value[e]);
              }
            });
          }
        }
      };

      //自定义参数 - config
      // event 定义事件
      // theme 主题名称
      // dataLoaded 数据是否加载

      scope.$watch(
        function() {
          return scope.config;
        },
        function(value) {
          if (value) {
            refreshChart();
          }
        },
        true
      );

      //图表原生option
      scope.$watch(
        function() {
          return scope.option;
        },
        function(value) {
          if (value) {
            refreshChart();
          }
        },
        true
      );
    },
    scope: {
      option: '=ecOption',
      config: '=ecConfig'
    },
    restrict: 'EA'
  }
}]);
