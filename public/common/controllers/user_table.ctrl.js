'use strict';

angular.module('user_table.ctrl', [])
    .controller('TableCtrl', ['userTableService',
        function (userTableService) {
            var that = this;

            this.userId = '';

            this.userService = userTableService;

            this.displayUsers = function () {
                that.userId = '';
                that.userList = that.userService.userList;
                return that.userList;
            };

            this.getList = function () {
                return that.userService.getList()
                    .then(this.displayUsers);
            };

            this.getUserById = function (id) {
                if (id === '') {
                    return console.log('Error, enter id!')
                }
                return that.userService.getUser(id)
                    .then(this.displayUsers);
            };

            this.deleteUser = function (user) {
                return that.userService.deleteUser(user)
                    .then(this.displayUsers);
            };

            this.editUser = function (user) {
                return that.userService.editUser(user)
                    .then(this.displayUsers);
            };
        }]);
