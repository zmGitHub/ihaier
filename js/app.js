/***
Metronic AngularJS App Main Script
***/

/* Metronic App */
var MetronicApp = angular.module("MetronicApp", [
    "ui.router",
    "ui.bootstrap",
    "oc.lazyLoad",
    "ngSanitize"
]);

/* Configure ocLazyLoader(refer: https://github.com/ocombe/ocLazyLoad) */
MetronicApp.config(['$ocLazyLoadProvider', function($ocLazyLoadProvider) {
    $ocLazyLoadProvider.config({
        cssFilesInsertBefore: 'ng_load_plugins_before' // load the above css files before a LINK element with this ID. Dynamic CSS files must be loaded between core and theme css files
    });
}]);


//AngularJS v1.3.x workaround for old style controller declarition in HTML
MetronicApp.config(['$controllerProvider', function($controllerProvider) {
  // this option might be handy for migrating old apps, but please don't use it
  // in new ones!
  $controllerProvider.allowGlobals();
}]);

/********************************************
 END: BREAKING CHANGE in AngularJS v1.3.x:
*********************************************/

/* Setup global settings */
MetronicApp.factory('settings', ['$rootScope', function($rootScope) {
    // supported languages
    var settings = {
        layout: {
            pageAutoScrollOnLoad: 1000 // auto scroll to top on page load
        },
        layoutImgPath: Metronic.getAssetsPath() + 'admin/layout/img/',
        layoutCssPath: Metronic.getAssetsPath() + 'admin/layout/css/'
    };

    $rootScope.settings = settings;

    return settings;
}]);

/* Setup App Main Controller */
MetronicApp.controller('AppController', ['$scope', '$rootScope', function($scope, $rootScope) {
    $scope.$on('$viewContentLoaded', function() {
        Metronic.initComponents(); // init core components
        //Layout.init(); //  Init entire layout(header, footer, sidebar, etc) on page load if the partials included in server side instead of loading with ng-include directive
    });
}]);

/***
Layout Partials.
By default the partials are loaded through AngularJS ng-include directive. In case they loaded in server side(e.g: PHP include function) then below partial
initialization can be disabled and Layout.init() should be called on page load complete as explained above.
***/

/* Setup Layout Part - Header */
MetronicApp.controller('HeaderController', ['$scope', function($scope) {
    $scope.$on('$includeContentLoaded', function() {
        Layout.initHeader(); // init header
    });
}]);


/* Setup Layout Part - Footer */
MetronicApp.controller('FooterController', ['$scope', function($scope) {
    $scope.$on('$includeContentLoaded', function() {
        Layout.initFooter(); // init footer
    });
}]);

/* Setup Rounting For All Pages */
MetronicApp.config(['$stateProvider', '$urlRouterProvider', function($stateProvider, $urlRouterProvider) {

    // Redirect any unmatched url
    $urlRouterProvider.otherwise("/dashboard.html");

    $stateProvider

        // 首页
        .state('dashboard', {
            url: "/dashboard.html",
            templateUrl: "views/dashboard.html",
            data: {pageTitle: '首页', pageSubTitle: '小微创客'}
        })
        // 查询页
        .state('filter', {
            url: "/filter.html",
            templateUrl: "views/filter.html",
            data: {pageTitle: '搜索', pageSubTitle: '小微创客'}
        })
        // AngularJS plugins
        .state('trend', {
            url: "/trend.html",
            templateUrl: "views/trend.html",
            data: {pageTitle: '融资状态', pageSubTitle: '企业融资状态'},
            controller: "TrendController",
            resolve: {
                deps: ['$ocLazyLoad', function($ocLazyLoad) {
                    return $ocLazyLoad.load([{
                        name: 'MetronicApp',
                        files: [
                            'js/controllers/TrendController.js'
                        ]
                    }]);
                }]
            }
        })
        // 小微项目详情
        .state('info', {
            url: "/info.html",
            templateUrl: "views/info.html",
            data: {pageTitle: '小微公司详情', pageSubTitle: '公司详情'},
            controller: "InfoController",
            resolve: {
                deps: ['$ocLazyLoad', function($ocLazyLoad) {
                    return $ocLazyLoad.load([{
                        name: 'MetronicApp',
                        files: [
                            'js/controllers/InfoController.js'
                        ]
                    }]);
                }]
            }
        })
        // 融资进度
        .state('progress', {
            url: "/progress.html",
            templateUrl: "views/progress.html",
            data: {pageTitle: '融资进度', pageSubTitle: '融资进度'},
            controller: "ProgressController",
            resolve: {
                deps: ['$ocLazyLoad', function($ocLazyLoad) {
                    return $ocLazyLoad.load([{
                        name: 'MetronicApp',
                        files: [
                            'js/controllers/ProgressController.js'
                        ]
                    }]);
                }]
            }
        })
        // 公司基础数据
        .state('basic', {
            url: "/basic.html",
            templateUrl: "views/basic.html",
            data: {pageTitle: '公司基础数据', pageSubTitle: '公司基础数据'}
        })
        // 财务指标
        .state('financial', {
            url: "/financial.html",
            templateUrl: "views/financial.html",
            data: {pageTitle: '财务指标', pageSubTitle: '财务指标'}
        })
        // 项目分析
        .state('analyze', {
            url: "/analyze.html",
            templateUrl: "views/analyze.html",
            data: {pageTitle: '项目分析', pageSubTitle: '财务指标'}
        })
        // 投入产出
        .state('output', {
            url: "/output.html",
            templateUrl: "views/output.html",
            data: {pageTitle: '投入产出', pageSubTitle: '投入产出'}
        })

}]);

/* Init global settings and run the app */
MetronicApp.run(["$rootScope", "settings", "$state", function($rootScope, settings, $state) {
    $rootScope.$state = $state; // state to be accessed from view
}]);
