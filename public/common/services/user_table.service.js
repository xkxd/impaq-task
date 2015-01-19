'use strict';

angular.module('services.user_table', [])

    .service('userTableService', ['userTableFactory', function (userTableFactory) {

        var userList;
        var userFactory = userTableFactory;

        var resolvePromise = function (data) {
            userList = data;
            return userList;
        };

        var errorHandler = function (err) {
            console.log('Error: ', err);
        };

        var getList = function () {
            console.log('get user list');
            return userFactory.getUserList().$promise
                .then(resolvePromise)
                .catch(errorHandler)
        };

        var getUser = function (id) {
            console.log('get user by id');
            return userFactory.getUserById({id: id}).$promise
                .then(resolvePromise)
                .catch(errorHandler)
        };

        var deleteUser = function (user) {
            console.log('delete user');
            return userFactory.deleteUser({id: user.id}, user).$promise
                .then(resolvePromise)
                .catch(errorHandler)
        };

        var editUser = function (user) {
            console.log('edit user');
            return userFactory.editUser({id: user.id}, user).$promise
                .then(resolvePromise)
                .catch(errorHandler)
        };

        return {
            getList: getList,
            getUser: getUser,
            deleteUser: deleteUser,
            editUser: editUser,
            get userList() {
                return userList;
            }
        };
    }]);