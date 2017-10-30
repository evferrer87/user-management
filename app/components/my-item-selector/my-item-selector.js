app.directive('myItemSelector', function(BootstrapTable, $rootScope, $route) {
    return {
        restrict: 'A',
        scope: {
            activeClass: '@'
        },
        link: function(scope, element, attrs) {

            if (attrs.activeClass) {
                element.find('li a').unbind('click').bind('click', function() {
                    if (!$(this).hasClass(scope.activeClass)) {
                        element.find('li a').removeClass(scope.activeClass);
                        this.classList.add(scope.activeClass);
                    }
                });
            }

            //To this functionality is necessary add the data-path attribute (original route path) to the <a> element
            element.ready(function(){
                scope.$apply(function(){
                    var currentPath = $route.current.$$route.originalPath;
                    angular.element(element[0].querySelector('[data-path="' + currentPath + '"]')
                        .classList.add(scope.activeClass));
                })
            })

        }
    }
});