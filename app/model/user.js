app.factory('User', function() {

    function User(id, name, email) {
        this.id = id;
        this.name = name;
        this.email = email;
    }

    User.Build = function(data) {
        return new User(data.id, data.name, data.email);
    }

    User.init = function() {
        return new User(null, '', '');
    }

    return User;
});