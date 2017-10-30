app.factory('BootstrapTable', function() {

    function BootstrapTable(table) {
        this.table = table;
        this.activeClass = 'table-active';
        this.registerActions = function(editFunc, deleteFunc) {
            this.table.button().add(0, {
                action: deleteFunc,
                text: 'Delete'
            });
            this.table.button().add(1, {
                action: editFunc,
                text: 'Edit'
            });
        }
        this.refreshData = function (data) {
            if (this.table != null) {
                table.clear();
                table.rows.add(data);
                table.draw();
            }
        }
        this.getSelectedDataRow = function(domTable) {
            var row = domTable.querySelector('tbody tr.table-active');
            if (row != null) {
                return this.table.row($(row).closest('tr')).data();
            } else {
                return null;
            }
        }
        this.toggleActiveRow = function(jqTable,tr) {
            var hasClass = false;
            if (tr.hasClass(this.activeClass)) hasClass = true;
            jqTable.find('tbody tr').removeClass(this.activeClass);
            (hasClass) ? tr.removeClass(this.activeClass) : tr.addClass(this.activeClass);
        }
    }

    BootstrapTable.build = function(elem, data, columns) {
        var table = elem.DataTable( {
            select: true,
            lengthChange: false,
            data: data,
            columns: columns,
            buttons: []
        } );

        table.buttons().container()
            .appendTo('.col-md-6:eq(0)');

        return new BootstrapTable(table);
    }

    return BootstrapTable;
});