var dbHandler = require('./dbHandler');

function responseHandler(err, req, res, data) {
    if (err) {
        console.log('Error via Error Handler: ', err);
        res.status(500).send(err.message);
        return;
    }
    res.json(data);
}

function getUserList(req, res) {
    dbHandler.getList(function (err, data) {
        responseHandler(err, req, res, data);
    });
}

function getUserById(req, res) {
    dbHandler.getById(req, function (err, data) {
        responseHandler(err, req, res, data);
    })
}

function deleteUserById(req, res) {
    dbHandler.deleteUser(req, function (err, data) {
        responseHandler(err, req, res, data);
    })
}

function editUserById(req, res) {
    dbHandler.editUser(req, function (err, data) {
        responseHandler(err, req, res, data);
    });
}


exports.getUserList = getUserList;
exports.getUserById = getUserById;
exports.deleteUserById = deleteUserById;
exports.editUserById = editUserById;