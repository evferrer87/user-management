    app.factory('ArrayUtil', function() {

    this.getIndexById = function(items, id) {
        var index = -1;
        for (var i = 0; i < items.length; i++) {
            index++;
            if (items[i].id == id) {
                return index;
            }
        }
        return index;
    };

    this.remove = function(items, id) {
        var index = this.getIndexById(items,id);
        if (index != -1) {
            items.splice(index, 1);
        }
    }

    this.updateElem = function(items, item) {
        var index = this.getIndexById(items, item.id);
        if (index != -1) {
            items[index] = angular.merge(items[index], item);
        }
    }

    return this;
})