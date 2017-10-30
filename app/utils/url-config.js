app.factory('UrlConfig', function() {

    function UrlConfig(baseUrl) {
        this.baseUrl = baseUrl;
    }

    this.build = function(baseUrl) {
        return new UrlConfig(baseUrl);
    }

    return this;
})