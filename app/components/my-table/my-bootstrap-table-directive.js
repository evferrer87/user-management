app.directive('myBootstrapTable', function(BootstrapTable, $rootScope) {
    return {
        restrict: 'A',
        scope: {
            data: '=?',
            columns: '=?',
            edit: '&',
            delete: '&',
            deleteModalName: '@',
            editModalName: '@'
        },
        link: function(scope, element, attrs) {

            var initialized = false, bootstrapTable = null;

            scope.$watch('data', function(newValue, oldValue) {
                if (!initialized) {
                    bootstrapTable = new BootstrapTable.build(element, scope.data, scope.columns);
                    bootstrapTable.registerActions(scope.editFunc, scope.deleteFunc);
                    initialized = true;
                } else {
                    bootstrapTable.refreshData(scope.data);
                }
            }, true);

            var activeClass = 'table-active';
            element.on ('click', 'tbody tr', function($event) {
                bootstrapTable.toggleActiveRow(element, $(this));
            });

            scope.deleteFunc =  function() {
                var row = bootstrapTable.getSelectedDataRow(element[0]);
                if (row != null) {
                    var modal = $('#'+scope.deleteModalName);
                    if (attrs.deleteModalName) {
                        modal.modal();
                        $rootScope.$broadcast('deleteModalOpen', {row: angular.copy(row)});
                    }
                    var deleteListener = $('#'+scope.deleteModalName+' .yes-button').unbind('click').bind('click', function() {
                        scope.delete()(row).then(function() {
                            bootstrapTable.refreshData(scope.data);
                            modal.modal('hide');
                        });
                    });

                }
            }

            scope.editFunc =  function() {
                var row = bootstrapTable.getSelectedDataRow(element[0]);

                if (row != null) {
                    var modal = $('#'+scope.editModalName);
                    if (attrs.editModalName) {
                        modal.modal();
                        $rootScope.$broadcast('editModalOpen', {row: angular.copy(row)});
                        $('#'+scope.editModalName).on('shown.bs.modal', function () {
                            $('.myFirstInput').focus()
                        });
                    }
                    var editListener = $('#'+scope.editModalName+' .save-button').unbind('click').bind('click', function() {
                        scope.edit()().then(function(){
                            bootstrapTable.refreshData(scope.data);
                            modal.modal('hide');
                        }, function(error) {

                        });
                    });
                }
            }
        }
    }
});