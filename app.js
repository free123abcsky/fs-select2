/**
 * User: kfs
 * Date：2016/12/11
 * Desc：select2使用示例
 */

var app = angular.module('app', []);

app.directive('select2', function (select2Query, $timeout) {
    return {
        restrict: 'A',
        scope: {
            select2: '=',
            ngModel: '=',
            select2Model: '='
        },
        link: function (scope, element, attrs) {

            var tagName = element[0].tagName,
                config = {
                    allowClear: true,
                    matcher: pinyinUtil.select2matcher,
                    placeholder: attrs.placeholder || ' '   // 修复不出现删除按钮的情况
                };

            angular.extend(config, scope.select2);

            // 生成select
            if(tagName === 'SELECT') {

                element
                    .prepend('<option value=""></option>')
                    .val('')
                    .select2(config);

                // model - view
                scope.$watch('ngModel', function (newVal) {
                    $timeout(function () {
                        element.find('[value^="?"]').remove();    // 清除错误的数据
                        if(newVal){ element.val(newVal);}
                    });
                }, true);
                return false;
            };

            if(tagName === 'INPUT') {
                if(config.wkeCod){
                      $('#select2_sample').select2({
                          ajax: {
                              url     : "http://123.57.28.146:8088/sample",//请求的API地址
                              dataType: 'json',//数据类型
                              data    : function(params){

                                  return {
                                      q   : params.term//此处是最终传递给API的参数
                                  }
                              },
                              results : function(data){ return data;}//返回的结果

                          }

                      });

                }
            }

            //if(tagName === 'INPUT') {
            //    // 获取内置配置
            //    if(attrs.query) {
            //        scope.select2 = select2Query[attrs.query]();
            //    }
            //
            //    // 动态生成select2
            //    //scope.$watch('select2', function () {
            //    //    angular.extend(config, scope.select2);
            //    //    element.select2('destroy').select2(config);
            //    //}, true);
            //
            //    // view - model
            //    //element.on('change', function () {
            //    //    scope.$apply(function () {
            //    //        scope.select2Model = element.select2('data');
            //    //    });
            //    //});
            //
            //    // model - view
            //    //scope.$watch('select2Model', function (newVal) {
            //    //    debugger;
            //    //    $(element).select2('data', newVal);
            //    //}, true);
            //
            //    // model - view
            //    //scope.$watch('ngModel', function (newVal) {
            //    //    // 跳过ajax方式以及多选情况
            //    //    if(config.ajax || config.multiple) { return false }
            //    //
            //    //    element.val(newVal);
            //    //}, true);
            //}

        }
    }
});
/**
 * select2 内置查询功能
 */
app.factory('select2Query', function ($timeout) {
    return {
        testAJAX: function () {
            var config = {
                minimumInputLength: 1,
                ajax: {
                    url: "http://api.rottentomatoes.com/api/public/v1.0/movies.json",
                    dataType: 'jsonp',
                    data: function (term) {
                        return {
                            q: term,
                            page_limit: 10,
                            apikey: "ju6z9mjyajq2djue3gbvv26t"
                        };
                    },
                    results: function (data, page) {
                        return {results: data.movies};
                    }
                },
                formatResult: function (data) {
                    return data.title;
                },
                formatSelection: function (data) {
                    return data.title;
                }
            };

            return config;
        }
    }
});

app.controller('indexCtrl', function ($scope, $timeout) {
    $scope.config1 = {
        data: [],
        placeholder: '尚无数据'
    };

    $timeout(function () {
        $scope.config1.data = [{id:1,text:'bug'},{id:2,text:'duplicate'},{id:3,text:'invalid'},{id:4,text:'wontfix'}]
        $scope.config1.placeholder = '加载完毕'
    }, 1000);

    //普通下拉框 （select）
    $scope.selectConfig1 = {
        data: [
            {id: 1, text: '后庭花破子'},
            {id: 2, text: '添声杨柳枝'},
            {id: 3, text: '巫山一段云'},
            {id: 4, text: '减字木兰花'},
            {id: 5, text: '金莲绕凤楼'},
            {id: 6, text: '促拍采桑子'}
        ]
    };

    //多选标签式下拉框 （select）
    $scope.selectConfig2 = {
        data: [
            {id: 1, text: '后庭花破子'},
            {id: 2, text: '添声杨柳枝'},
            {id: 3, text: '巫山一段云'},
            {id: 4, text: '减字木兰花'},
            {id: 5, text: '金莲绕凤楼'},
            {id: 6, text: '促拍采桑子'}
        ],
        multiple: true,
        //tags: true
    };

    $scope.config3 = {
        data: [{id:1,text:'bug'},{id:2,text:'duplicate'},{id:3,text:'invalid'},{id:4,text:'wontfix'}]
        // 其他配置略，可以去看看内置配置中的ajax配置
    };

});

angular.bootstrap(document, ['app']);