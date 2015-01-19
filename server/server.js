var databaseJson = require('./database'),
    fs = require('fs');

var Database = (function () {

    var database = databaseJson;

// helpers
    var writeJson = function (data) {
        fs.writeFile('server/database.json', JSON.stringify(data, null, 4), function () {
            console.log('updated');
        });
    };

    var getList = function (callback) {
        if (!database.length > 0) {
            return callback(new Error('Database is empty'));
        }
        return callback(null, database);
    };

    var getById = function (req, callback) {
        if (!database.length > 0) {
            return callback(new Error('Database is empty'));
        }

        var userById = [];
        for (var i = 0; i < database.length; i++) {
            if (database[i].id === Number(req.params.id)) {
                userById.push(database[i]);
            }
        }

        if (!userById.length) {
            return callback(new Error('ID not found'));
        }

        return callback(null, userById);
    };

    var deleteUser = function (req, callback) {
        for (var i = 0; i < database.length; i++) {
            if (database[i].id === Number(req.params.id)) {
                database.splice(i, 1);
            }
        }

//    This part physically deletes data in JSON file
//    writeJson(database);

        return callback(null, database);
    };

    var editUser = function (req, callback) {
        for (var i = 0; i < database.length; i++) {
            if (database[i].id ===  Number(req.params.id)) {
                database.splice(i, 1, req.body);
            }
        }

//    This part physically overwrites data on JSON file
//    writeJson(database);

        return callback(null, database);
    };

    return {
        getList: getList,
        getById: getById,
        deleteUser: deleteUser,
        editUser: editUser
    }
})();

var errorHandler = function (err, req, res, data) {
    if (err) {
        console.log('Error via Error Handler: ', err);
        res.status(500).send(err.message);
        return;
    }
    res.json(data);
};

function getUserList(req, res) {
    Database.getList(function (err, data) {
        errorHandler(err, req, res, data);
    });
}

function getUserById(req, res) {
    Database.getById(req, function (err, data) {
        errorHandler(err, req, res, data);
    })
}

function deleteUserById(req, res) {
    Database.deleteUser(req, function (err, data) {
        errorHandler(err, req, res, data);
    })
}

function editUserById(req, res) {
    Database.editUser(req, function (err, data) {
        errorHandler(err, req, res, data);
    });
}


exports.getUserList = getUserList;
exports.getUserById = getUserById;
exports.deleteUserById = deleteUserById;
exports.editUserById = editUserById;