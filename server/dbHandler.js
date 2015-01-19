var databaseJson = require('./database');
var fs = require('fs');

function dbHandler() {

    var database = databaseJson;

// helpers
    var writeJson = function (data) {
        fs.writeFile('server/database.json', JSON.stringify(data, null, 4), function () {
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
            if (database[i].id === Number(req.params.id)) {
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
}

module.exports = dbHandler();